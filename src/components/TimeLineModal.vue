<template>
  <div class="info-modal">
    <b-button class="m-1" sm variant="outline-primary" @click="showModal">
      <Icon name="info"></Icon>
    </b-button>
    <b-modal ref="timeLineModal" title="Ayuda filtro por rango de fecha" hide-footer size="lg">
      <div class="d-block text-center">
        <b-img thumbnail fluid src="/static/img/gif/timeline.gif"></b-img>
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
      this.$refs.timeLineModal.show()
    },
    hideModal () {
      this.$refs.timeLineModal.hide()
    }
  }
}
</script>
