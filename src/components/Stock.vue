<template>
<div>
  <div class="info">
    <h1>You asked a stock question!</h1>
    <h2>{{theResponse.companyName}}: {{theResponse.companySymbol}}</h2>
    <h2>Stock price: ${{theResponse.stockPrice}}</h2>
  </div>

  <transition name="slide-fade" mode="out-in"> <!-- Allows articles div to transition in -->
    <spinner class="center" v-if="!loaded"></spinner>
    <div id="articles" v-else-if="articles">  <!-- Makes sure articles is not null -->
      <h1>What are people thinking?</h1>
      <div id="good_articles">
        <div class="article" v-for="article in articles">
          <h3>{{article.title[0]}}</h3>
          <a :href="article.url">{{article.url}}</a>
        </div>

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
:root {
  --good-color: rgba(47, 87, 47, 1);
  --bad: #FC3D32;
  --fearful: #FFC300;
}

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
  margin: 30px 50px 30px 50px;
  padding: 5px;
  text-align: left;
}

#good_articles {
  margin: 15px 5px 15px 5px;
  padding: 10px;
  background: rgba(119,221,119,0.6)
}

#bad_articles {
  margin: 15px 5px 15px 5px;
  padding: 10px;
  background: red;
}

.article {
  margin: 5px;
  padding: 1px 4px 1px 4px;
  background: rgba(20,20,20,0.1);
}

.article a {
  text-decoration: none;
  color: black;
}

/* Trainsitions */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all .5s ease;
}

/* For the articles div entrance */
.slide-fade-enter
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateY(20px);
  opacity: 0;
}

/* For the loading spinner leaving */
.slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  opacity: 0;
}
</style>
