<template>
<b-container class="timeline-container" v-if="allInvoices.length && daysSorted.length > 2">
  <b-row>
     <!-- TIMELINE INFO MODAL -->
      <TimeLineModal/>
       <!-- RELOAD BUTTON -->
      <b-button class="m-1" sm variant="outline-primary"
                  @click="reloadTimeLine">
          <Icon name="refresh"></Icon>
      </b-button>
  </b-row>
  <b-row class="mt-5">
    <!-- TIMELINE COMPONENT -->
    <div class="timeline"
    @mouseup="filterInvoicesByDates() && disableChange()">
      <!-- FORM INPUT RANGE -->
      <form style="display:none">
          <div class="form-group">
            <!-- <p>daysSorted: {{daysSorted}}</p>
            <p>range: [{{min}}, {{max}}]</p>
            <p>step: {{step}}</p>
            <p>from: {{filterDateFrom}}</p>
            <p>to: {{filterDateTo}}</p> -->
            <div class="range-slider">
              <input type="range" class="form-control-range"
                :min="min" :max="max" step="1"
                v-model.number="filterDateFrom">
              <input type="range" class="form-control-range"
                :min="min" :max="max" step="1"
                v-model.number="filterDateTo">
            </div>
          </div>
      </form>
      <!-- TIMELINE -->
      <div class="thumb-flex-parent">
        <div class="thumb-flex-container">
            <div v-for="(day, index) in daysSorted" :key="day"
            @mousedown="enableChange(index)"
            @mouseover="changeRange(index)"
            :class="{active: isActive(index),
            among: isAmong(index),
            first: isFirst(index),
            last: isLast(index),
            thumb: true}">
              <span :data-info="day | fmtDate"></span>
            </div>
        </div>
      </div>
    </div>
  </b-row>
</b-container>

</template>

<script>
  import { daysSorted } from '../utils/expensesUtil'
  import { formatTimeMillis } from '../utils/dateUtil'
  import TimeLineModal from './TimeLineModal.vue'
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons/refresh'

  export default {
    name: 'TimeLine',
    components: {
      TimeLineModal,
      Icon
    },
    data () {
      return {
        changeValueOf: false
      }
    },
    computed: {
      filterDateFrom () {
        return this.$store.getters.filterDateFrom
      },
      filterDateTo () {
        return this.$store.getters.filterDateTo
      },
      allInvoices () {
        return this.$store.getters.allInvoices
      },
      daysSorted () {
        return daysSorted(this.allInvoices) || []
      },
       validateAllInvoices () {
//        console.log('validateInvoices')
        return !(this.allInvoices === undefined ||
          this.allInvoices === null ||
          this.allInvoices.length === 0)
      },
      min () {
        return 0
      },
      max () {
        return this.validateInvoices
        ? this.daysSorted.length - 1
        : 1
      },
      step () {
        return 1
      }
    },
    methods: {
      isActive (index) {
        return this.filterDateFrom === this.daysSorted[index] ||
          this.filterDateTo === this.daysSorted[index]
      },
      isAmong (index) {
        return this.filterDateFrom < this.daysSorted[index] &&
          this.filterDateTo > this.daysSorted[index]
      },
      isFirst (index) {
        return this.filterDateFrom === this.daysSorted[index]
      },
      isLast (index) {
        return this.filterDateTo === this.daysSorted[index]
      },
      changeRange (index) {
        if (!this.changeValueOf) {
          return false
        } else if (this.changeValueOf === 'from') {
          // modifica el filtro from
          let filterDateFromValue = this.daysSorted[index]
          if (filterDateFromValue >= this.filterDateTo) {
            // si el valor del filtro from >= to, asignar to - 1
            let filterDateToIdx = this.daysSorted.findIndex(day => {
                return day === this.filterDateTo
            })
            filterDateFromValue = filterDateToIdx > 0
              ? this.daysSorted[filterDateToIdx - 1]
              : this.daysSorted[0]
          }
          this.$store.commit('setFilterDateFrom', filterDateFromValue)
          return true
        } else if (this.changeValueOf === 'to') {
          // modifica el filtro to
          let filterDateToValue = this.daysSorted[index]
          if (filterDateToValue <= this.filterDateFrom) {
            // si el valor del filtro to <= from, asignar from + 1
            let filterDateFromIdx = this.daysSorted.findIndex(day => {
                return day === this.filterDateFrom
            })
            filterDateToValue = filterDateFromIdx < this.daysSorted.length - 1
              ? this.daysSorted[filterDateFromIdx + 1]
              : this.daysSorted[this.daysSorted.length - 1]
          }
          this.$store.commit('setFilterDateTo', filterDateToValue)
          return true
        } else {
          return false
        }
      },
      enableChange (index) {
        if (this.isFirst(index)) {
          this.changeValueOf = 'from'
        } else {
          this.changeValueOf = 'to'
        }
      },
      disableChange () {
        this.changeValueOf = ''
      },
      filterInvoicesByDates () {
        if (this.changeValueOf) {
          this.$store.dispatch('filterInvoicesByDates')
        }
        return true
      },
      reloadTimeLine () {
        this.$store.commit('setFilterDateFrom', this.daysSorted[0])
        this.$store.commit('setFilterDateTo', this.daysSorted[this.daysSorted.length - 1])
        this.$store.commit('setInvoices', this.$store.getters.allInvoices)
      }
    },
    filters: {
      fmtDate: function (value) {
        return formatTimeMillis(value)
      }
    },
    mounted () {
      // init invoices filter timeline
      this.reloadTimeLine()
    }
  }
</script>

<style scoped>
/* SLIDE INPUT RANGE */
.range-slider {
  position: relative;
  width: 100%;
  height: 35px;
  text-align: center;
}

.range-slider input {
  pointer-events: none;
  position: absolute;
  overflow: hidden;
  left: 0;
  top: 15px;
  width: 100%;
  outline: none;
  height: 18px;
  margin: 0;
  padding: 0;
}

.range-slider input::-webkit-slider-thumb {
  pointer-events: all;
  position: relative;
  z-index: 1;
  outline: 0;
}

.range-slider input::-moz-range-thumb {
  pointer-events: all;
  position: relative;
  z-index: 10;
  -moz-appearance: none;
  width: 9px;
}

.range-slider input::-moz-range-track {
  position: relative;
  z-index: -1;
  background-color: rgba(0, 0, 0, 1);
  border: 0;
}
.range-slider input:last-of-type::-moz-range-track {
  -moz-appearance: none;
  background: none transparent;
  border: 0;
}
.range-slider input[type="range"]::-moz-focus-outer {
  border: 0;
}

/* TIMELINE */
.thumb-flex-parent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.thumb-flex-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80vw;
  height: 100px;
  max-width: 1000px;
  position: relative;
  z-index: 0;
}

/* MARCADORES */
.thumb {
  width: 25px;
  height: 25px;
  background-color: #aeb6bf;
  position: relative;
  border-radius: 50%;
}
.thumb.active {
  background-color: #2c3e50;
}
.thumb.among {
  background-color: #2c3e50;
}

/* LINEAS */
.thumb::before,
.thumb::after {
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  top: 50%;
  transform: translateY(-50%);
  background-color: #aeb6bf;
  width: 100%;
  height: 5px;
  /* max-width: 50px; */
}
.thumb::before {
  left: calc(-4vw + 12.5px);
}
.thumb::after {
  right: calc(-4vw + 12.5px);
}
.thumb.first::after {
  background-color: #2c3e50;
}
.thumb.last::before {
  background-color: #2c3e50;
}
.thumb.among::after {
  background-color: #2c3e50;
}
.thumb.among::before {
  background-color: #2c3e50;
}

/* TEXTO FECHA */
.thumb.active span {
  font-weight: 700;
  background-color: #2c3e50;
}
.thumb span {
  width: 1px;
  height: 1px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  visibility: hidden;
}
.thumb span::before,
.thumb span::after {
  visibility: visible;
  position: absolute;
  left: 50%;
}
.thumb span::after {
  content: attr(data-year);
  top: 25px;
  transform: translateX(-50%);
  font-size: 14px;
}
.thumb span::before {
  content: attr(data-info);
  top: -65px;
  width: 70px;
  transform: translateX(-5px) rotateZ(-45deg);
  font-size: 12px;
  text-indent: -10px;
}
</style>
