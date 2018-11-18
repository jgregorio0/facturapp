import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import { calcPricePerDay } from '../utils/expensesUtil'
import { parseToMoment, isRangeTimeIntersectingAtRangeTime } from '../utils/dateUtil'

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
    invoices: [],
    allInvoices: [],
    guests: [],
    direction: 'right',
    showNavSideBar: false
  },
  getters: {
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
    }
  },
  mutations: {
    addInvoice: (state, payload) => {
      payload.index = state.invoices.length
      payload.pricePerDay = calcPricePerDay(payload)
      state.allInvoices.push(payload)
      state.invoices.push(payload)
    },
    rmInvoice: (state, payload) => {
      state.allInvoices.splice(payload.index, 1)
      updateIndexes(state.allInvoices, payload.index)

      state.invoices.splice(payload.index, 1)
      updateIndexes(state.invoices, payload.index)
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
    }
  },
  actions: {
    filterInvoicesByDates (context, payload) {
      let invoices = []
      for (let invoice of context.getters.allInvoices) {
        if (
          isRangeTimeIntersectingAtRangeTime(
            parseToMoment(invoice.from).valueOf(),
            parseToMoment(invoice.to).valueOf(),
            payload.from,
            payload.to
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
