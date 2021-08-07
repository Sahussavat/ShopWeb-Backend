import Vue from 'vue'
import Vuex from 'vuex'
import HistoryManage from './HistoryManage.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        receiveHistory:{
            data:{}
        },
        tradeHistory:{
            data:{}
        },
        allHistory:{
            data:{}
        }
    },
    mutations: {
        updateRceiveHistory(state, {data}){
            state.receiveHistory.data = data
        },
        updateTradeHistory(state, {data}){
            state.tradeHistory.data = data
        },
        updateAllHistory(state, {data}){
            state.allHistory.data = data
        },  
    },
    getters: {
        receiveHistory: state => state.receiveHistory,
        tradeHistory: state => state.tradeHistory,
        allHistory: state => state.allHistory
    },
    actions: {
        async searchReceiveHistory({ commit }, { dateStart, dateEnd }) {
            return await HistoryManage.getHistoryOnDate("receive", dateStart, dateEnd)
            .then(({data, err})=>{
                if(!err)
                    commit('updateRceiveHistory',{data})
                else return err
            })
        },
        async searchTradeHistory({ commit }, { dateStart, dateEnd }) {
            return await HistoryManage.getHistoryOnDate("trade", dateStart, dateEnd)
            .then(({data, err})=>{
                if(!err)
                    commit('updateTradeHistory',{data})
                else return err
            })
        },
        async updateAllHistory({commit}){
            return await HistoryManage.getUserHistory()
            .then(({data, err})=>{
                if(!err)
                    commit('updateAllHistory',{data})
                else return err
            })
        }
    },
    modules: {
    }
})
