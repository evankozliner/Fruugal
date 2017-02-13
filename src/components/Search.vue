<template>
  <div class="">
    <div class="name-box">
      <h1 class="name">Früügal</h1>
      <h2>Getting the financial information you need</h2>
    </div>
    <input type="text" v-model="querey" autofocus="on" placeholder="What do you want to know?"></input>
    <button @click="askWatson">Search</button>


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
      querey: ''
    }
  },

  methods: {
    askWatson () {
     // GET /someUrl
      this.$http.get('/api', {params: {message: this.querey}}).then(response => {
        // get body data
        // Emit the category of the response
        var categoryOfQuestion = response.body.reply
        var dataRetrieved = response
        console.log(categoryOfQuestion)
        this.$emit('category', categoryOfQuestion)
        this.$emit('data', dataRetrieved)
      }, response => {
        // error callback
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.name-box {
  margin-bottom: 40px;
}
h1.name {
  color: #42b983;
  font-size: 70px;
  margin-bottom: 10px;
}

h2 {
  margin: 0;
  font-size: 16px;
}

input {
  border-radius: 5px;
  border: none;
  width: 300px;
  height: 30px;
  font-size: 18px;

  transition: all 0.2s ease-in-out;
}

input:focus, button:hover {
  box-shadow: 1px 2px 4px rgba(48, 64, 80, .8);
  outline: none;

}

button {
  height: 32px;
  width: 70px;
  margin-left: 6px;
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;
  color: #2E86AB;

  font: inherit;

  transition: all 0.2s ease-in-out;
}
</style>
