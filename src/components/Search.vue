<template>
  <div class="container">
    <div class="name-box">
      <h1 class="name">Früügal</h1>
      <h2>Getting the financial information you need</h2>
    </div>
    <input type="text" v-model="query" @keyup.enter="askWatson" autofocus="on" placeholder="What do you want to know?"></input>
    <button @click="askWatson">Search</button>
    <spinner class="center" v-if="loading"></spinner>
  </div>
</template>

<script>
import SearchActions from '../SearchActions.js'
import Spinner from './Spinner2.vue'

export default {
  components: {
    'spinner': Spinner
  },

  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      query: '',
      loading: false
    }
  },

  methods: {
    askWatson () {
      // Start the spinner
      this.loading = true
      var instance = this
      SearchActions.initialSearch(this, this.query).then(function (result) {
        instance.loading = false
        console.log('Search was classified')
        instance.$router.push(result)
      }, function (err) {
        console.log('There was an error')
        instance.loading = false
        instance.$router.push(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  margin-top: 250px;
}

.name-box {
  margin-bottom: 20px;
}
h1.name {
  color: #42b983;
  font-size: 70px;
  margin-bottom: 10px;
}

h2 {
  font-size: 18px;
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

.center {
  margin: auto
}
</style>
