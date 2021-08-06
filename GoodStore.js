import Vue from 'vue'
import Vuex from 'vuex'
import GoodManage from './GoodManage'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        allGood: GoodManage.getAllGoodsData(),
        normalGood: GoodManage.getNormalGoodsData(),
        rewardGood: GoodManage.getRewardGoodsData()
    },
    mutations: {
        async update(state) {
            state.normalGood = await GoodManage.getNormalGoodsData()
            state.rewardGood = await GoodManage.getRewardGoodsData()
            state.allGood = await GoodManage.getAllGoodsData()
        }
    },getters:{
        allGood: state => state.allGood,
        normalGood: state => state.normalGood,
        rewardGood: state => state.rewardGood
    },
    actions: {
        async addGood({ commit }, {goodName, cost, cost_type, detail, pic, amount}) {
            let err = await GoodManage.addGood(goodName, cost, cost_type, detail, pic, amount)
            await commit('update')
            return err
        },
        async removeGood({ commit }, { id }) {
            let err = await GoodManage.removeGood(id)
            await commit('update')
            return err
        },
        async updateGood({ commit }, { id, newBody }) {
            let err = await GoodManage.updateGood(id, newBody)
            await commit('update')
            return err
        }
    },
    modules: {
    }
})
