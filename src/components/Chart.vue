<template>
  <div class="small">
    <h3>Past Year Stock Minimum: ${{info.Elements[0].DataSeries.close.min}} on {{info.Elements[0].DataSeries.close.minDate.substr(0,10)}}</h3>
    <h3>Past Year Stock Maximum: ${{info.Elements[0].DataSeries.close.max}} on {{info.Elements[0].DataSeries.close.maxDate.substr(0,10)}}</h3>
    <button @click="fillData()">Graph (remember to refresh by clicking again!)</button>
      <line-chart :chart-data="datacollection"></line-chart>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'
  export default {
    props: ['info'],
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        for (var i = 0; i < this.info.Dates.length; i++) {
          this.info.Dates[i] = this.info.Dates[i].substring(0, 10)
        }
        this.datacollection = {
          labels: this.info.Dates,
          datasets: [
            {
              label: 'Stock Price',
              backgroundColor: '#42b983',
              data: this.info.Elements[0].DataSeries.close.values
            }
          ]
        }
      }
    }
  }
</script>

<style>
  .small {
    max-width: 100%;
    margin:  center;
  }
button {
  height: 32px;
  width: 200px;
  margin-left: 6px;
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;
  color: #2E86AB;
  font: inherit;
  transition: all 0.2s ease-in-out;
}
</style>
