import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import VueResource from 'vue-resource'
import Stock from './components/Stock.vue'
import Search from './components/Search.vue'
import ErrorComp from './components/Error.vue'
import Unknown from './components/Unknown.vue'
import Info from './components/Info.vue'

Vue.use(VueResource)
Vue.use(VueRouter)

// Define the routes
const routes = [
  { path: '/', name: 'Search', component: Search },
  { path: '/Stock', name: 'StockAnswer',
      component: Stock, props: true, meta: { requiresSearch: true }},
  { path: '/Information', name: 'GeneralInfoAnswer', component: Info, props: true },
  { path: '/Error', name: 'Error', component: ErrorComp },
  { path: '/UnknownAnswer', name: 'QuestionUnknownAnswer', component: Unknown, props: true }
  // Add more routes here as needed. NOTE: 'props: true' must be set in each route that
  // needs the json data from the API call!!
]

// Create the router instance
var router = new VueRouter({
  routes,
  mode: 'history'
})

import SearchCheck from './SearchCheck'
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresSearch)) {
    // This route requires a search to have been performed
    if (!SearchCheck.searchHasBeenPerformed()) {
      next({
        name: Search,
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
