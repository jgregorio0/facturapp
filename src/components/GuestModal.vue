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
            <small>Desde el primer dia de estancia hasta el ultimo dia de estancia</small>
            <b-img thumbnail fluid src="/static/img/gif/guests_new.gif"></b-img>
          </b-tab>
          <b-tab title="Eliminar inquilino" >
            <b-img thumbnail fluid src="/static/img/gif/guests_rm.gif"></b-img>
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
