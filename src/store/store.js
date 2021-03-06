import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import { calcPricePerDay } from '../utils/expensesUtil'
import {
  parseToMoment,
  isRangeTimeIntersectingAtRangeTime
} from '../utils/dateUtil'

Vue.use(Vuex)

export const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { path: '/' }),
        removeItem: key => Cookies.remove(key)
      }
    })
  ],
  state: {
    cookiesEnabled: null,
    invoices: [],
    allInvoices: [],
    guests: [],
    direction: 'right',
    showNavSideBar: false,
    filterDateFrom: 0,
    filterDateTo: Number.MAX_SAFE_INTEGER
  },
  getters: {
    cookiesEnabled: state => {
      return state.cookiesEnabled
    },
    invoices: state => {
      return state.invoices
    },
    allInvoices: state => {
      return state.allInvoices
    },
    guests: state => {
      return state.guests
    },
    direction: state => {
      return state.direction
    },
    showNavSideBar: state => {
      return state.showNavSideBar
    },
    filterDateFrom: state => {
      return state.filterDateFrom
    },
    filterDateTo: state => {
      return state.filterDateTo
    }
  },
  mutations: {
    cookiesEnabled: (state, isCookiesEnabled) => {
      console.log('cookiesEnabled :', isCookiesEnabled)
      state.cookiesEnabled = isCookiesEnabled
    },
    addInvoice: (state, payload) => {
      payload.index = state.invoices.length
      payload.pricePerDay = calcPricePerDay(payload)
      state.allInvoices.push(payload)
      state.invoices.push(payload)
    },
    rmInvoice: (state, payload) => {
      console.log('rmInvoice index :', payload.index)
      state.allInvoices.splice(payload.index, 1)
      updateIndexes(state.allInvoices, payload.index)
    },
    addGuest: (state, payload) => {
      payload.index = state.guests.length
      state.guests.push(payload)
    },
    rmGuest: (state, payload) => {
      state.guests.splice(payload.index, 1)
      updateIndexes(state.guests, payload.index)
    },
    setGuests: (state, payload) => {
      state.guests = payload
    },
    setAllInvoices: (state, payload) => {
      state.allInvoices = payload
    },
    setInvoices: (state, payload) => {
      state.invoices = payload
    },
    setDirection: (state, payload) => {
      state.direction = payload.direction
    },
    updateDirection: (state, payload) => {
      if (payload.prevId < payload.currId) {
        // console.log('direction to right', payload.prevId, "<", payload.currId)
        state.direction = 'right'
      } else {
        // console.log('direction to left', payload.prevId, ">", payload.currId)
        state.direction = 'left'
      }
    },
    setShowNavSideBar: (state, payload) => {
      state.showNavSideBar = payload.showNavSideBar
    },
    setFilterDateFrom: (state, filterDateFrom) => {
      state.filterDateFrom = filterDateFrom
    },
    setFilterDateTo: (state, filterDateTo) => {
      state.filterDateTo = filterDateTo
    }
  },
  actions: {
    rmInvoice (context, payload) {
      context.commit('rmInvoice', {index: payload.index})
      context.dispatch('filterInvoicesByDates')
    },
    filterInvoicesByDates (context) {
      let invoices = []
      for (let invoice of context.getters.allInvoices) {
        if (
          isRangeTimeIntersectingAtRangeTime(
            parseToMoment(invoice.from).valueOf(),
            parseToMoment(invoice.to).valueOf(),
            context.getters.filterDateFrom,
            context.getters.filterDateTo
          )
        ) {
          invoices.push(invoice)
        }
      }
      context.commit('setInvoices', invoices)
    }
  }
})

/**
 * Update index param from
 * @param list
 * @param rmIndex
 */
function updateIndexes (list, rmIndex) {
  if (list[rmIndex] === undefined) {
    return
  }

  list[rmIndex].index = rmIndex
  updateIndexes(list, rmIndex + 1)
}
