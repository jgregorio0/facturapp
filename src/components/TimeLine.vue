<template>
<div class="timeline mt-5"
 @mouseup="filterInvoicesByDates() && disableChange()"
 v-if="allInvoices.length && daysSorted.length > 2">
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
</template>

<script>
  import { daysSorted } from '../utils/expensesUtil'
  import { formatTimeMillis } from '../utils/dateUtil'

  export default {
    name: 'TableInvoice',
    data () {
      return {
        filterDateFrom: 0,
        filterDateTo: 0,
        changeValueOf: false
      }
    },
    computed: {
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
        return this.filterDateFrom === index || this.filterDateTo === index
      },
      isAmong (index) {
        return this.filterDateFrom < index && this.filterDateTo > index
      },
      isFirst (index) {
        return this.filterDateFrom === index
      },
      isLast (index) {
        return this.filterDateTo === index
      },
      changeRange (index) {
        if (!this.changeValueOf) {
          return false
        } else if (this.changeValueOf === 'from') {
          this.filterDateFrom = index
          return true
        } else if (this.changeValueOf === 'to') {
          this.filterDateTo = index
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
          this.$store.dispatch('filterInvoicesByDates',
            {from: this.daysSorted[this.filterDateFrom],
            to: this.daysSorted[this.filterDateTo]})
        }
        return true
      }
    },
    watch: {
      filterDateFrom (newValue, oldValue) {
        this.filterDateFrom = newValue >= this.filterDateTo
          ? this.filterDateTo - this.step
          : newValue
      },
      filterDateTo (newValue, oldValue) {
        this.filterDateTo = newValue <= this.filterDateFrom
          ? this.filterDateFrom + this.step
          : newValue
      }
    },
    filters: {
      fmtDate: function (value) {
        return formatTimeMillis(value)
      }
    },
    mounted () {
      // init invoices filter timeline
      this.filterDateTo = this.daysSorted.length - 1
      this.$store.commit('setInvoices', this.$store.getters.allInvoices)
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
