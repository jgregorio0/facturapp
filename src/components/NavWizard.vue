<template>
  <transition-group
    tag="ul"
    class="m-3 justify-content-center nav nav-pills nav-wizard"
    :name="direction">
    <b-nav-item
      v-for="(nav, index) in currents"
      :key="nav.id"
      :to="{ name: nav.name }"
      :class="{'left-mark': (isFirst(index) && isLeftHide),
       'rigth-mark': (isLast(index) && isRightHide)}"
      :title="nav.text">
       <icon :name="nav.icon" class="mr-2"></icon>
       <span class="d-none d-sm-inline-block">{{ nav.text }}</span>
    </b-nav-item>
  </transition-group>
</template>

<script>
  import {findSelectedByName, updateNavigation} from '../utils/navigationUtil'
  import 'vue-awesome/icons/bed'
  import '../utils/icons/receipt'
  import 'vue-awesome/icons/dollar'
  import 'vue-awesome/icons/line-chart'
  import Icon from 'vue-awesome/components/Icon'

  export default {
    components: {
      Icon
    },
    data () {
      return {
        alls: [
//          {id: 0, name: 'home', text: 'Inicio'},
          {id: 0, name: 'guests', text: 'Inquilinos', icon: 'bed'},
          {id: 1, name: 'invoices', text: 'Facturas', icon: 'receipt'},
          {id: 2, name: 'expenses', text: 'Gastos', icon: 'dollar'},
          {id: 3, name: 'graphs', text: 'Gráficos', icon: 'line-chart'}
        ],
        range: 4,
        selected: null,
        currents: []
      }
    },
    computed: {
      direction () {
        return this.$store.getters.direction
      },
      isLeftHide () {
        return this.currents.length && this.currents[0].id > 0
      },
      isRightHide () {
        return this.currents.length &&
          this.currents[this.currents.length - 1].id < this.alls[this.alls.length - 1].id
      }
    },
    watch: {
      '$route' (to, from) {
//        console.log('watch $route', to, from)
        this.navigation(from.name, to.name)
      }
    },
    methods: {
      navigation (prevName, currName) {
//        console.log('navigation', prevName, currName)
        // get previous navigation element
        let prev = prevName
          ? findSelectedByName(prevName, this.alls)
          : null
//        console.log('prev selected', prev)

        // get current navigation element
        let curr = currName
          ? findSelectedByName(currName, this.alls)
          : null
//        console.log('current selected', curr)

        // update direction
        this.$store.commit('updateDirection',
          {
            prevId: prev ? prev.id : 0,
            currId: curr ? curr.id : 0
          })

        // update navigation elements
        if (curr) {
          updateNavigation(curr, this.currents, this.alls, this.range)
        }
      },
      isFirst (index) {
        return index === 0
      },
      isLast (index) {
        return index === (this.range - 1)
      }
    },
    created () {
      this.navigation(null, this.$route.name)
    }
  }
</script>

<style scoped>
  /*li.left-mark::before {
    content: "<"; !* FontAwesome Unicode *!
    font-family: FontAwesome;
    display: inline-block;
    margin-left: -1.3em; !* same as padding-left set on li *!
    width: 1.3em; !* same as padding-left set on li *!
  }
  li.rigth-mark::after{

    position: absolute;
    display: block;
    border: 24px solid transparent;
    border-left: 16px solid #f9f9f9;
    border-right: 0;
    top: -1px;
    z-index: 10;
    content: '';
    right: -15px;
  }*/
  .left-enter {
    opacity: 0;
  }

  .left-enter-active {
    animation: slide-left-in 1s ease-out forwards;
    transition: opacity .5s;
  }

  .left-leave {

  }

  .left-leave-active {
    /*animation: slide-left-in 1s ease-out forwards;*/
    transition: opacity .1s;
    opacity: 0;
    position: absolute;
  }

  @keyframes slide-left-in {
    from {
      transform: translateX(-20px);
    }
    to {
      transform: translateX(0);
    }
  }

  .right-enter {
    opacity: 0;
  }

  .right-enter-active {
    animation: slide-right-in 1s ease-out forwards;
    transition: opacity .5s;
  }

  .right-leave {
  }

  .right-leave-active {
    /*animation: slide-righ t-in 1s ease-out forwards;*/
    transition: opacity .1s;
    opacity: 0;
    position: absolute;
  }

  @keyframes slide-right-in {
    from {
      transform: translateX(20px);
    }
    to {
      transform: translateX(0);
    }
  }
</style>
