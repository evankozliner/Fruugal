<template>
  <div>
    <header class="searchBar">
      <search smallpage="false"><search>
    </header>
    <div class="info">
      <h1>Sorry...</h1>
      <h4> {{ theResponse.apology }} </h4>
    </div>
  </div>
</template>

<script>
import search from './Search.vue'
export default {
  components: {
    search: search
  },

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
