<template>
  <div class="jumbotron vertical-center">
    <h1>Fundamentals</h1>
    <div :if="!fundData">
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
            <th>Cash and Cash Equivalents at Carrying Value</th>
            <td v-for="key in dispKeyGroup">{{ cashCarry[key[0]] }}</td>
          </tr>
          </tr>
          <tr>
            <th>Current Liabilities</th>
            <td v-for="key in dispKeyGroup">{{ liabilities[key[0]] }}</td>
          </tr>
        </tbody>
      </table>

      <div class=container>
        <ul class="pagination">
          <li v-for="(obj, index) in keyGroups">
            <a @click="dispKeyGroup=keyGroups[index]" href="#0">{{ index+1 }}</a>
          </li>
        </ul>
      </div>
    </div> <!-- End of fundamentals data -->
  </div>
</template>

<script>
import Search from '../SearchActions.js'

export default {

  data () {
    return {
      currentData: null,
      fundData: null,
      cashCarry: null,
      assets: null,
      liabilities: null,
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
    Search.sendFundamentalsRequest(this, this.theResponse).then(function (result) {
      console.log(result)
      // Save all of the needed data
      instance.fundData = result
      instance.cashCarry = result['CashAndCashEquivalentsAtCarryingValue']
      instance.assets = result['Assets']
      instance.liabilities = result['LiabilitiesCurrent']
      // Get all of the timestamps to be keys, and get the date that will be displayed
      var keys = []
      for (var obj in instance.assets) {
        var date = new Date(obj * 1000)
        var dateToDisplay = instance.monthNames[date.getMonth() - 1] + ' ' + date.getFullYear()
        keys.unshift([obj, dateToDisplay])
      }
      // Slice the keys array into the pagination sections of size 6 each
      var i = 0
      while (keys.length > 0) {
        instance.keyGroups[i] = keys.splice(0, 6)
        i++
      }
      instance.dispKeyGroup = instance.keyGroups[0]
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
  color: #2c3e50;
  //background: #42b983;
  background: rgba(240,240,240,0.2);
  height: 100%;
  width: 100%
}
.jumbotron.vertical-center {
  margin-bottom: 0;
  width: 100%;
  background: rgba(240,240,240,0.2);
}

</style>
