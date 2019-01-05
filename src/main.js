import Vue from 'vue';
import Element from 'element-ui';
import preview from 'vue-photo-preview';
import instance from '@/utils/fetch';
import 'vue-photo-preview/dist/skin.css';
import '@/assets/css/element-variables.scss';
import '@/assets/css/public.scss';
import './router/permission';
import './assets/css/iconfont.css';
import App from './App';
import router from './router';
import store from './store/store';
import api from './api';
import filters from './filters';
import tools from './tools';

Vue.use(Element);
Vue.use(preview);
Vue.config.productionTip = false;
Vue.prototype.$http = instance;
Vue.prototype.$api = api;
Vue.prototype.$tools = tools;

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
