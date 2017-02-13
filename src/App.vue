<template>
  <div id="app">
    <div id="mainContainer">
      <div id="sidebar" v-if="currentView !== 'search'">
        <sidebar></sidebar>
      </div>

      <div id="mainView">
        <component v-on:category="changeView" :is="currentView"></component>
      </div>

    </div> <!-- end MainContainer -->

  </div>
</template>

<script>
import search from './components/Search'
// import StockAnswer from './components/Stock'
import stock from './components/Stock'
// import GeneralInfoClass from './components/Info'
import info from './components/Info'
import sidebar from './components/Sidebar'
import errorComponent from './components/Error'
// import QuestionUnknownAnswer from ./components/UnknownAnswer

export default {
  data: function () {
    return {
      currentView: 'search'
    }
  },

  components: {
    search,
    stock,
    info,
    // StockAnswer,
    // GeneralInfoClass,
    sidebar
  },

  methods: {
    changeView: function (category) {
      console.log('Here in App.vue, I got the category ' + category)
      if (category === null) {
        this.currentView = errorComponent
      } else {
        this.currentView = category
      }
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
