import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    activeHeader: 'home',
    user: null,
    token: null,
    usertype: 'user',
  },

  getters: {
    emailVerified: (state) => {
      return (state.user && state.user.emailConfirmCode)? false: true;
    },
    userEmail: (state) => {
      return (state.user)? state.user.email: null;
    },
    token: (state) => {
      return state.token;
    },
    usertype: (state) => {
      return state.usertype;
    }
  },

  mutations: {
    setActiveHeader(state, payload) {
      state.activeHeader = payload;
    },
    setLoginStat(state, payload) {
      state.loggedIn = payload;
    },
    setUserDetails(state, details) {
      state.user = details;
      state.usertype = 'user';
    },
    setToken(state, token){
      state.token = token;
    },
    setEmailVerified(state){
      // update store value
      state.user.emailConfirmCode = null;
      state.user.emailConfirmedAt = new Date();

      // update localstorage
      const data = JSON.stringify(state.user);
      const encodedString = btoa(data);
      localStorage.setItem('phoneixx', encodedString)
    },
    setLogout(state){
      state.token = null;
      state.user = null;
      state.loggedIn = false;
    },
  },

  actions: {
    addUserDetails(context, userDetails){
      // add to localstorage
      const data = JSON.stringify(userDetails);
      const encodedString = btoa(data);
      localStorage.setItem('phoneixx', encodedString)

      // add to store
      context.commit('setUserDetails', userDetails)
    },

    updateUserDetails({state, commit}){
      // Get userDetails from localstorage and add to store, if userDetails is empty (for page refresh)
      if (!state.user) {
        const encodedString = localStorage.getItem('phoneixx');

        if (!encodedString) return;

        const decodedString = atob(encodedString);
        const userDetails = JSON.parse(decodedString);

        commit('setUserDetails', userDetails)
      }
    },

    addToken(context, token){
      // add to localstorage
      localStorage.setItem('tangloo', token)

      // add to store
      context.commit('setToken', token)
    },

    updateToken({state, commit}){
      // Get token from localstorage and add to store, if token is empty (for page refresh)
      if (!state.token) {
        const token = localStorage.getItem('tangloo')

        if (!token) return;

        state.loggedIn = true;
        commit('setToken', token)
      }
    },
  },

  modules: {

  }
})
