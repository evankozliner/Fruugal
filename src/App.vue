<template>
  <div id="app">
    <div id="header">
      <!-- not sure if we will need header, may be a component, or nothing -->
    </div>
    <div id="mainContainer">

        <div id="sidebar" v-if="currentView !== 'search'">
          <transition appear name="slide-in">
          <sidebar></sidebar>
          </transition>
        </div>


      <div id="mainView">
        <component :is="currentView"></component>
        <button @click="currentView = 'stock'">change component</button>
      </div>

    </div> <!-- end MainContainer -->

  </div>
</template>

<script>
import search from './components/Search'
import stock from './components/Stock'
import sidebar from './components/Sidebar'

export default {
  data: function () {
    return {
      currentView: 'search'
    }
  },

  components: {
    search,
    stock,
    sidebar
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
  background: #4efc67;
  margin-right: 10px;

}



.slide-in-enter-active, .slide-in-leave-active {
  transition: opacity 2s;
}
.slide-in-enter, .slide-in-leave-to  {
  opacity: 0;
}
</style>
