<template>
  <div id="expenses-table" class="table">

    <!--TITLE-->
    <!--<h1 class="mt-3 text-center">Gastos</h1>-->

    <!--ERROR MSG-->
    <b-alert variant="danger"
             :show="isCalcCostError">
      ERROR de cálculo detectado. El coste total de las facturas {{ sumCalcCostByInvoices }} no coincide con la suma del
      coste calculado por huesped {{ sumCalcCostByGuest }}
    </b-alert>

    <!--LIST OF GUESTS-->
    <div role="tablist">

      <!--GUEST CARD-->
      <b-card :id="'expenses-' + guest.index" no-body
              v-for="(guest, index) in guests" :key="guest.index">

        <!--SUMMARY GUEST-->
        <b-container class="mt-3">
          <b-list-group>
            <b-row>
              <b-col>
                <b-list-group-item>
                  <b-container>
                    <b-row>
                      <b-col cols="10">
                        <span class="d-block font-weight-bold p-1">
                          Gastos de {{ guest.name }}<!-- [{{ guest.from }}, {{ guest.to }}]-->
                        </span>
                      </b-col>
                      <b-col>
                        <!--<span class="download-pdf float-right ml-1"
                              v-b-tooltip.hover="'Descargar PDF con los gastos individuales del inquilino'"
                              @click="downloadPdfbyGuests([guest])">
                          <icon name="file-pdf-o" scale="2"></icon>
                        </span>-->
                        <span class="float-right money p-1">{{ costsByGuest(guest) }}</span>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-list-group-item>
              </b-col>
            </b-row>
          </b-list-group>
        </b-container>

        <!--ACCORDION HEADER-->
        <b-card-header header-tag="header" role="tab"
                       :class="accordeonHeaderClass(index)">
          <b-btn block href="#" v-b-toggle="'collapse-' + index" variant="default">
            <span>{{ accordeonHeaderText(index) }}</span>
            <span class="float-right">
              <icon name="chevron-down"
                    :flip="chevronFlip(index)"></icon>
            </span>
          </b-btn>
        </b-card-header>

        <!--ACCORDION BODY-->
        <b-collapse :id="'collapse-' + index" role="tabpanel"
                    :accordion="'expenses-accordeon-' + index"
                    v-model="collapses[index]">
          <b-card-body>
            <b-table striped hover small
                     :items="invoices" :fields="fields"
                     sort-by="to" :sort-desc="true">
              <template slot="pricePerGuest" slot-scope="data">
                {{ costsByGuestAndInvoice(guest, data.item) }}
              </template>
            </b-table>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>

    <!--SUMMARY TOTAL-->
    <b-container>
      <b-list-group>
        <b-row>
          <b-col>
            <b-list-group-item>
              <b-container>
                <b-row>
                  <b-col><span class="d-block font-weight-bold p-1">Gasto total</span></b-col>
                  <b-col>
                    <span class="download-pdf float-right ml-1"
                          v-b-tooltip.hover="'Descargar PDF con los gastos de todos los inquilinos'"
                          @click="downloadPdfbyGuests(guests)">
                      <icon name="file-pdf-o" scale="2"></icon>
                    </span>

                    <span class="float-right money p-1">{{ sumCalcCostByGuest }}</span></b-col>
                </b-row>
              </b-container>
            </b-list-group-item>
          </b-col>
        </b-row>
      </b-list-group>
    </b-container>
  </div>
</template>

<script>
  import {
    calcCostByGuest
    , calcCostByGuestAndInvoice
    , calcCostByInvoices
    , calcCostByAllGuests
    , validateArray
    , validateObject
  } from '../utils/expensesUtil'
  import {diffDaysStr, minFromStr, maxToStr} from '../utils/dateUtil'
  import {generatePDFTables} from '../utils/pdfUtil'
  import 'vue-awesome/icons/chevron-down'
  import 'vue-awesome/icons/file-pdf-o'
  import Icon from 'vue-awesome/components/Icon'

  export default {
    data () {
      return {
        collapses: [],
        fields: [
          {
            key: 'type',
            label: 'Tipo',
            sortable: true
          },
          {
            key: 'price',
            label: 'Importe',
            sortable: true
          },
          {
            key: 'from',
            label: 'Desde',
            sortable: true
          },
          {
            key: 'to',
            label: 'Hasta',
            sortable: true
          },
          {
            key: 'pricePerGuest',
            label: 'Gasto'
          }
        ]
      }
    },
    components: {
      Icon
    },
    computed: {
      guests () {
        return this.$store.getters.guests
      },
      invoices () {
        return this.$store.getters.invoices
      },
      sumCalcCostByInvoices () {
        return validateArray(this.invoices) ? calcCostByInvoices(this.invoices).toFixed(2) : '0'
      },
      sumCalcCostByGuest () {
        return validateArray(this.invoices) && validateArray(this.guests)
          ? calcCostByAllGuests(this.guests, this.invoices).toFixed(2)
          : '0'
      },
      isCalcCostError () {
        return this.sumCalcCostByInvoices !== this.sumCalcCostByGuest
      }
    },
    methods: {
      costsByGuestAndInvoice (guest, invoice) {
        return validateObject(guest) && validateObject(invoice)
          ? calcCostByGuestAndInvoice(guest, invoice, this.guests).toFixed(2)
          : '0'
      },
      costsByGuest (guest) {
        return validateObject(guest) && validateArray(this.invoices) && validateArray(this.guests)
          ? calcCostByGuest(guest, this.invoices, this.guests).toFixed(2)
          : '0'
      },
      isActiveCollapse (index) {
        if (this.collapses[index] === undefined) {
          this.collapses[index] = true
        }
        return this.collapses[index] === true
      },
      accordeonHeaderClass (index) {
        return {'p-1': true, 'active': this.isActiveCollapse(index)}
      },
      accordeonHeaderText (index) {
        return this.isActiveCollapse(index) ? 'Ocultar detalle' : 'Ver detalle'
      },
      chevronFlip (index) {
        return this.isActiveCollapse(index) ? 'vertical' : 'horizontal'
      },
      downloadPdfbyGuests (guests) {
        let tables = []
        // Facturas
        let titleInvoices = 'Facturas'
        let headerInvoices = ['Tipo', 'Importe', 'Desde', 'Hasta', 'Días', 'Importe/Día']
        let bodyInvoices = []

        for (let invoice of this.invoices) {
          bodyInvoices.push(
            [invoice.type, invoice.price, invoice.from, invoice.to,
              diffDaysStr(invoice.from, invoice.to).toFixed(0), invoice.pricePerDay.toFixed(2)])
        }
        tables.push({
          title: titleInvoices,
          header: headerInvoices,
          body: bodyInvoices,
          footer: 'TOTAL: ' + calcCostByInvoices(this.invoices).toFixed(2)
        })

        // Gasto por inquilino
        let headerGuests = ['Inquilino', 'Tipo', 'Importe', 'Desde', 'Hasta', 'Gasto']
//        let table = [['Inquilino', 'Tipo', 'Importe', 'Desde', 'Hasta', 'Gasto']]
        for (let guest of guests) {
          let titleGuests = 'Gasto de ' + guest.name + ': ' + this.costsByGuest(guest)
          let bodyGuests = []
          for (let invoice of this.invoices) {
            bodyGuests.push(
              [guest.name, invoice.type, invoice.price, invoice.from, invoice.to,
                this.costsByGuestAndInvoice(guest, invoice)])
          }

          tables.push({
            title: titleGuests,
            header: headerGuests,
            body: bodyGuests
          })
        }
        generatePDFTables(tables, 'Gastos_' + minFromStr(this.invoices) + '_' + maxToStr(this.invoices) + '.pdf')
      }
    }
  }
</script>

<style scoped>
  .money {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
    position: relative;
    border: 1px solid transparent;
    border-radius: 0.25rem;
  }

  .sumary-guest {
    margin-top: 5px;
  }

  .download-pdf {
    cursor: pointer;
  }
</style>
