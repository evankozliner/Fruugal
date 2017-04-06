<template>
  <div v-if="!smallpage" class="jumbotron vertical-center">
    <div class="container text-center">
      <div class="name-box">
        <h1 class="name">Früügal</h1>
        <h2>Getting the financial information you need</h2>
      </div>
      <input type="text" v-model="query" @keyup.enter="askWatson" autofocus="on" placeholder="What do you want to know?"></input>
      <button @click="askWatson">Search</button>

      <spinner class="center" v-if="loading"></spinner>
    </div>
  </div>  <!-- End of full page div -->

  <div v-else> <!-- This is for small search bar on top of a page -->
    <div class="container cont">
      <h1 class="smallName col-md-3">Früügal</h1>
      <div class="inputArea col-md-7">
        <input type="text" v-model="query" @keyup.enter="askWatson" autofocus="on" placeholder="What do you want to know?"></input>
        <button @click="askWatson">Search</button>

        <spinner class='col-md-2 right' v-if="loading"></spinner>
      </div>
    </div>
  </div>  <!-- End of small page div -->
</template>

<script>
import SearchActions from '../SearchActions.js'
import Spinner from './Spinner2.vue'
export default {
  components: {
    'spinner': Spinner
  },
  props: ['smallpage'],
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
        instance.$emit('SP') // Emit the event that search occured
        instance.$router.push(result)
      }, function (err) {
        console.log('There was an error')
        instance.loading = false
        instance.$router.push(err)
      })
      this.$emit('searchPerformed') // Emit the event that search occured
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cont {
  //background: #2E86AB;
}
.name-box {
  margin-bottom: 40px;
}
h1.name {
  color: #42b983;
  font-size: 70px;
  margin-bottom: 10px;
}
h1.smallName {
  color: #42b983;
  font-size: 50px;
  text-align: left;
}
h2 {
  margin: 0;
  font-size: 16px;
}
input {
  border-radius: 1px;
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
.jumbotron.vertical-center {
  margin-bottom: 0;
  background-color: #2E86AB;
}
.vertical-center {
  min-height: 100%;
  min-height: 100vh; 
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex; 
    -webkit-box-align : center;
  -webkit-align-items : center;
       -moz-box-align : center;
       -ms-flex-align : center;
          align-items : center;
  width: 100%;
         -webkit-box-pack : center;
            -moz-box-pack : center;
            -ms-flex-pack : center;
  -webkit-justify-content : center;
          justify-content : center;
}
.container {
  background-color: #2E86AB;
}
.center {
  margin: auto
}
.right {
  float: right;
  margin-top: 0px;
  margin-bottom: 0px;
}
.oneline {
  margin: 0px;
}
.inputArea {
  text-align: left;
  margin-top: 35px;
}
</style>
