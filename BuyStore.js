import Vue from 'vue'
import Vuex from 'vuex'
import BuyManage from './BuyManage'
import AuthService from './AuthService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userAccounting: BuyManage.getAccOnCreate(),
    orders: new Map(),
    ordersArr: {data: []}
  },
  mutations: {
    async update(state) {
      state.userAccounting = BuyManage.getAccounting()
    },
    addOrder(state, { good, amount }) {
      state.orders.set(good.id, { good, amount })
      state.ordersArr.data = Array.from(state.orders.values())
    },
    deleteOrder(state, id) {
      state.orders.delete(id)
      state.ordersArr.data = Array.from(state.orders.values())
    }
  },
  getters: {
    userAccounting: state => state.userAccounting,
    ordersArr: state => state.ordersArr
  }
  ,
  actions: {
    async buy({ commit }) {
      if (AuthService.isAuthen()){
        return await BuyManage.buy(this.getters.ordersArr.data).then((err) => {
          if (!err){
            commit('update')
          }
          else return err
        })
      }
      else return "You have to login before buying stuff"
    },
    async increaseCoins({ commit }, {amount}){
      if (AuthService.isAuthen()){
        return await BuyManage.increaseCoins(amount).then((err) => {
          if (!err){
            commit('update')
          }
          else return err
        })
      }
      else return "You have to login before increase coins"
    },
    addOrder({ commit }, { good, amount }) {
      if (good.amount >= amount) {
        commit('addOrder', { good, amount })
      }
      else return "Amount is over"
    },
    editOrder({ commit }, { good, amount }) {
      return this.addOrder({ commit }, { good, amount })
    },
    deleteOrder({ commit }, { id }) {
      commit('deleteOrder', id)
    }
  },
  modules: {
  }
})
