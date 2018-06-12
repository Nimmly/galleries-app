import Vue from 'vue'
import Vuex from 'vuex'

import { userService } from '../services/UserService'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    searchTerm: '',
    galleries: []
  },
  getters: {
    getSearchTerm(state) {
      return state.searchTerm
    },
    getGalleries(state) {
      return state.galleries
    }
  },
  mutations: {
    setSearchTerm(state, searchTerm) {
      state.searchTerm = searchTerm
    },
    setGalleries(state, galleries) {
      state.galleries = galleries
    }
  },
  actions: {
    fetchGalleries(store) {
      userService.index().then(({ data }) => {
        let galleries = data.map((gallery) => {
          return movie
        })
        store.commit('setGalleries', galleries)
      })
    }
  }
})