<template>
  <li class="nav-item">

    <!--BUTTONS GROUP-->
    <b-button-group vertical class="w-100">
      <b-btn @click="cookieRemovedCookie" variant="outline-secondary">
        <Icon name="cog" class="float-left mr-3 mt-1"></Icon>
        <span class="float-left">Cookies</span>
      </b-btn>
      <b-btn v-b-modal.import variant="outline-secondary">
        <Icon name="folder-open" class="float-left mr-3 mt-1"></Icon>
        <span class="float-left">Abrir</span>
      </b-btn>
      <b-btn @click="exportData" variant="outline-secondary">
        <Icon name="save" class="float-left mr-3 mt-1"></Icon>
        <span class="float-left">Guardar</span>
      </b-btn>
      <b-btn @click="reset" variant="outline-danger">
        <Icon name="trash" class="float-left mr-3 mt-1"></Icon>
        <span class="float-left">Borrar</span>
      </b-btn>
    </b-button-group>

    <!-- IMPORT MODAL -->
    <app-import-modal></app-import-modal>
  </li>
</template>

<script>
  import ImportModal from './ImportModal.vue'
  import Icon from 'vue-awesome/components/Icon'

  import 'vue-awesome/icons/save'
  import 'vue-awesome/icons/folder-open'
  import 'vue-awesome/icons/trash'
  import 'vue-awesome/icons/cog'
  import {download} from '../utils/fileUtil'

  export default {
    computed: {
      allInvoices () {
        return this.$store.getters.allInvoices
      },
      guests () {
        return this.$store.getters.guests
      }
    },
    methods: {
      exportData () {
        download('data.json', {
          invoices: this.allInvoices,
          guests: this.guests
        })
      },
      reset () {
        this.$store.commit('setGuests', [])
        this.$store.commit('setInvoices', [])
        this.$store.commit('setAllInvoices', [])
      },
      cookieRemovedCookie () {
        this.$store.commit('cookiesEnabled', null)
        this.$store.commit('setShowNavSideBar', false)
      }
    },
    components: {
      'app-import-modal': ImportModal,
      Icon
    }
  }
</script>

<style>
</style>
