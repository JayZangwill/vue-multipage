import Vue from 'vue'
import Router from 'vue-router'
import app from './home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: app,
    },
  ],
})