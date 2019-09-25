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
      path: '/test',
      name: 'test',
      component: () => import(/* webpackChunkName: "test" */ './views/test.vue'),
    },
  ],
})