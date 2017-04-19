<template>
  <div class="jumbotron vertical-center">
    Fundamentals
    {{fundData}}
  </div>
</template>

<script>
import Search from '../SearchActions.js'

export default {

  data () {
    return {
      currentData: null,
      fundData: null
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
      instance.fundData = result.body
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
