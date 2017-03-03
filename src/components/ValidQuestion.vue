<template>
  <div class='container'>
    <div class='sideBar'>
      <!--This is where the side bar goes-->
    </div>

    <div>
      <keep-alive>
        <router-view :articles="articles" :loaded="loaded"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Sentiment from '../Sentiment.js'
export default {

  // theResponse will get the returned data
  props: ['theResponse'],

  data () {
    return {
      articles: null,
      loaded: false
    }
  },

  // Method for making the call to get articles from the cluster
  // This will be called as soon as the component is ready
  mounted: function () {
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
  }
}
</script>

<style>
.sideBar {

}
</style>
