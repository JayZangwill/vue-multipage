import Vue from 'vue'
import Router from 'vue-router'
import app from './home'
// import other from '../other'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: app,
    },
    {
      path: '/other',
      name: 'other',
      component: () => import(/* webpackChunkName: "other" */ '../other/index.vue'),
    },
  ],
})