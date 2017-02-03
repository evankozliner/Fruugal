<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="askWatson">{{msg}}</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Search'
    }
  },
  methods: {
    askWatson () {
     // GET /someUrl
      this.$http.get('/api', {params: {message: this.msg}}).then(response => {
        // get body data
        console.log(response.body)
      }, response => {
        // error callback
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
