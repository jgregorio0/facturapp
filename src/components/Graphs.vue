<template>
  <div class="graphs mt-5 mb-5">
    <app-graphs-modal></app-graphs-modal>
    <app-graph-total-cost-per-day></app-graph-total-cost-per-day>
  </div>
</template>

<script>
  import GraphTotalCostPerDay from './GraphTotalCostPerDay.vue'
  import GraphsModal from './GraphsModal.vue'

  export default {
    name: 'guests',
    components: {
      'app-graph-total-cost-per-day': GraphTotalCostPerDay,
      'app-graphs-modal': GraphsModal
    }
  }
</script>

<style>
</style>
