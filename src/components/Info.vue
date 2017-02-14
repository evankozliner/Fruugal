<template>
  <div class="info">
    <h1>{{src.company_name}}</h1>
    <h2>Stock price: {{src.stock_price}}</h2>
    <h2>Company leader: {{src.company_leader}}</h2>
    <p>{{src.company_history}}</p>
  </div>
</template>

<script>
import JSON from '../../misc/example.json'
export default {
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
  color: #42b983;
  background: rgba(173, 216, 230, 0.1);
  height: 400px;
}
</style>
