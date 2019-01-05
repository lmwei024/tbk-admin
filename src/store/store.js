/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import tools from '../tools';

Vue.use(Vuex);

const state = {
  dataId:0,
  loginData: sessionStorage.gld ? JSON.parse(tools.base64.decode(sessionStorage.gld)) : {login: false, userInfo: {}},
};

const mutations = {
  gainUserInfo(state, n) {
    state.user = n;
  },
  updateloginData (state, loginData) {
    state.loginData = loginData;
    sessionStorage.setItem('gld', tools.base64.encode(JSON.stringify(loginData)))
  },
  gainSidebarNav(state, n) {
    state.sidebarNav = n;
  },
};

const actions = {
  updateloginDataAction ({commit}, loginData) {
    commit('updateloginData', loginData)
  },
};

export default new Vuex.Store({
  state,
  mutations,
  /*mutations: {
		changeId(state, payload) {
		  state.dataId = payload;
		}
	},*/
  actions
});
