<template>
  <div class="info">
    <h1>Sorry...</h1>
    <p> {{ theResponse.apology }} </p>
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
  color: #42b983;
  background: rgba(173, 216, 230, 0.1);
  height: 400px;
}
</style>
