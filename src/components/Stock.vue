<template>
  <div class="info">
    <h1>You asked a stock question!</h1>
    Here is the response: {{ theResponse.name }}
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
  color: #2c3e50;
  background: #42b983;
  height: 400px;
}
</style>
