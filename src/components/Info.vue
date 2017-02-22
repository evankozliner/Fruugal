<template>
  <div class="info">
    <h1>You asked an information question!</h1>
    <h2>{{theResponse.answers[1].data.name}}: ${{theResponse.answers[0].stockPrice}}</h2>
    <h2>CEO: {{theResponse.answers[1].data.ceo}}</h2>
    <p><b>Headquarters:</b> {{theResponse.answers[1].data.hq_address1}}, {{theResponse.answers[1].data.hq_address_city}}, {{theResponse.answers[1].data.hq_state}}</p>
    <p><b>Number of employees:</b> {{theResponse.answers[1].data.employees}}</p>
    <p>{{theResponse.answers[1].data.short_description}}</p>
    <a :href="theResponse.answers[1].data.company_url">{{theResponse.answers[1].data.company_url}}</a>
  </div>
</template>

<script>
export default {

  // The data returned from the API call
  props: ['theResponse'],

  data () {
    return {

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
