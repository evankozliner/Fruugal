<template>
  <div class="small">
    <h3>Past Year Stock Minimum: ${{info.Elements[0].DataSeries.close.min}} on {{info.Elements[0].DataSeries.close.minDate.substr(0,10)}}</h3>
    <h3>Past Year Stock Maximum: ${{info.Elements[0].DataSeries.close.max}} on {{info.Elements[0].DataSeries.close.maxDate.substr(0,10)}}</h3>
    </br>
    <button @click="fillData();toggle()">Graph (toggle to reload)</button>
      <div id="myDIV">
        <line-chart :chart-data="datacollection"></line-chart>
      </div>
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
      }, toggle () {
        var x = document.getElementById('myDIV')
        if (x.style.display === 'none') {
          x.style.display = 'block'
        } else {
          x.style.display = 'none'
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
  height: 68px;
  width: 600px;
  margin-left: 6px;
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;
  color: #42b983;
  font-size: 50px;
  font-family: sansserif;
  background: rgba(150, 150, 150, 0.3);
  transition: all 0.2s ease-in-out;
}
#myDIV {
    display: none;
}
</style>
