<template>
  <div class='container'>
    <div>
      This is where the side bar goes
    </div>

    <div>
      <keep-alive>
        <router-view :articles="articles" :loaded="loaded"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {

  // theResponse will get the returned data
  props: ['theResponse'],

  data () {
    return {
      articles: null,
      loaded: false
    }
  },

  // Method for making the call to get articles from the cluster
  // This will be called as soon as the component is ready
  mounted: function () {
    // First get the ticker from the response
    var ticker = '/' + this.theResponse.companySymbol
    var companyName = '/' + this.theResponse.companyName
    var baseUrl = 'http://localhost:4040'

    console.log('We are going to get the data')
    var fullUrl = baseUrl + ticker + companyName
    this.$http.get(fullUrl).then(response => {
      // Success
      console.log('success')
      var resp = response.body
      console.log(resp)
      if (!resp.hasOwnProperty('solrErrorMessage')) {
        this.articles = resp.response.docs
      }
    }, response => {
      // Error
      console.log('Error getting articles')
    })

    console.log('We have gotten the articles')
    this.loaded = true
  }
}
</script>
