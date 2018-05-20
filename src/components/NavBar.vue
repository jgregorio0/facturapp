<template>
  <div>

    <!--NAVBAR-->
    <b-navbar toggleable="true" type="dark" variant="primary">

      <!--SIDEBAR BTN-->
      <b-btn @click="chNavSideBar" :class="['navbar-toggler',{'active': showNavSideBar}]"><span
        class="navbar-toggler-icon"></span>
      </b-btn>

      <!--BRAND-->
      <b-navbar-brand :to="{ name: 'home'}">Facturapp</b-navbar-brand>
    </b-navbar>

    <!--SIDEBAR-->
    <div class="wrapper">
      <transition
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated fadeOutLeft">
        <!--justified-->
        <b-nav id="sidebar" vertical v-show="showNavSideBar">

          <!-- Sidebar Links -->
          <b-nav-item @click="chNavSideBar"
                      :to="{ name: 'home'}">Inicio
          </b-nav-item>
          <b-nav-item @click="chNavSideBar"
                      :to="{ name: 'guests'}">Inquilinos
          </b-nav-item>
          <b-nav-item @click="chNavSideBar"
                      :to="{ name: 'invoices'}">Facturas
          </b-nav-item>
          <b-nav-item @click="chNavSideBar"
                      :to="{ name: 'expenses'}">Gastos
          </b-nav-item>
          <b-nav-item @click="chNavSideBar"
                      :to="{ name: 'graphs'}">Gráficos
          </b-nav-item>

          <!--ACTION BUTTONS-->
          <app-action-buttons></app-action-buttons>
        </b-nav>
      </transition>

      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut">
        <div v-show="showNavSideBar" class="overlay" @click="chNavSideBar"></div>
      </transition>
    </div>
  </div>
</template>

<script>
  import ActionButtons from './ActionButtons'

  export default {
    components: {
      'app-action-buttons': ActionButtons
    },
    computed: {
      showNavSideBar () {
        return this.$store.getters.showNavSideBar
      }
    },
    methods: {
      chNavSideBar () {
        this.$store.commit('setShowNavSideBar', {showNavSideBar: !this.showNavSideBar})
      }
    }
  }
</script>

<style scoped>
  /*NAVBAR*/
  .navbar {
    height: 50px;
  }

  /*SIDEBAR*/
  /*sidebar wrapper*/
  .wrapper {
    display: block;
  }

  /*sidebar*/
  #sidebar {
    /*width 250px*/
    min-width: 250px;
    max-width: 250px;
    /*height 100% viewport*/
    height: 100vh;
    /* transparent black */
    background: rgba(255, 255, 255, 0.8);
    /*position fixed top left corner*/
    position: fixed;
    top: 50px;
    left: 0;
    /* top layer */
    z-index: 9999;
  }

  /*black transparent midle layer */
  .overlay {
    /* full screen */
    width: 100vw;
    height: 100vh;
    /* transparent black */
    background: rgba(99, 99, 99, 0.8);
    /*position fixed top left corner*/
    position: fixed;
    top: 50px;
    left: 0;
    /*display: none; --> v-show="showNavSideBar"*/
    /* middle layer, i.e. appears below the sidebar */
    z-index: 9998;
  }

  /*Close sidebar btn*/
  /*#dismiss {
    !*width and heigh 35px*!
    width: 35px;
    height: 35px;
    position: absolute;
    !* top right corner of the sidebar *!
    top: 10px;
    right: 10px;
  }*/
</style>
