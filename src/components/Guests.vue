<template>
  <div class="guests mt-5 mb-5">
    <app-guest-modal></app-guest-modal>
    <app-guest-form></app-guest-form>
    <app-guest-table></app-guest-table>
  </div>
</template>

<script>
  import GuestModal from './GuestModal.vue'
  import GuestForm from './GuestForm.vue'
  import GuestTable from './GuestTable.vue'

  export default {
    name: 'guests',
    components: {
      "app-guest-modal": GuestModal,
      'app-guest-form': GuestForm,
      'app-guest-table': GuestTable
    }
  }
</script>

<style>
</style>
