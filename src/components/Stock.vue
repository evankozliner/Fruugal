<template>
  <div class="info">
    <h1>{{src.company_name}}</h1>
    <h2>Stock price: {{src.stock_price}}</h2>
    <p>Change percent: {{src.change_percent}}</p>
    <p>Number of positive articles: {{src.number_positive_articles}}</p>
    <p>Number of negative articles: {{src.number_n_articles}}</p>
  </div>
</template>

<script>
import JSON from '../../misc/example.json'
export default {

  // The data returned from the API call
  props: ['data'],

  data () {
    return {
      src: JSON
    }
  }
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
