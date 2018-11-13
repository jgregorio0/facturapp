<template>
  <div class="info-modal">
    <b-button class="m-1" sm variant="outline-primary"
              @click="showModal">
      <Icon name="info"></Icon>
    </b-button>
    <b-modal ref="guestModal" title="Ayuda" hide-footer size="lg">
      <div class="d-block text-center">
        <h3>Ayuda inquilinos</h3>
        <b-tabs>
          <b-tab title="Añadir inquilino" active>
            <guest-modal-carousel></guest-modal-carousel>
          </b-tab>
          <b-tab title="Eliminar inquilino" >
            <br>I'm the second tab content
          </b-tab>
          <b-tab title="disabled" disabled>
            <br>Disabled tab!
          </b-tab>
        </b-tabs><!--
        <ul>
          <li>Añadir inquilino</li> &lt;!&ndash;TODO modal guest Añadir inquilino&ndash;&gt;
          <li>Campos del inquilino</li> &lt;!&ndash;TODO modal guest Campos del inquilino&ndash;&gt;
          <li>Eliminar inquilino</li> &lt;!&ndash;TODO modal guest Eliminar inquilino&ndash;&gt;
          <li>Siguiente paso: facturas</li> &lt;!&ndash;TODO modal guest Siguiente paso: facturas&ndash;&gt;
        </ul>-->
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Cerrar</b-btn>
    </b-modal>
  </div>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons/info'
  import GuestModalCarousel from './GuestModalCarousel'

  export default {
    components: {
      Icon,
      GuestModalCarousel
    },
    mounted () {
      if (this.guests.length === 0) {
        this.showModal()
      } else {
        this.hideModal()
      }
    },
    computed: {
      guests () {
        return this.$store.getters.guests
      }
    },
    methods: {
      showModal () {
        this.$refs.guestModal.show()
      },
      hideModal () {
        this.$refs.guestModal.hide()
      }
    }
  }
</script>
