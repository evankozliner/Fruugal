<template>
  <div id="app">

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      currentView: 'search'
    }
  }

}
</script>


<style>
body {

  height: 100%;
  background: #2E86AB;

  font-family: sans-serif;
  font-style: Verdana, Geneva;
}

#app {
  color: #2c3e50;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
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
