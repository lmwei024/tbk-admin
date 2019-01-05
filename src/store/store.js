/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    dataId:0,
};

const mutations = {
  gainUserInfo(state, n) {
    state.user = n;
  },
  gainSidebarNav(state, n) {
    state.sidebarNav = n;
  },
};
export default new Vuex.Store({
  state,
  mutations: {
		changeId(state, payload) {
		  state.dataId = payload;
		}
	}
});
