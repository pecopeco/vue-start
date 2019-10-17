import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: '',
    transitionName: 'slide-left'
  },
  actions: {
    setUser: ({ commit }, data) => {
      commit('setUser', data)
    },
    setSlide: ({ commit }, data) => {
      commit('setSlide', data)
    }
  },
  mutations: {
    setUser (state, data) {
      state.userInfo = data
    },
    setSlide (state, data) {
      state.transitionName = data
    }
  }
})
