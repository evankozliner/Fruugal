import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import VueResource from 'vue-resource'

// Components
import Search from './components/Search.vue'
import ValidQuestion from './components/ValidQuestion.vue'
import Stock from './components/Stock.vue'
import Info from './components/Info.vue'
import ErrorComp from './components/Error.vue'
import Unknown from './components/Unknown.vue'

Vue.use(VueResource)
Vue.use(VueRouter)
// , meta: { requiresSearch: false }
// Define the routes
const routes = [
  { path: '/', name: 'Search', component: Search },
  { path: '/question', name: 'ValidQuestion', component: ValidQuestion, props: true,
    children: [
      { path: 'Stock', name: 'StockAnswer',
          component: Stock, props: true, meta: { requiresSearch: false }},
      { path: 'Information', name: 'GeneralInfoAnswer', component: Info, props: true,
      meta: { requiresSearch: false } }
    ]
  },
  { path: '/Error', name: 'Error', component: ErrorComp },
  { path: '/UnknownAnswer', name: 'QuestionUnknownAnswer', component: Unknown, props: true },
  // Add more routes here as needed. NOTE: 'props: true' must be set in each route that
  // needs the json data from the API call!!

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
        path: '/',
        query: {}
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
  render: h => h(App)
})
