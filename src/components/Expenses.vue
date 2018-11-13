<template>
  <div class="expenses mt-5 mb-5">
    <app-expenses-modal></app-expenses-modal>
    <app-expenses-table></app-expenses-table>
  </div>
</template>

<script>
  import ExpensesTable from './ExpensesTable.vue'
  import ExpensesModal from './ExpensesModal.vue'

  export default {
    name: 'guests',
    components: {
      'app-expenses-table': ExpensesTable,
      'app-expenses-modal': ExpensesModal
    }
  }
</script>

<style>
</style>
