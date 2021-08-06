import Vue from 'vue'
import Vuex from 'vuex'
import BuyManage from './BuyManage'
import AuthService from './AuthService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userAccounting: BuyManage.getAccOnCreate(),
    orders: new Map()
  },
  mutations: {
    async update(state) {
      state.userAccounting = BuyManage.getAccounting()
    },
    addOrder(state, { good, amount }) {
      state.orders.set(good.id, { good, amount })
    },
    deleteOrder(state, id) {
      state.orders.delete(id)
    }
  },
  getters: {
    userAccounting: state => state.userAccounting,
    orders: state => Array.from(state.orders.values())
  }
  ,
  actions: {
    async buy({ commit }) {
      if (AuthService.isAuthen()){
        return await BuyManage.buy(Array.from(this.getters.orders)).then((err) => {
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
