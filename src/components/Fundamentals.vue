<template>
  <div class="info">
    <h1>Fundamentals</h1>
    <div v-if="fundData === null">
      <h3>Seems we don't have this company's data.</h3>
      <h3>Sorry about that!</h3>
    </div>
    <div v-else> <!-- Server responded with data -->
      <div class='header'>
        <h3>Financial information for {{ }}</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th v-for="key in dispKeyGroup">{{ key[1] }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Assets</th>
            <td v-for="key in dispKeyGroup">{{ assets[key[0]] }}</td>
          </tr>
          <tr>
            <th>Cash and Cash<br/>Equivalents at<br/> Carrying Value</th>
            <td v-for="key in dispKeyGroup">{{ cashCarry[key[0]] }}</td>
          </tr>
          </tr>
          <tr>
            <th>Current Liabilities</th>
            <td v-for="key in dispKeyGroup">{{ liabilities[key[0]] }}</td>
          </tr>
        </tbody>
      </table>

      <div> <!-- For pagination at the bottom of the table -->
        <div id="pagination" v-for="(obj, index) in keyGroups">
            <a @click="dispKeyGroup=keyGroups[index]" href="#0">{{ index+1 }}</a>
        </div>
      </div>
    </div> <!-- End of fundamentals data -->
  </div>
</template>

<script>
import Search from '../SearchActions.js'
var numeral = require('numeral')

export default {

  data () {
    return {
      currentData: null,
      fundData: null,
      cashCarry: {},
      assets: {},
      liabilities: {},
      keyGroups: [],
      dispKeyGroup: [],

      monthNames: [ 'January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December' ]
    }
  },

  computed: {
    // This function sets the data to the data in the store ONLY if the current page is
    // Fundamentals, meaning this is the component that is currently shown
    theResponse: function () {
      console.log('The method in Fundamentals.vue for getting the data was called')
      var storeData = this.$store.state
      var retVal = this.currentData
      if (storeData.page === 'Fundamentals') {
        retVal = storeData.data
        this.currentData = retVal
      }
      return retVal
    }
  },

  created: function () {
    console.log('Fundamentals was created')
    var instance = this
    var ticker = this.$store.state.ticker
    Search.sendFundamentalsRequest(this, ticker).then(function (result) {
      console.log(result)
      // Save all of the needed data
      instance.fundData = result
      // Return if no data was returned
      if (instance.fundData === null) { return }

      var cashCarryNums = result['CashAndCashEquivalentsAtCarryingValue']
      var assetsNums = result['Assets']
      var liabilitiesNums = result['LiabilitiesCurrent']
      // Get all of the timestamps to be keys, and get the date that will be displayed
      var keys = []
      for (var obj in assetsNums) {
        var date = new Date(obj * 1000)
        var dateToDisplay = instance.monthNames[date.getMonth() - 1] + ' ' + date.getFullYear()
        keys.unshift([obj, dateToDisplay])
      }
      // Slice the keys array into the pagination sections of size 6 each
      var i = 0
      while (keys.length > 0) {
        instance.keyGroups[i] = keys.splice(0, 4)
        i++
      }
      instance.dispKeyGroup = instance.keyGroups[0]  // Set the first group to display

      // Go through each array and change all numbers to currency
      for (var key1 in assetsNums) {
        var num1 = numeral(assetsNums[key1]).format('$0,0[.]00')
        instance.assets[key1] = num1
      }
      console.log(instance.assets)
      for (var key2 in cashCarryNums) {
        var num2 = numeral(cashCarryNums[key2]).format('$0,0[.]00')
        instance.cashCarry[key2] = num2
      }
      for (var key3 in liabilitiesNums) {
        var num3 = numeral(liabilitiesNums[key3]).format('$0,0[.]00')
        instance.liabilities[key3] = num3
      }

      console.log(instance.keyGroups)
    }, function (response) {
      console.log('Error getting the fundamentals data')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info {
  background: #42b983;
  padding: 5px;
  //width: 100%;
  min-height: 60em;
  margin: auto;
  padding: 20px 2px 20px 2px;
  color: #2c3e50;
  //background: rgba(150, 150, 150, 0.3);
  background: rgba(240,240,240,0.2);
}
.jumbotron.vertical-center {
  margin-bottom: 0;
  width: 100%;
  background: rgba(240,240,240,0.2);
}

/* Table styling */
table {
  border-collapse: collapse;
  margin: auto
}

table, td, th {
  border: 1px solid #2E86AB;
  padding: 5px;
  font-size: 16px;
}


/* Pagination styling */
#pagination {
  display: inline-block;
  margin: 20px 0px 20px 0;
  border: 1px rgba(240,240,240,0.2) solid;
}

#pagination a {
  background: rgba(240,240,240,0.4);
  float: left;
  padding: 6px 12px;
  text-decoration: none;
  border: 1px rgba(240,240,240,0.1) solid;
  transition: background-color .2s;
}

#pagination a:hover {
  background: rgba(240,240,240,0.8);
}

</style>
