<template>
 <body>
  <div id="app">
    <router-view></router-view>
  </div>
 </body>
</template>

<script>
export default {
  data: function () {
    return {
      currentView: 'search',
      responseFromAPI: ''
    }
  }
}
</script>

<style scoped>
body {
  background: #2E86AB;
  font-family: sans-serif;
}

#app {
  color: #2c3e50;
  text-align: center;
}
</style>
