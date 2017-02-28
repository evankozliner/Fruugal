<template>
  <div class="info">
    <h1>You asked a stock question!</h1>
    <h2>{{theResponse.companyName}}: {{theResponse.companySymbol}}</h2>
    <h2>Stock price: ${{theResponse.stockPrice}}</h2>
  </div>
</template>

<script>
export default {

  // The data returned from the API call
  props: ['theResponse']

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info {
  background: #42b983;
  padding: 5px;
  width: 30%;
  margin: auto;
}
</style>
