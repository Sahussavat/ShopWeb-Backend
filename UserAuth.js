import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from './AuthService'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: AuthService.getUser()
    },
    getters: {
        user:state => state.user,
        isAuthen:() => {return AuthService.isAuthen()}
    },
    mutations: {
        update(state){
            state.user = AuthService.getUser()
        }
    },
    actions: {
        async login({ commit }, data) {
            let err = await AuthService.login(data)
            commit('update')
            return err
        },
        logout({ commit }) {
            AuthService.logout()
            commit('update')
        },
        async register({ commit }, data) {
            let err = await AuthService.register(data)
            commit('update')
            return err
        }
    },
    modules: {
    }
})
