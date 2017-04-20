<template>
  <div class='container'>
    <header class="searchBar col-md-12">
      <search v-on:SP="possiblyGetData" smallpage="false" :linkWasClicked="waitingOnLink"></search>
      <div class="col-md-3" />
      <div id="nav-buttons" class="col-md-9">
        <button class="hvr-grow" @click="routerLinkClicked('Stock')" title="Checkout this company's current stock price"><i class="fa fa-line-chart fa-2x" aria-hidden="true"></i></button>
        <button class="hvr-grow" @click="routerLinkClicked('Info')" title="Learn more about this company"><i class="fa fa-id-card-o fa-2x" aria-hidden="true"></i></button>
        <button class="hvr-grow" @click="routerLinkClicked('Fundamentals')" title="See this company's financial data"><i class="fa fa-list-alt fa-2x" aria-hidden="true"></i></button>
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
        <router-view :articles="articles" :loaded="loadedArticles" :fundData="fData"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Sorter from '../Sentiment.js'
import SearchActions from '../SearchActions.js'
import Processor from '../Processor.js'
import sidebar from './Sidebar.vue'
import search from './Search.vue'
export default {

  components: { 'sidebar': sidebar,
      'search': search
   },

  data () {
    return {
      articles: null,
      loadedArticles: false,
      newPage: true,
      cachedResponse: null,
      waitingOnLink: false,
      fData: null
    }
  },

  methods: {
    // Sends a request to the RAR server to retrieve articles
    getArticles: function () {
      this.loadedArticles = false
      var instance = this

      // First get the ticker and company from the store
      var ticker = this.$store.state.ticker
      // OK to access stock store directly because method only called if class is stock
      var companyName = this.$store.state.stock.data.companyName

      SearchActions.sendArticlesRequest(this, ticker, companyName).then(function (result) {
        if (!result.hasOwnProperty('solrErrorMessage') && result !== undefined) {
          var arrOfArticles = result.response.docs
          instance.articles = Sorter.sortByDate(arrOfArticles)
          instance.loadedArticles = true   // Stop the spinner
        }
      }, function (result) {
        console.log('Error getting articles')
        instance.loadedArticles = true   // Stop the spinner
      })
    },

    // Sends a request to get the fundamentals data and then processes it
    getFundamentalsData: function () {
      this.fData = undefined
      var instance = this
      var ticker = this.$store.state.ticker
      SearchActions.sendFundamentalsRequest(this, ticker).then(function (result) {
        console.log(result)
        // Process the data as long as it is not null
        if (result !== undefined) {
          var processedData = Processor.processFundData(result)
          instance.fData = processedData
        }
        console.log('Done in getFundamentalsData')
      }, function (response) {
        console.log('Error getting the fundamentals data')
      })
    },

    // Calls getArticles if validQuestion component is already created
    // Calls getFundamentalsData if search was performed from the Fundamentals page
    possiblyGetData: function () {
      var page = this.$store.state.mostRecentPage
      // If the page we are going to is a stock page, get articles for this company
      if (page === 'StockAnswer') {
        this.getArticles()
      } else if (page === 'FundamentalsAnswer') {
        console.log('Need to get fund data')
        this.getFundamentalsData()
      }
    },

    // Submits a search to the main server when one of the navigation buttons are clicked
    routerLinkClicked (where) {
      this.waitingOnLink = true
      var query = this.$store.state.ticker + ' ' + where
      console.log(query + '--- From routerLinkClicked')

      var instance = this
      SearchActions.initialSearch(this, query).then(function (result) {
        console.log('Search was classified')
        instance.possiblyGetData()
        instance.waitingOnLink = false
        instance.$router.push(result)
      }, function (err) {
        console.log('There was an error')
        instance.waitingOnLink = false
        instance.$router.push(err)
      })
    }
  },

  // Method for making the call to get articles from the cluster
  // This will be called as soon as the component is ready
  created: function () {
    var page = this.$store.state.mostRecentPage
    // Must first check its a stock answer so getArticles doesn't throw an error
    if (page === 'StockAnswer') {
      this.getArticles()
    } else if (page === 'FundamentalsAnswer') {
      this.getFundamentalsData()
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
  min-width: 600px;
  margin-bottom: 20px;
  padding: 3px 2% 3px;
}

.sideBar {
  padding: 1px;
  //background: rgba(200,200,200,0.4);
  //position: fixed;
}

button {
  background-color: rgba(66, 191, 80, 0.7); /* Green */
  border: none;
  color: white;
  padding: 8px;
  height: 45px;
  width: 100px;
  //text-align: center;
  text-decoration: none;
  //display: inline-block;
  font-size: 16px;
  margin: 4px 10px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;
}

#nav-buttons {
  text-align: center;
  padding: 2px;
  margin-top: 10px;
}

/* Transitions for */
.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .2s ease;
}

/* For the articles div entrance */
.fade-enter {
  opacity: 0;
}

/* For the loading the page */
.fade-leave-to {
  opacity: 0;
}


/* Used from Hover.css */
.hvr-grow {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
}
.hvr-grow:hover, .hvr-grow:focus, .hvr-grow:active {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
