<template>
  <div>
    <!--BANNERS-->
    <app-banners></app-banners>

    <!--INTRO WITH MENU SIDEBAR-->
    <b-container fluid>
      <b-row>
        <b-col cols="10 mt-3">
          <div id="scrollspy-nested">

            <!--INTRO-->
            <div id="intro">
              <h1 id="intro-title">Bienvenido</h1>
              <p>Bienvenido a Facturapp, la aplicación para controlar tus facturas y dividir el gasto entre cada
                inquilino.</p>

              <!--CAROUSEL-->
              <app-carousel></app-carousel>
            </div>

            <!--FACTURAPP-->
            <div id="how-to-start">
              <h1 id="how-to-start-title">Cómo empezar</h1>
              <p>A medida que introduces los inquilinos y las facturas, la aplicación FACTURAPP calcula el gasto total y
                por inquilino. Puedes consultar un gráfico con el gasto en escala temporal.</p>
              <ol>
                <li>Introduce los inquilinos que habitan la vivienda, incluyendo su primer y último día de estancia.
                </li>
                <li>Añade las facturas disponibles. Incluye el importe de la factura y el periodo de facturación</li>
                <li>Visualiza el desglose del gastos por inquilino en la sección de Gastos.</li>
                <li>Accede a la sección de Gráficos donde puedes ver si ha incrementado o disminuido el importe de las
                  facturas.
                </li>
              </ol>
            </div>

            <!--GUESTS-->
            <div id="guests">
              <h1 id="guests-title">Inquilinos</h1>
              <p>Descripcion</p>
              <h2 id="guests-add-first">Añadir el primer inquilino</h2>
              <p>Descripcion</p>
              <h2 id="guests-add-more">Añadir inquilinos</h2>
              <p>Descripcion</p>
              <h2 id="guests-rm">Eliminar inquilino</h2>
              <p>Descripcion</p>
            </div>

            <!--INVOICES-->
            <div id="invoices">
              <h1 id="invoices-title">Facturas</h1>
              <p>Descripcion</p>
              <h1 id="invoices-add-first">Añadir el primer factura</h1>
              <p>Descripcion</p>
              <h1 id="invoices-add-more">Añadir facturas</h1>
              <p>Descripcion</p>
              <h1 id="invoices-rm">Eliminar factura</h1>
              <p>Descripcion</p>
            </div>

            <!--EXPENSES-->
            <div id="expenses">
              <h1 id="expenses-title">Gastos</h1>
              <p>Descripcion</p>
            </div>

            <!--GRAPHS-->
            <div id="graphs">
              <h1 id="graphs-title">Gráficos</h1>
              <p>Descripcion</p>
            </div>

            <!--SAVE-->
            <div id="save">
              <h1 id="save-title">Guardar</h1>
              <p>Descripcion</p>
            </div>

            <!--OPEN-->
            <div id="open">
              <h1 id="open-title">Open</h1>
              <p>Descripcion</p>
            </div>
          </div>
        </b-col>
        <b-col cols="2">

          <!--MENU SIDEBAR-->
          <b-navbar v-b-scrollspy:scrollspy-nested class="flex-column">
            <b-nav pills class="flex-column">
              <b-nav-item href="#intro-title">Bienvenido</b-nav-item>
              <b-nav-item href="#how-to-start-title">Cómo empezar</b-nav-item>
              <b-nav-item href="#guests-title">Inquilinos</b-nav-item>
              <!--<b-nav pills class="flex-column">
                <b-nav-item class="ml-3 my-1" href="#guests-add-first">Añadir el primer inquilino</b-nav-item>
                <b-nav-item class="ml-3 my-1" href="#guests-add-more">Añadir más</b-nav-item>
                <b-nav-item class="ml-3 my-1" href="#guests-rm">Eliminar</b-nav-item>
              </b-nav>-->
              <b-nav-item href="#invoices-title">Facturas</b-nav-item>
              <b-nav-item href="#expenses-title">Gastos</b-nav-item>
              <b-nav-item href="#graphs-title">Gráficos</b-nav-item>
              <b-nav-item href="#save-title">Guardar</b-nav-item>
              <b-nav-item href="#open-title">Abrir</b-nav-item>
            </b-nav>
          </b-navbar>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import Carousel from './Carousel.vue'
  import Banners from './Banners.vue'

  export default {
    components: {
      'app-carousel': Carousel,
      'app-banners': Banners
    }
  }
</script>

<style>
  #scrollspy-nested {
    position: relative;
    overflow-y: auto;
    height: 100vh
  }
</style>
