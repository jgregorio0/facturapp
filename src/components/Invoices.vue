<template>
  <div class="invoices mb-5">
    <app-invoice-modal></app-invoice-modal>
    <app-invoice-form></app-invoice-form>
    <app-invoice-table></app-invoice-table>
  </div>
</template>

<script>
  import InvoiceModal from './InvoiceModal.vue'
  import InvoiceForm from './InvoiceForm.vue'
  import InvoiceTable from './InvoiceTable.vue'

  export default {
    name: 'invoices',
    components: {
      'app-invoice-modal': InvoiceModal,
      'app-invoice-form': InvoiceForm,
      'app-invoice-table': InvoiceTable
    }
  }
</script>

<style>
</style>
