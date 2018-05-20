<template>
  <div class="info-modal">
    <b-button class="m-1" sm variant="outline-primary"
              @click="showModal">
      <Icon name="info"></Icon>
    </b-button>
    <b-modal ref="invoiceModal" title="Ayuda" hide-footer size="lg">
      <div class="d-block text-center">
        <h3>Ayuda facturas</h3>
        <ul>
          <li>Añadir factura</li> <!--TODO modal invoices Añadir inquilino-->
          <li>Campos de la factura</li> <!--TODO modal invoice Campos del inquilino-->
          <li>Eliminar factura</li> <!--TODO modal invoice Eliminar inquilino-->
          <li>Siguiente paso: gastos</li> <!--TODO modal invoice Siguiente paso: facturas-->
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
      if (this.invoices.length === 0) {
        this.showModal()
      } else {
        this.hideModal()
      }
    },
    computed: {
      invoices () {
        return this.$store.getters.invoices
      }
    },
    methods: {
      showModal () {
        this.$refs.invoiceModal.show()
      },
      hideModal () {
        this.$refs.invoiceModal.hide()
      }
    }
  }
</script>
