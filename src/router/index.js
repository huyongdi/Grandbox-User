import Vue from 'vue'
import Router from 'vue-router'
import AllHome from '@/components/AllHome'
import Login from '@/components/Login'
import MyData from '@/components/myData'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'aHome',
      component: AllHome
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/myData',
      name: 'myData',
      component: MyData
    },
  ]
})
