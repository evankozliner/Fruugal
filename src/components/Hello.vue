<template>
  <div class="hello">
    <h1>Ask Watson!</h1>
    <input type="text" value={{msg}} v-model="msg"></input>
    <button @click="askWatson">Ask Watson!</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'What is the stock price of Apple?'
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
