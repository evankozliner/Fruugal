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
  { path: '/', component: App,
    children: [
      { path: '/', component: Search },
      { path: '/Stock', name: 'StockAnswer', component: Stock },
      { path: '/Information', name: 'GeneralInfoAnswer', component: Info },
      { path: '/Error', name: 'Error', component: Error },
      { path: '/UnknownAnswer', name: 'QuestionUnknownAnswer', component: Unknown },
    ]
  }
]

// Create the router instance
var router = new VueRouter({
  routes: routes,
  hashbang: false,
  history: true
})

// Define routes
router.map({
  '/': {
    component: App,
    subRoutes: {
      '/': { component: Search },
      '/StockAnswer': { name: 'StockAnswer', component: Stock, props: (route) => ({ theResponse: route.params.jsonData }) },
      '/GeneralInfoAnswer': { name: 'GeneralInfoAnswer', component: Info, props: true },
      '/Error': { name: 'Error', component: ErrorComp, props: true },
      '/QuestionUnknownAnswer': { name: 'QuestionUnknownAnswer', component: Unknown, props: true }
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

// Define hooks

// Start the router, which creates a Vue instance for us to use
router.start({template: ''}, '#app')
