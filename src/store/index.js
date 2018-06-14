import Vue from 'vue'
import Vuex from 'vuex'

import { userService } from '../services/UserService'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        galleries: [],
        filterTerm: '',
        isAuth: userService.isAuthenticated(),
        authUserId: ''
    },
    getters: {
        getGalleries(state) {
            return state.galleries
        },
        getFilterTerm(state) {
            return state.filterTerm
        },
        getIsAuth(state) {
            return state.isAuth
        },
        getAuthUserId(state) {
            return state.authUserId
        }
    },
    mutations: {
        setGalleries(state, galleries) {
            state.galleries = galleries
        },
        setFilterTerm(state, filterTerm) {
            state.filterTerm = filterTerm
        },
        setIsAuth(state, isAuth) {
            state.isAuth = isAuth
        },
        setAuthUserId(state, authUserId ){
            state.authUserId = authUserId
        }
    },
    actions: {
        fetchGalleries(store) {
            userService.index().then(response => {
                store.commit('setGalleries', response.data)
            })
        }
    }
})