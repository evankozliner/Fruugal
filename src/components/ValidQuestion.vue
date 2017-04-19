<template>
  <div class='container'>
    <header class="searchBar">
      <search v-on:SP="possiblyGetArticles" smallpage="false"></search>
      <div>
        <button @click="routerLinkClicked('Stock')">Check out their stock price</button>
        <button @click="routerLinkClicked('Info')">Learn more about them</button>
        <button @click="">View their finacial fundamentals</button>
      </div>
    </header>

    <div class='col-md-3'>
      <div class='sideBar'>
      <!--This is where the side bar goes-->
        <sidebar></sidebar>
      </div>
    </div>

    <div class="col-md-9">
      <transition name="fade" mode="out-in">
        <router-view :articles="articles" :loaded="loadedArticles"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Sorter from '../Sentiment.js'
import SearchActions from '../SearchActions.js'
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
      loadedArticles: false,
      newPage: true,
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
      this.loadedArticles = false
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
          this.articles = Sorter.sortByDate(arrOfArticles)
          console.log(this.articles)
          this.loadedArticles = true  // Stop the spinner
        }
      }, response => {
        // Error
        console.log('Error getting articles')
        this.loadedArticles = true  // Stop the spinner
      })
    },

    possiblyGetArticles: function () {
      // If the page we are going to is a stock page, get articles for this company
      if (this.$store.state.page === 'StockAnswer') {
        this.getArticles()
      }
    },

    routerLinkClicked (where) {
      var query = this.$store.state.ticker + ' ' + where
      console.log(query + '--- From routerLinkClicked')

      var instance = this
      SearchActions.initialSearch(this, query).then(function (result) {
        console.log('Search was classified')
        instance.$router.push(result)
        instance.possiblyGetArticles()
      }, function (err) {
        console.log('There was an error')
        instance.$router.push(err)
      })
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

/* Transitions for */
.fade-enter-active {
  transition: all .5s ease;
}
.fade-leave-active {
  transition: all .2s ease;
}

/* For the articles div entrance */
.fade-enter
/* .slide-fade-leave-active for <2.1.8 */ {
  //transform: translateY(20px);
  opacity: 0;
}

/* For the loading the page */
.fade-leave-to {
  //transform: translateY(10px);
  opacity: 0;
}

</style>
