<template>
  <li class="nav-item">

    <!--BUTTONS GROUP-->
    <b-button-group vertical>
      <b-btn v-b-modal.import variant="outline-secondary">
        <Icon name="folder-open"></Icon>
        <span>Abrir</span>
      </b-btn>
      <b-btn @click="exportData" variant="outline-secondary">
        <Icon name="save"></Icon>
        <span>Guardar</span>
      </b-btn>
      <b-btn @click="reset" variant="outline-danger">
        <Icon name="trash"></Icon>
        <span>Borrar</span>
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
  import {download} from '../utils/fileUtil'

  export default {
    computed: {
      invoices () {
        return this.$store.getters.invoices
      },
      guests () {
        return this.$store.getters.guests
      }
    },
    methods: {
      exportData () {
        download('data.json', {
          invoices: this.invoices,
          guests: this.guests
        })
      },
      reset () {
        this.$store.commit('setGuests', [])
        this.$store.commit('setInvoices', [])
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
