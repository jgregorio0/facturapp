<template>
    <div>
      <b-navbar toggleable="true" type="dark" variant="primary">


        <b-btn v-b-modal.navSideBarModal class="navbar-toggler"><span class="navbar-toggler-icon"></span></b-btn>
        <b-navbar-brand href="#">Facturas</b-navbar-brand>

        <!-- Modal Component -->
        <b-modal id="navSideBarModal" hide-header hide-footer no-fade hide-backdrop class="float-left" >
          <b-nav vertical>
            <!--<b-nav-item :to="{ name: 'home'}">Inicio</b-nav-item>-->
            <b-nav-item :to="{ name: 'invoices'}">Facturas</b-nav-item>
            <b-nav-item :to="{ name: 'guests'}">Inquilinos</b-nav-item>
            <b-nav-item :to="{ name: 'expenses'}">Gastos</b-nav-item>
            <b-nav-item :to="{ name: 'graphs'}">Gráficos</b-nav-item>
          </b-nav>
        </b-modal>
      </b-navbar>


    </div>
</template>

<script>
  export default {}
</script>

<style>
</style>
