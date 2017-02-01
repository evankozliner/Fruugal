<template>
  <div id="app">
    <search></search>


  </div>
</template>

<script>
import Search from './components/Search'
import Stock from './components/Stock'
import Sidebar from './components/Sidebar'

export default {
  components: {
    Search,
    Stock,
    Sidebar
  },

  data: {
    currentView: Search
  }
}
</script>


<style>

body {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  background: #2E86AB;

  font-family: sans-serif;
  font-style: Verdana, Geneva;
}

#app {
  color: #2c3e50;
  margin-top: 100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}
</style>
