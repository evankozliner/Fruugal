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
import Market from './components/Market.vue'
import ErrorComp from './components/Error.vue'
import Unknown from './components/Unknown.vue'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuex)

// Create the vuex store
const store = new Vuex.Store({
  state: {
    data: {},
    searchString: '',
    page: ''
  },

  mutations: {
    newDataRetrieved (state, payload) {
      state.data = payload.retrievedData
      state.searchString = payload.query
      state.page = payload.page
    }
  }
})

// , meta: { requiresSearch: false }
// Define the routes
const routes = [
  { path: '/', name: 'Search', component: Search },
  { path: '/question', name: 'ValidQuestion', component: ValidQuestion, props: true,
    children: [
      { path: 'Stock', name: 'StockAnswer',
          component: Stock, props: true, meta: { requiresSearch: true }},
      { path: 'Information', name: 'GeneralInfoAnswer', component: Info, props: true,
      meta: { requiresSearch: true } },
      { path: 'Market', name: 'MarketAnswer', component: Market, props: true }
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
  if (to.matched.some(record => record.meta.requiresSearch)) {
    // This route requires a search to have been performed
    if (!SearchCheck.searchHasBeenPerformedToThisClass(to.name)) {
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
