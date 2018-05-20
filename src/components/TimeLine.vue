<template>
  <b-progress class="mt-1" :max="max" show-value>
    <!--<b-progress-bar v-for=""-->
    <!--<b-progress-bar :value="counter*(6/10)" variant="success"></b-progress-bar>
    <b-progress-bar :value="counter*(2.5/10)" variant="warning"></b-progress-bar>
    <b-progress-bar :value="counter*(1.5/10)" variant="danger"></b-progress-bar>-->
  </b-progress>
</template>

<script>
  export default {
    name: 'TableInvoice',
    data () {
      return {
        fields: [
          {
            key: 'type',
            label: 'Tipo',
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
            key: 'price',
            label: 'Importe',
            sortable: true
          }],
        items: [
          {
            type: 'GAS', from: '20/07/2017', to: '19/09/2017', price: '106,07'
          },
          {
            type: 'GAS', from: '19/09/2017', to: '21/11/2017', price: '88,98'
          }
        ]
      }
    }
  }
</script>

<style>
</style>
