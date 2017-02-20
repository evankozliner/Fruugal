import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import VueResource from 'vue-resource'
import Stock from './components/Stock.vue'
import Search from './components/Search.vue'
import ErrorComp from './components/Error.vue'

Vue.use(VueResource)
Vue.use(VueRouter)

// Create the router instance
var router = new VueRouter({
  hashbang: false,
  history: true
})

// Define routes
router.map({
  '/': {
    component: App,
    subRoutes: {
      '/': {
        component: Search
      },
      '/stock': {
        component: Stock
      },
      '/error': {
        component: ErrorComp
      }
      // Add in any addition components here that are rendered inside App.vue (should be most) and import the component at the top of the page too.
    }
  }
})

// Define redirects
router.redirect({
  // Redirect search url to home page, which is search component
  '/search': '/',
  // Redirect anything that is not a url we want to the search page
  '*': '/'
})

// Start the router, which creates a Vue instance for us to use
router.start({template: ''}, '#app')
