import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: '',
    showBtn: true,  // 键盘弹出fixed定位按钮隐藏
    transitionName: 'slide-left',
    toastObj: {
      showToast: false,
      toastText: '',
      toastClass: ''
    }
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
    setToastStatus: ({ commit }, data) => {
      commit('setToastStatus', data)
    },
    setToastText: ({ commit }, data) => {
      commit('setToastText', data)
    },
    setToastClass: ({ commit }, data) => {
      commit('setToastClass', data)
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
    setToastStatus (state, data) {
      state.toastObj.showToast = data
    },
    setToastText (state, data) {
      state.toastObj.toastText = data
    },
    setToastClass (state, data) {
      state.toastObj.toastClass = data
    }
  }
})
