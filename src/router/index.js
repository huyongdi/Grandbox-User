import Vue from 'vue'
import Router from 'vue-router'
import AllHome from '@/components/AllHome'
import Login from '@/components/Login'
import MyData from '@/components/myData'
import Gene from '@/components/Gene'
import GeneD from '@/components/geneD'
import Disease from '@/components/disease'
import Phenotype from '@/components/phenotype'


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
    {
      path: '/gene',
      name: 'gene',
      component: Gene
    },
    {
      path: '/geneD',
      name: 'geneD',
      component: GeneD
    },
    {
      path: '/disease',
      name: 'disease',
      component: Disease
    },
    {
      path: '/phenotype',
      name: 'phenotype',
      component: Phenotype
    },
  ]
})