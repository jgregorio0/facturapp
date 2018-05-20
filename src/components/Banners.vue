<template>
  <!--BANNERS-->
  <b-container id="banners" fluid class="p-2 bg-dark">
    <b-row class="text-center">

      <b-col md="6" lg="3">
        <b-button :to="{ name: 'guests' }" variant="dark"
                  v-b-tooltip.hover.right="'Inquilinos'">
          <icon name="bed" scale="8"></icon>
        </b-button>
      </b-col>
      <b-col md="6" lg="3">
        <b-button :to="{ name: 'invoices' }" variant="dark"
                  v-b-tooltip.hover.right="'Facturas'">
          <icon name="bolt" scale="7"></icon>
        </b-button>
      </b-col>
      <b-col md="6" lg="3">
        <b-button :to="{ name: 'expenses' }" variant="dark"
                  v-b-tooltip.hover.right="'Gastos'">
          <icon name="dollar" scale="7"></icon>
        </b-button>
      </b-col>
      <b-col md="6" lg="3">
        <b-button :to="{ name: 'graphs' }" variant="dark"
                  v-b-tooltip.hover.right="'Gráficos'">
          <icon name="line-chart" scale="8"></icon>
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import 'vue-awesome/icons/bed'
  import 'vue-awesome/icons/dollar'
  import 'vue-awesome/icons/bolt'
  import 'vue-awesome/icons/line-chart'
  import Icon from 'vue-awesome/components/Icon'

  export default {
    components: {
      Icon
    }
  }
</script>

<style>
</style>
