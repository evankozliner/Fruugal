<template>
  <div class='container'>
    <div>
      This is where the side bar goes
    </div>

    <div>
      <keep-alive>
        <router-view :articles="articles" :loaded="loaded"></router-view>
      </keep-alive>
      <br />
      <br />
      <button @click="getData()">Click to pass down data to child component</button>
    </div>
  </div>
</template>

<script>
export default {

  // theResponse will get the returned data
  props: ['theResponse'],

  data () {
    return {
      articles: 'uhhhhh...',
      loaded: false
    }
  },

  // Method for making the call to get articles from the cluster
  methods: {
    getData: function () {
      console.log('Now in validQuestion')
      console.log(this.theResponse)
      // First get the ticker from the response
      var ticker = '/' + this.theResponse.companySymbol
      console.log(this.theResponse.companySymbol)
      var companyName = '/' + this.theResponse.companyName

      var baseUrl = 'http://localhost:4040'

      console.log('We are going to get the data')
      var fullUrl = baseUrl + ticker + companyName
      this.$http.get(fullUrl).then(response => {
        // Success
        console.log('success')
        var resp = JSON.parse(response)
        console.log(resp)
        this.articles = resp.response.docs
      }, response => {
        // Error
        this.articles = 'There was an error getting the articles'
      })

      console.log('We have gotten the articles')
      this.loaded = true
    }
  }
}
</script>
