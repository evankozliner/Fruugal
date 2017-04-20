<template>
  <div class='container'>
    <header class="searchBar">
      <search v-on:SP="possiblyGetArticles" smallpage="false"></search>
    </header>

    <div class='col-md-3'>
      <div class='sideBar'>
      <!--This is where the side bar goes-->
        <sidebar></sidebar>
      </div>
    </div>
    <div class="col-md-9">
      <div class="info">
        <h1>Sorry! I don't know how to answer that.</h1>
        <h2>Try again, swapping out tickers/words, remember that some short words can be tickers.</h2>
      </div>
    </div>
  </div>
</template>

<script>
import search from './Search.vue'
import sidebar from './Sidebar.vue'

export default {
  components: { 'sidebar': sidebar,
      'search': search
   },

  data () {
    return {
      articles: null,
      loaded: false,
      cachedResponse: null
    }
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
  background: #42b983;
  padding: 5px;
  width: 100%;
  margin: auto;
  padding: 20px 2px 20px 2px;
  color: #2c3e50;
  //background: rgba(150, 150, 150, 0.3);
  background: rgba(240,240,240,0.2);
}
</style>
