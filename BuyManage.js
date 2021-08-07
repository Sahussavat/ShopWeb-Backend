
import AuthService from "./AuthService"
import axios from 'axios'
import GoodManage from './GoodManage'
import HistoryManage from './HistoryManage'
import PointsManage from "./PointsManage"

export default {
    async getAccOnCreate(){
        let data = {
            acc:{},
            err:""
        }
        if(AuthService.getUser()){
            data = await this.getAccounting()
            if(!data.acc){
                data = await this.createAccounting();    
            }
        }
        return data
    },
    async getAccounting() {
        let user = AuthService.getUser();
        if (user) {
            return await axios.get('http://localhost:1337' + '/accountings?email=' + user.email
                , {
                    headers: {
                        Authorization: 'Bearer ' + user.jwt
                    }
                })
                .then((res) => {
                    if (res.status == 200) {
                        return { acc: res.data[0], err: "" }
                    } else {
                        return { acc: {}, err: "" }
                    }
                })
                .catch((e) => {
                    if (e.response.status === 400)
                        return { acc: {}, err: e.response.data.message[0].messages[0].message }
                    else {
                        console.error(e)
                        return { acc: {}, err: "Unknow error status: " + e.response.status }
                    }
                })
        }
        else return { acc: {}, err: "Cannot get accounting, please login" }
    },
    async createAccounting() {
        let user = AuthService.getUser();
        console.log(user)
        if (user) {
            let body = {
                email: user.email,
                coins: 0,
                points: 0
            }
            return await axios.post('http://localhost:1337' + '/accountings', body, {
                headers: {
                    Authorization: 'Bearer ' + user.jwt
                }
            })
                .then(() => {
                    console.log("yo")
                    return this.getAccounting()
                })
                .catch((e) => {
                    if (e.response.status === 400)
                        return { acc: {}, err: e.response.data.message[0].messages[0].message }
                    else {
                        console.error(e)
                        return { acc: {}, err: "Unknow error status: " + e.response.status }
                    }
                })
        }
        else return { acc: {}, err: "Cannot get accounting, please login" }
    },
    async buy(orders) {
        let { acc, err } = await this.getAccOnCreate()
        if (!err) {
            let { coins, points, err } = this.getTotalCost(orders)
            if(err == ""){
                if (acc.coins >= coins && acc.points >= points) {
                    this.decreaseGoodAmount(orders)
                    PointsManage.increaseCondition(coins)
                    let newBody = {
                        email: acc.email,
                        coins: acc.coins - coins,
                        points: acc.points - points
                    }
                    return await axios.put('http://localhost:1337' + '/accountings/' + acc.id, newBody,this.headers())
                        .catch((e) => {
                            if (e.response.status === 400)
                                return e.response.data.message[0].messages[0].message
                            else {
                                console.error(e)
                                return "Unknow error status: " + e.response.status
                            }
                        })
                }
                else {
                    return "Not have enough coin nor point"
                }
            }
            else return err

        }
        else {
            return err
        }
    },
    getTotalCost(orders) {
        let coins = 0
        let points = 0
        let err = ""
        for (let i = 0; i < orders.length; i++) {
            if(orders[i].amount > orders[i].good.amount){
                err = "Amount is over"
                break;
            }
            switch(orders[i].good.cost_type){
                case "coins":
                    coins += orders[i].good.cost
                    break;
                case "points":
                    HistoryManage.savingPointHis("trade", orders[i].good.goodName, AuthService.getUser().username)
                    points += orders[i].good.cost
                    break;
            }
        }
        return { coins, points, err }
    },
    async decreaseGoodAmount(orders){
        for (let i = 0; i < orders.length; i++) {
            let good = orders[i].good
            if(good.amount >= orders[i].amount){
                good.amount -= orders[i].amount
                await GoodManage.updateGood(good.id, good)
            }
        }
    },
    async increaseCoins(coins){
        let {acc,err} = await this.getAccOnCreate()
        if(coins < 0) err = "The amount of coins must be positive number."
        if(!err){
            let newBody = acc
            newBody.coins += coins 
            await axios.put('http://localhost:1337'+'/accountings/'+acc.id,newBody,this.headers())
            .catch((e) => {
                if (e.response.status === 400)
                    return e.response.data.message[0].messages[0].message
                else {
                    console.error(e)
                    return "Unknow error status: " + e.response.status
                }
            })
        }
        return err
    },
    headers(){
        return {
            headers: {
                Authorization: 'Bearer ' + AuthService.getJWT()
            }
        }
    }
}