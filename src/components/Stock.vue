<template>
<div class=''>
  <div class="info">
    <header id='stock_info'>
      <h1>Stock Information for {{theResponse.companySymbol}}</h1>
      <h3>{{theResponse.companyName}}</h3>
      <h2>Current stock price: ${{theResponse.stockPrice}}</h2>
    </header>
    <br>
    <div id="advice">
      <h2>What should you do?</h2>
      <p>{{this.advice}}</p>
    </div>
  </div>

  <transition name="slide-fade" mode="in-out"> <!-- Allows articles div to transition in -->
    <spinner class="center" v-if="!loaded"></spinner>
    <div id="articles" v-else-if="articles">  <!-- Makes sure articles is not null -->
      <h1>What are people thinking?</h1>
      <h3>Favorable</h3>
      <div id="good_articles">
        <div class="article" v-for="article in articles.good">
          <h3>{{article.title}}</h3>
          <p class="description">{{article.description}}</p>
          <a :href="article.url" target="_blank">{{article.url}}</a>
        </div>
      </div>

      <h3>Neutral</h3>
      <div id="even_articles">
        <div class="article" v-for="article in articles.even">
          <h3>{{article.title}}</h3>
          <p class="description">{{article.description}}</p>
          <a :href="article.url" target="_blank">{{article.url}}</a>
        </div>
      </div>

      <h3>Unfavorable</h3>
      <div id="bad_articles">
        <div class="article" v-for="article in articles.bad">
          <h3>{{article.title}}</h3>
          <p class="description">{{article.description}}</p>
          <a :href="article.url" target="_blank">{{article.url}}</a>
        </div>
      </div>

    </div> <!-- articles div -->
  </transition>
</div>
</template>

<script>
import Spinner from './Spinner2.vue'

export default {

  // The data returned from the API call
  props: ['articles', 'loaded'],

  components: {
    'spinner': Spinner
  },

  data () {
    return {
      advice: 'We\'re not too sure.  We suggest asking around'
    }
  },

  computed: {
    theResponse: function () {
      console.log('Here in computed')
      return this.$store.state.data
    }
  },

  created: function () {
    console.log('In stock.vue, I am getting the data from the store')
  },

  beforeDestroy: function () {
    console.log('Stock.vue is being destroyed')
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info {
  padding: 20px 2px 20px 2px;
  color: #2c3e50;
  //background: rgba(150, 150, 150, 0.3);
  background: rgba(240,240,240,0.2);
}

#stock_info, #advice {
  margin: 10px;
}

.center {
  margin: auto
}

#articles {
  background: rgba(150, 150, 150, 0.3);
  margin: 30px 0px 30px 0px;
  padding: 5px;
  text-align: left;
}

#good_articles {
  margin: 15px 5px 15px 5px;
  padding: 0px;
  //background: #42b983;
  border-left: 6px solid #42b983;
}

#bad_articles {
  margin: 15px 5px 15px 5px;
  padding: 0px;
  //background: #FF6961;
  border-left: 6px solid #FF6961;
}

#even_articles {
  margin: 15px 5px 15px 5px;
  padding: 0px;
  //background: #F8EC96;
  border-left: 6px solid #F8EC96;
}

.article {
  margin: 8px 5px 5px 5px;
  padding: 1px 4px 1px 4px;
  background: rgba(20,20,20,0.1);
}

p.description {
  padding-left: 20px;
}

.article a, .article h3 {
  text-decoration: none;
  color: rgba(0,0,0,0.7);
}

/* Transitions */
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
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
  position: absolute;
  left: 50%;
}
</style>
