import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    activeHeader: 'home',
  },

  getters: {
    authStatus: (state) => {
      return state.loggedIn
    }
  },

  mutations: {
    setActiveHeader(state, payload) {
      state.activeHeader = payload;
    }
  },

  actions: {

  },

  modules: {

  }
})
