
import AuthService from "./AuthService"
import axios from 'axios'

export default {
    async getAccOnCreate(){
        let data = {
            acc:{},
            err:""
        }
        if(AuthService.getUser()){
            data = await this.getAccounting()
            if(data.acc.length == 0){
                data = await this.createAccounting();    
            }
            data.acc = data.acc[0] 
        }
        console.log(data)
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
                        return { acc: res.data, err: "" }
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
    getTotalCost(orders) {
        let coins = 0
        let points = 0
        for (let i = 0; i < orders.length; i++) {
            coins += orders[i].coins
            points += orders[i].points
        }
        return { coins, points }
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
        let { acc, err } = await this.getAccounting()
        if (!err) {
            let { coins, points } = getTotalCost(orders)
            if (acc.coins >= coins && acc.points >= points) {
                let newBody = {
                    email: acc.email,
                    coins: acc.coins - coins,
                    points: acc.points - points
                }
                return await axios.put('http://localhost:1337' + '/accounting/' + acc.id, newBody, headers())
                    .catch((e) => {
                        if (e.response.status === 400)
                            return e.response.data.message[0].messages[0].message
                        else {
                            console.error(e)
                            return "Unknow error status: " + e.response.status
                        }
                    })
            }
            else return "Not have enough coin nor point"
        }
        else {
            return err
        }
    }
}