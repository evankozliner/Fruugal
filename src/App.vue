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

  height: 100%;
  background: #2E86AB;

  font-family: sans-serif;
  font-style: Verdana, Geneva;

  padding: 10px;
}

#app {
  color: #2c3e50;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
  //background: #2E86AB;
}

#header {
  background: grey;
  height: 100px;
  width: 100%;
}

#mainContainer {
  padding: 5px;
  display: flex;
  justify-content: space-around;
}

#mainView {
  width: 80%;
  //background: coral;
}

#sidebar {
  width: 20%;
  //background: #4efc67;
  margin-right: 20px;

}

</style>
