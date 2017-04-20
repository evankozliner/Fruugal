<template>
  <div class="jumbotron vertical-center">
    <h1>{{theResponse.answers[1].data.name}}: ${{theResponse.answers[0].stockPrice}}</h1>
    <h2>CEO: {{theResponse.answers[1].data.ceo}}</h2>
    <p><b>Headquarters: </b>{{theResponse.answers[1].data.hq_state}}</p>
    <p><b>Number of employees:</b> {{theResponse.answers[1].data.employees}}</p>
    <p>{{theResponse.answers[1].data.short_description}}</p>
    <a :href="'http://' + theResponse.answers[1].data.company_url" target="_blank" style="color:#42b983;font-size:35px">{{theResponse.answers[1].data.company_url}}</a>
  </div>
</template>

<script>
export default {
  computed: {
    // This function sets the data to the data in the store ONLY if the current page is
    // GeneralInfoAnswer, meaning this is the component that is currently shown
    theResponse: function () {
      var retVal = this.$store.state.info.data
      return retVal
    }
  },

  destroyed: function () {
    console.log('The Info component has been destroyed')
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
