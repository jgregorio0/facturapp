import Vue from 'vue'
import Router from 'vue-router'

import Invoices from '../components/Invoices.vue'
import Guests from '../components/Guests.vue'
import Expenses from '../components/Expenses.vue'
import Graphs from '../components/Graphs.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: { 'name': 'guests' }
    },
    {
      path: '/inquilinos',
      name: 'guests',
      component: Guests
    },
    {
      path: '/facturas',
      name: 'invoices',
      component: Invoices
    },
    {
      path: '/gastos',
      name: 'expenses',
      component: Expenses
    },
    {
      path: '/graficos',
      name: 'graphs',
      component: Graphs
    },
    {
      path: '*',
      redirect: {name: 'index'}
    }
  ]
})
