import BuyManage from "./BuyManage"
import axios from "axios"
import AuthService from "./AuthService"
import HistoryManage from "./HistoryManage"

export default {
    async increasePoins(points){
        let {acc,err} = await BuyManage.getAccOnCreate()
        if(points < 0) err = "The amount of poins must be positive number."
        if(!err){
            let newBody = acc
            newBody.points += points 
            await axios.put('http://localhost:1337'+'/accountings/'+acc.id,newBody,headers())
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
    increaseCondition(cost){
        if(cost > 1000){
            this.increasePoins(cost)
            .then(()=>{
                HistoryManage.savingPointHis("receive", "buy over 1000", cost)
            })
        }
        else if(cost > 500){
            this.increasePoins(250)
            .then(()=>{
                HistoryManage.savingPointHis("receive", "buy over 500", 250)
            })
        }
        else if(cost > 100){
            this.increasePoins(50)
            .then(()=>{
                HistoryManage.savingPointHis("receive", "buy over 100", 50)
            })
        }
    }
}

function headers(){
    return {
        headers: {
            Authorization: 'Bearer ' + AuthService.getJWT()
        }
    }
}