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
    async updateOnBuy(state) {
      let acc = state.userAccounting
      if (acc)
        return await BuyManage.buy(Array.from(state.orders.values())).then((err) => {
          if (!err)
            state.userAccounting = BuyManage.getAccounting()
          else return err
        })
      else return "You have to login before buying stuff"
    },
    addOrder(state, { id, good, amount }) {
      state.orders.set(id, { good, amount })
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
      return await commit('updateOnBuy')
    },
    addOrder({ commit }, { id, good, amount }) {
      if (good.amount >= amount) {
        commit('addOrder', { id, good, amount })
      }
      else return "Amount is over"
    },
    editOrder({ commit }, { id, good, amount }) {
      return this.addOrder({ commit }, { id, good, amount })
    },
    deleteOrder({ commit }, { id }) {
      commit('deleteOrder', id)
    }
  },
  modules: {
  }
})