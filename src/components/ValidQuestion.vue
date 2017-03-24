<template>
  <div class='container'>
    <header class="searchBar">
      <search smallpage="false"><search>
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
      theResponse: this.$store.state.data
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
    }
  },

  events: {
    'searchPerformed': function () {
      console.log('Will get articles in ValidQuestion')
      this.getArticles()
    }
  },

  // Method for making the call to get articles from the cluster
  // This will be called as soon as the component is ready
  created: function () {
    this.getArticles()
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
  height: auto;
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
