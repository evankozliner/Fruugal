<template>
 <body>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
 </body>
</template>

<script>
export default {
  data: function () {
    return {

    }
  }
}
</script>

<style scoped>
body {
  background: #2E86AB;
  font-family: sans-serif;
  font-style: Verdana, Geneva;

  padding: 10px;
}

#app {
  color: #2c3e50;
  text-align: center;
}


/* Transitions */
.fade-enter-active {
  transition: all .2s ease;
}
.fade-leave-active {
  transition: all .2s ease;
}

/* when starting a component */
.fade-enter
/* .slide-fade-leave-active for <2.1.8 */ {
  opacity: 0;
}

/* when leaving a component */
.fade-leave-to {
  opacity: 0;
}
</style>
