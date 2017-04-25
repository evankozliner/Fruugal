import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import VueResource from 'vue-resource'
import Vuex from 'vuex'

// Components
import Search from './components/Search.vue'
import ValidQuestion from './components/ValidQuestion.vue'
import Stock from './components/Stock.vue'
import Info from './components/Info.vue'
import Fundamentals from './components/Fundamentals.vue'
import ErrorComp from './components/Error.vue'
import Unknown from './components/Unknown.vue'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.component('chartjs-line', require('./components/Chart.vue'))

// Create the vuex store
const store = new Vuex.Store({
  state: {
    stock: {
      data: {},
      searchString: '',
      page: '',
      ticker: undefined
    },

    info: {
      data: {},
      searchString: '',
      page: '',
      ticker: undefined
    },

    fundamentals: {
      data: {},
      searchString: '',
      page: '',
      ticker: undefined
    },

    mostRecentPage: undefined,
    ticker: undefined
  },

  mutations: {
    newDataRetrieved (state, payload) {
      // Update the corresponding object to the page name
      if (payload.page === 'StockAnswer') {
        state.stock.data = payload.retrievedData
        state.stock.ticker = payload.retrievedData.companySymbol
        state.ticker = payload.retrievedData.companySymbol
      } else if (payload.page === 'GeneralInfoAnswer') {
        state.info.data = payload.retrievedData
        state.info.ticker = payload.retrievedData.answers[0].companySymbol
        state.ticker = payload.retrievedData.answers[0].companySymbol
      } else if (payload.page === 'FundamentalsAnswer') {
        state.fundamentals.data = payload.retrievedData
        state.fundamentals.ticker = payload.retrievedData.answers[0].data.ticker
        state.ticker = payload.retrievedData.answers[0].data.ticker
      }
      state.mostRecentPage = payload.page
    }
  }
})

// , meta: { requiresSearch: false }
// Define the routes
const routes = [
  { path: '/', name: 'Search', component: Search },
  { path: '/question', name: 'ValidQuestion', component: ValidQuestion, props: true,
    children: [
      { path: 'Stock', name: 'StockAnswer', component: Stock, props: true, meta: { requiresCheck: true } },
      { path: 'Information', name: 'GeneralInfoAnswer', component: Info, props: true, meta: { requiresCheck: true } },
      { path: 'Fundamentals', name: 'FundamentalsAnswer', component: Fundamentals, props: true, meta: { requiresCheck: true } }
    ]
  },
  { path: '/Error', name: 'Error', component: ErrorComp },
  { path: '/UnknownAnswer', name: 'QuestionUnknownAnswer', component: Unknown, props: true },
  // Add more routes here as needed.

  // Redirects
  { path: '/Search', redirect: '/' },
  { path: '/*', redirect: '/' }
]

// Create the router instance
var router = new VueRouter({
  routes,
  mode: 'history'
})

// Check before goin to each route if it is ok to be going there
import SearchCheck from './SearchCheck.js'
router.beforeEach((to, from, next) => {
  console.log('Doing a check!!!')
  if (to.matched.some(record => record.meta.requiresCheck)) {
    console.log('Needs to be checked')
    console.log(to)
    // This route requires a search to have been performed
    if (!SearchCheck.canGoToThisComponent(to.name)) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next() // Needs to be called to continue on
  }
})

// Create the vue instance and bind it to the body with id=app in index.html
new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  store,
  render: h => h(App)
})
