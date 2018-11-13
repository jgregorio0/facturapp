import {
  calcCostByGuestAndInvoice,
  calcNumGuestsIntoInvoiceTimeRange,
  calcCostByGuest,
  calcCostByInvoices
} from '../../../src/utils/expensesUtil'

const data = {
  "invoices": [{
    "type": "GAS",
    "from": "2017-11-21",
    "to": "2018-01-18",
    "price": "25.14",
    "index": 0,
    "pricePerDay": 0.43344827586206897
  }, {
    "type": "LUZ",
    "from": "2017-12-13",
    "to": "2018-02-04",
    "price": "148.29",
    "index": 1,
    "pricePerDay": 2.7979245283018868
  }, {
    "type": "AGUA",
    "from": "2017-10-20",
    "to": "2018-01-18",
    "price": "98.75",
    "index": 2,
    "pricePerDay": 1.0972222222222223
  }],
  "guests": [{"name": "Jesús", "from": "2015-12-26", "to": "2019-01-26", "index": 0}, {
    "name": "Yan",
    "from": "2015-01-16",
    "to": "2020-02-16",
    "index": 1
  }, {"name": "Johns", "from": "2018-01-18", "to": "2018-07-18", "index": 2}]
}

const results = {
  calcNumGuestsIntoInvoiceTimeRange: {
    // GAS [2017-11-21, 2018-01-18]
    0: 2,
    // LUZ [2017-12-13, 2018-02-04]
    1: 3,
    // AGUA [2017-10-20, 2018-01-18]
    2: 2
  },
  calcCostByGuestAndInvoice: {
    //Jesús
    0: {
      // GAS [2017-11-21, 2018-01-18]
      0: 12.57,
      // LUZ [2017-12-13, 2018-02-04]
      1: 66.21754717,
      // AGUA [2017-10-20, 2018-01-18]
      2: 49.375
    },
    // Yan
    1: {
      // GAS [2017-11-21, 2018-01-18]
      0: 12.57,
      // LUZ [2017-12-13, 2018-02-04]
      1: 66.21754717,
      // AGUA [2017-10-20, 2018-01-18]
      2: 49.375
    },
    // Jhonns
    2: {
      // GAS [2017-11-21, 2018-01-18]
      0: 0,
      // LUZ [2017-12-13, 2018-02-04]
      1: 15.85490566,
      // AGUA [2017-10-20, 2018-01-18]
      2: 0
    },
  }
}

test('Number of Guests Into Invoice Time Range', () => {
 for (let invoice of data.invoices) {
 expect(calcNumGuestsIntoInvoiceTimeRange(invoice, data.guests))
 .toBe(results.calcNumGuestsIntoInvoiceTimeRange[invoice.index])
 }
 })

 test('Cost By Guest And Invoice', () => {
 for (let guest of data.guests) {
 for (let invoice of data.invoices) {
 // invoice.pricePerDay * guestDaysIntoInvoiceTimeRange) / numGuestsIntoInvoiceTimeRange
 expect(calcCostByGuestAndInvoice(guest, invoice, data.guests).toFixed(6))
 .toBe(results.calcCostByGuestAndInvoice[guest.index][invoice.index].toFixed(6))
 }
 }
 })

test('Cost SUM By Guest And Invoice and compare with sum of Invoices', () => {
  // his.sumCalcCostByGuest
  let sumCostsByGuest = 0
  for (let guest of data.guests) {
    sumCostsByGuest += calcCostByGuest(guest, data.invoices, data.guests)
  }
  // this.sumCalcCostByInvoices
  let sumAllInvoices = calcCostByInvoices(data.invoices)
  expect(sumCostsByGuest.toFixed(6))
    .toBe(sumAllInvoices.toFixed(6))
})
