<template>
  <div class="info-modal">
    <b-button class="m-1" sm variant="outline-primary"
              @click="showModal">
      <Icon name="info"></Icon>
    </b-button>
    <b-modal ref="expensesModal" title="Ayuda" hide-footer size="lg">
      <div class="d-block text-center">
        <h3>Ayuda gastos</h3>
        <ul>
          <li>Añadir inquilino</li> <!--TODO modal guest Añadir inquilino-->
          <li>Campos del inquilino</li> <!--TODO modal guest Campos del inquilino-->
          <li>Eliminar inquilino</li> <!--TODO modal guest Eliminar inquilino-->
          <li>Siguiente paso: facturas</li> <!--TODO modal guest Siguiente paso: facturas-->
        </ul>
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Cerrar</b-btn>
    </b-modal>
  </div>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons/info'

  export default {
    components: {
      Icon
    },
    mounted () {
      if (this.guests.length === 0 || this.invoices.length === 0) {
        this.showModal()
      } else {
        this.hideModal()
      }
    },
    computed: {
      guests () {
        return this.$store.getters.guests
      },
      invoices () {
        return this.$store.getters.invoices
      }
    },
    methods: {
      showModal () {
        this.$refs.expensesModal.show()
      },
      hideModal () {
        this.$refs.expensesModal.hide()
      }
    }
  }
</script>
