import Vue from 'vue'
import Vuex from 'vuex'
import BuyManage from './BuyManage'
import AuthService from './AuthService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userAccounting: BuyManage.getAccOnCreate()
  },
  mutations: {
    async updateOnBuy(state, orders){
        if(state.userAccounting.acc)
        return await BuyManage.buy(orders).then((err)=>{
            if(err)
            state.userAccounting = BuyManage.getAccounting()
            else return err
        })
        else return "You have to login before buying stuff"
      }
  },
  getters:{
    userAccounting: state => state.userAccounting
  }
  ,
  actions: {
      async buy({commit},orders){
        return await commit('updateOnBuy', orders)
      }
  },
  modules: {
  }
})