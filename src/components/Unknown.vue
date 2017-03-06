<template>
  <div class="info">
    <h1>Sorry...</h1>
    <h4> {{ theResponse.apology }} </h4>
  </div>
</template>

<script>
export default {

  computed: {
    theResponse: function () {
      return this.$store.state.data
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
