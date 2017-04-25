import SearchCheck from './SearchCheck.js'

export default {

  /*
   * Given a Vue instance and a query string, submits an HTTP GET request to our NLC
   * server and updates the vuex store and finally pushes the next route onto the history
   * stack to go to that route.
   */
  initialSearch (vueInstance, query) {
    return new Promise(function (resolve, reject) {
      // Example request
      // vueInstance.$http.get('/fundamentals/' + query).then(function (res) {
      //   console.log(res)
      // })
      vueInstance.$http.get('/api', {params: {message: query}}).then(function (response) {
        console.log(response.body)
        var comp = response.body.classType
        // Let router know a search has been performed through this object
        SearchCheck.searchPerformed(comp)

        // Create the object that will contain the next route
        var whereToGo = {
          name: comp
        }

        console.log(whereToGo.name + ' -- Will now update the store.  From SearchActions.js')
        // Update the store
        vueInstance.$store.commit('newDataRetrieved', {retrievedData: response.body, query: query, page: comp})

        // Go to this route
        resolve(whereToGo)
      }, function (response) {
        // error callback, route to error page
        console.log('There was an error')
        reject('/Error')
      })
    })
  },

  /*
   * Sends a request to the RAR server for articles
   * Needs a instance of vue, stock ticker, and company name
   */
  sendArticlesRequest (vueInstance, ticker, name) {
    let baseUrl = 'http://localhost:4040'
    var fullUrl = baseUrl + '/' + ticker + '/' + name

    return new Promise(function (resolve, reject) {
      vueInstance.$http.get(fullUrl).then(function (response) {
        // Success
        var resp = response.body
        resolve(resp)
      }, function (response) {
        // Error
        console.log('Error getting articles')
        resolve(undefined)
      })
    })
  },

  /*
   * Sends a request to the fundamentals API
   * Needs a instance of vue and a stock ticker
   */
  sendFundamentalsRequest (vueInstance, ticker) {
    return new Promise(function (resolve, reject) {
      vueInstance.$http.get('/fundamentals/' + ticker).then(function (response) {
        // Check to make sure that a response was successful
        console.log('We got the fundamentals')
        var asJson = JSON.parse(response.body)
        resolve(asJson)
      }, function (response) {
        console.log('There was an error getting the fundamentals')
        resolve(undefined)
      })
    })
  }

}

