import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import Invoices from '../components/Invoices.vue'
import Guests from '../components/Guests.vue'
import Expenses from '../components/Expenses.vue'
import Graphs from '../components/Graphs.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: { 'name': 'home' }
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/guests',
      name: 'guests',
      component: Guests
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: Invoices
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: Expenses
    },
    {
      path: '/graphs',
      name: 'graphs',
      component: Graphs
    },
    {
      path: '*',
      redirect: {name: 'home'}
    }
  ]
})
