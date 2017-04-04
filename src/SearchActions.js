import SearchCheck from './SearchCheck.js'

export default {

  /*
   * Given a Vue instance and a query string, submits an HTTP GET request to our NLC
   * server and updates the vuex store and finally pushes the next route onto the history
   * stack to go to that route.
   */
  initialSearch (vueInstance, query) {
    return new Promise(function (resolve, reject) {
      vueInstance.$http.get('/api', {params: {message: query}}).then(function (response) {
        console.log(response.body)
        var comp = response.body.classType
        // Let router know a search has been performed through this object
        SearchCheck.searchPerformed(comp)

        // Create the object that will contain the next route
        var whereToGo = {
          name: comp
        }

        console.log(whereToGo.name + ' -- Will now update the store')
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
  }
}

