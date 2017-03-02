<template>
<div>
  <div class="info">
    <h1>You asked a stock question!</h1>
    <h2>{{theResponse.companyName}}: {{theResponse.companySymbol}}</h2>
    <h2>Stock price: ${{theResponse.stockPrice}}</h2>

    <h3>{{ articles }}</h3>
  </div>

  <transition name="slide-fade" mode="out-in"> <!-- This will allow the articles div to transition in -->
    <spinner class="center" v-if="!loaded"></spinner>
    <div id="articles" v-else>
      <h1>What are people thinking?</h1>
      <div id="good_articles">

      </div>
      <div id="bad_articles">

      </div>

    </div>
  </transition>
</div>
</template>

<script>
import Spinner from './Spinner2.vue'

export default {

  // The data returned from the API call
  props: ['theResponse', 'articles', 'loaded'],

  components: {
    'spinner': Spinner
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info {
  color: #2c3e50;
  background: #42b983;
  height: 400px;
}

.center {
  margin: auto
}

#articles {
  background: rgba(150, 150, 150, 0.3);
  margin-top: 30px;
  padding: 5px;
}

#good_articles {
  margin: 15px 5px 15px 5px;
  height: 300px;
  background: green;
}

#bad_articles {
  margin: 15px 5px 15px 5px;
  height: 300px;
  background: red;
}

/* Trainsitions */
.slide-fade-enter-active {
  transition: all .5s ease;
}

.slide-fade-leave-active {
  transition: all .5s ease;
}

.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateY(20px);
  opacity: 0;
}
</style>
