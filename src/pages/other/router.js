import Vue from 'vue'
import Router from 'vue-router'
import app from './index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'other',
      component: app,
    },
  ],
})