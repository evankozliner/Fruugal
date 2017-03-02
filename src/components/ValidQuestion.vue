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
  data () {
    return {
      articles: 'uhhhhh...',
      loaded: false
    }
  },

  // Method for making the call to get articles from the cluster
  methods: {
    getData: function () {
      console.log('We are going to get the data')
      this.$http.get()
      this.articles = 'here they are!'
      console.log('We have gotten the articles')
      this.loaded = true
    }
  }
}
</script>
