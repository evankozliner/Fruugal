<template>
  <div class='container'>
    <div>
      This is where the side bar goes
    </div>

    <div>
      <router-view :articles="articles" :loaded="loaded"></router-view>
      <button @click="getData()">Click to pass down data to child component</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: 'uhhhhh...',
      loaded: false
    }
  },

  // Method for making the call to get articles from the cluster
  methods: {
    getData: function () {
      // var watson = require('watson-developer-cloud')
      // var rar = watson.retireve_and_rank({
        // username: process.env.RAR_USERNAME,
        // password: process.env.RAR_PASSWORD,
        // version: 'v1'
      // })

      console.log('We are going to get the data')
      this.$http.get()
      this.articles = 'here they are!'
      console.log('We have gotten the articles')
      this.loaded = true
    }
  }
}
</script>
