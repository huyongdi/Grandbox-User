import Vue from 'vue'
import Router from 'vue-router'
import AllHome from '@/components/AllHome'
import Login from '@/components/Login'
import Report from '@/components/Report'
import Result from '@/components/result'
import Gene from '@/components/Gene'
import GeneD from '@/components/geneD'
import Disease from '@/components/disease'
import VariationD from '@/components/VariationD'
import OMIM from '@/components/omim'
import userList from '@/components/userList'

import MyData from '@/components/myData'
import addSample from '@/components/addSample'
import sampleD from '@/components/sampleD'

import Phenotype from '@/components/phenotype'
import PhenotypeD from '@/components/PhenotypeD'

import phSearch from '@/components/phSearch'


import p404 from '@/components/404'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/p404',
      name: 'p404',
      component: p404
    },
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
      path: '/addSample',
      name: 'addSample',
      component: addSample
    },
    {
      path: '/sampleD',
      name: 'sampleD',
      component: sampleD
    },
    {
      path: '/gene',
      name: 'gene',
      component: Gene
    },
    {
      path: '/result',
      name: 'result',
      component: Result
    },
    {
      path: '/report',
      name: 'report',
      component: Report
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
    {
      path: '/phenotypeD',
      name: 'phenotypeD',
      component: PhenotypeD
    },
    {
      path: '/variationD',
      name: 'variationD',
      component: VariationD
    },
    {
      path: '/phSearch',
      name: 'phSearch',
      component: phSearch
    },
    {
      path: '/omim',
      name: 'omim',
      component: OMIM
    },
    {
      path: '/userList',
      name: 'userList',
      component: userList
    },
  ]
})
