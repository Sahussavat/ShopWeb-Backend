
import axios from 'axios'
import AuthService from './AuthService'

export default {
    async getNormalGoodsData() {
        return await axios.get('http://localhost:1337' + '/goods?cost_type=coins')
            .catch((e) => {
                console.error(e)
                return "Unknow error status: " + e.response.status
            })
    },
    async getRewardGoodsData() {
        return await axios.get('http://localhost:1337' + '/goods?cost_type=points')
            .catch((e) => {
                console.error(e)
                return "Unknow error status: " + e.response.status
            })
    },
    async getAllGoodsData() {
        return await axios.get('http://localhost:1337' + '/goods')
            .catch((e) => {
                console.error(e)
                return "Unknow error status: " + e.response.status
            })
    },
    async addGood(goodName, cost, cost_type, detail, pic, amount) {
        return await axios.post('http://localhost:1337' + '/goods', {
            goodName: goodName,
            cost: cost,
            cost_type: cost_type,
            detail: detail,
            pic: pic,
            amount: amount
        }, headers()
        ).catch((e) => {
            if (e.response.status === 400 || e.response.status === 500 )
                return e.response.data.message[0].messages[0].message
            else {
                console.error(e)
                return "Unknow error status: " + e.response.status
            }
        })
    },
    async removeGood(id) {
        return await axios.delete('http://localhost:1337' + '/goods/' + id, headers()
        ).catch((e) => {
            if (e.response.status === 400)
                return e.response.data.message[0].messages[0].message
            if (e.response.status === 404) {
                return "Not found good"
            }
            else {
                console.error(e)
                return "Unknow error status: " + e.response.status
            }
        })
    },
    async updateGood(id, newBody) {
        return await axios.put('http://localhost:1337' + '/goods/' + id, newBody, headers())
            .catch((e) => {
                if (e.response.status === 400)
                    return e.response.data.message[0].messages[0].message
                if (e.response.status === 404) {
                    return "Not found good"
                }
                else {
                    console.error(e)
                    return "Unknow error status: " + e.response.status
                }
            })
    }
}

function headers() {
    return {
        headers: {
            Authorization: 'Bearer ' + AuthService.getJWT()
        }
    }
}