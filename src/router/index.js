/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../views/layout';

Vue.use(Router);

export default new Router({
  routes: [
    { // 首页
      path: '/main',
      component: Layout,
      redirect: '/main/home',
      children: [{
        path: 'home',
        name: 'home',
        component: resolve => require(['@/views/main/main'], resolve),
      }, ],
    },
    { // 促销管理
      path: '/sales-promotion',
      component: Layout,
      redirect: '/sales-promotion/group-manage',
      children: [{
        path: 'group-manage',
        name: 'group-manage',
        component: resolve => require(['@/views/salesPromotion/groupManage/groupManage'], resolve),
      }, {
        path: 'group-detial',
        name: 'group-detial',
        component: resolve => require(['@/views/salesPromotion/groupManage/groupDetial'], resolve),
      }, {
        path: 'seckill-manage',
        name: 'seckill-manage',
        component: resolve => require(['@/views/salesPromotion/seckillManage/seckillManage'], resolve),
      }, {
        path: 'seckill-detial',
        name: 'seckill-detial',
        component: resolve => require(['@/views/salesPromotion/seckillManage/seckillDetial'], resolve),
      }, {  // 团购模块
        path: 'groupbuy-manage',
        name: 'groupbuy-manage',
        component: resolve => require(['@/views/salesPromotion/groupBuyManage/groupBuyManage'], resolve),
      }, {
          path: 'groupbuy-detail',
          name: 'groupbuy-detail',
          component: resolve => require(['@/views/salesPromotion/groupBuyManage/groupBuyDetail'], resolve),
      }],
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/Login/Index'], resolve),
      meta: {
        title: '登录',
        nologin: true,
      },
    },
    {
      path: '*',
      component: resolve => require(['@/views/404/404'], resolve),
      meta: {
        nologin: true,
      }
    },
  ],
});
