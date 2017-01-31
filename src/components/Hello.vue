<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="askWatson">search!</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  },
  methods: {
    askWatson () {
     // GET /someUrl
      this.$http.get('/api').then(response => {
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
