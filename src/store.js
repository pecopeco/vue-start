import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    userInfo: ''
  },
  actions: {
    fetchUserInfo: ({ commit, state }, data) => {
      commit('SET_USER', {
        name: 'yang'
      })
    }
  },
  mutations: {
    SET_USER (state, data) {
      state.userInfo = data
    }
  },
  getters: {}
})

export default store
