import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: '',
    showBtn: true,  // 键盘弹出fixed定位按钮隐藏
    transitionName: 'slide-left',
    checkTab: 'home'
  },
  actions: {
    setUser: ({ commit }, data) => {
      commit('setUser', data)
    },
    setShowBtn: ({ commit }, data) => {
      commit('setShowBtn', data)
    },
    setSlide: ({ commit }, data) => {
      commit('setSlide', data)
    },
    setTab: ({ commit }, data) => {
      commit('setTab', data)
    }
  },
  mutations: {
    setUser (state, data) {
      state.userInfo = data
    },
    setShowBtn (state, data) {
      state.showBtn = data
    },
    setSlide (state, data) {
      state.transitionName = data
    },
    setTab (state, data) {
      state.checkTab = data
    }
  }
})
