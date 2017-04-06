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
      <keep-alive>
        <router-view :articles="articles" :loaded="loaded"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Sentiment from '../Sentiment.js'
import sidebar from './Sidebar.vue'
import search from './Search.vue'
export default {

  // theResponse will get the returned data
  // props: ['theResponse'],

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
      var storeData = this.$store.state
      var retVal = this.cachedResponse
      if (storeData.page === 'StockAnswer') {
        retVal = storeData.data
        this.cachedResponse = retVal
      }
      console.log('I am in theResponse')
      return retVal
    }
  },

  methods: {
    getArticles: function () {
      console.log('Going to get articles')
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
          this.articles = Sentiment.sortByDate(arrOfArticles)
          console.log(this.articles)
        }
      }, response => {
        // Error
        console.log('Error getting articles')
      })
      // Stop the spinner
      this.loaded = true
    },

    possiblyGetArticles: function () {
      // If the page we are going to is a stock page, get articles for this company
      if (this.$store.state.page === 'StockAnswer') {
        this.getArticles()
      }
    }
  },

  // Method for making the call to get articles from the cluster
  // This will be called as soon as the component is ready
  created: function () {
    // Must first check its a stock answer so getArticles doesn't throw an error
    if (this.$store.state.page === 'StockAnswer') {
      this.getArticles()
    }
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
header.searchBar {
  text-align: left;
  height: auto;
  width: 100%;
  margin-bottom: 20px;
  padding: 3px 2% 3px;
}

.sideBar {
  padding: 1px;
  //background: rgba(200,200,200,0.4);
  //position: fixed;
}

</style>
