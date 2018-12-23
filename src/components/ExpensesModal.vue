<template>
  <div class="info-modal">
    <b-button class="m-1" sm variant="outline-primary" @click="showModal">
      <Icon name="info"></Icon>
    </b-button>
    <b-modal ref="expensesModal" title="Ayuda" hide-footer size="lg">
      <div class="d-block text-center">
        <h3>Ayuda gastos</h3>
        <b-tabs>
          <b-tab title="Ver detalle de un inquilino" active>
            <!-- // TODO cambiar nombres -->
            <b-img thumbnail fluid src="/static/img/gif/invoices_new.gif"></b-img>
          </b-tab>
          <b-tab title="Division de las facturas por dia">
            <b-img thumbnail fluid src="/static/img/gif/guests_rm.gif"></b-img>
          </b-tab>
          <b-tab title="Periodo de facturacion">
            <ol>
              <li>
                <span>Cada huesped paga las facturas que entren en el periodo comprendido entre el primer y ultimo dia de estancia.</span>
              </li>
              <li>
                <span>El coste de las facturas se contabiliza incluyendo el primer dia de facturacion y excluyendo el ultimo. Este ultimo dia se incluira en la factura siguiente.</span>
              </li>
            </ol>
          </b-tab>
        </b-tabs>
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
