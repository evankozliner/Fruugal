<template>
  <div class='container'>
  <!--
    <header>
      This is the header
    </header>
-->

    <div class='col-md-3'>
      <div class='sideBar'>
      <!--This is where the side bar goes-->
        <sidebar></sidebar>
      </div>
    </div>

    <div class="col-md-9">
      <keep-alive>
        <router-view :articles="articles" :loaded="loaded"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Sentiment from '../Sentiment.js'
import sidebar from './Sidebar.vue'
export default {

  // theResponse will get the returned data
  // props: ['theResponse'],

  components: { 'sidebar': sidebar },

  data () {
    return {
      articles: null,
      loaded: false,
      theResponse: this.$store.state.data
    }
  },

  // Method for making the call to get articles from the cluster
  // This will be called as soon as the component is ready
  created: function () {
    console.log('here in the created function')
    // First get the ticker from the response
    var ticker = '/' + this.theResponse.companySymbol
    var companyName = '/' + this.theResponse.companyName
    var baseUrl = 'http://localhost:4040'

    var fullUrl = baseUrl + ticker + companyName
    this.$http.get(fullUrl).then(response => {
      // Success
      var resp = response.body
      console.log(resp)
      if (!resp.hasOwnProperty('solrErrorMessage')) {
        var arrOfArticles = resp.response.docs
        this.articles = Sentiment.sortBySentiment(arrOfArticles)
        console.log(this.articles)
      }
    }, response => {
      // Error
      console.log('Error getting articles')
    })
    // Stop the spinner
    this.loaded = true
  },

  beforeCreate: function () {
    console.log('ValidQuestion component is being created')
  },

  beforeDestroy: function () {
    console.log('ValidQuestion component is being destoryed')
  }
}
</script>

<style scoped>
header {
  height: 30px;
  width: 100%;
  margin-bottom: 20px;
  background: green;
}

.sideBar {
  padding: 1px;
  //background: rgba(200,200,200,0.4);
  //position: fixed;
}

</style>
