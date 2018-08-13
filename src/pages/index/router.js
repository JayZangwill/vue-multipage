import Vue from 'vue'
import Router from 'vue-router'
import one from '@/components/one';
import HelloWorld from '../../components/HelloWorld'
Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: HelloWorld,
  },{
    path: '/one',
    name: 'one',
    component: one
  }]
})