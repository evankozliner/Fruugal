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
      <div id='article_display' v-for="article in articles">
        <article-box :info="article"></article-box>
      </div>
    </div> <!-- articles div -->
  </transition>
</div>
</template>

<script>
import Spinner from './Spinner2.vue'
import Article from './Article.vue'

export default {

  // The data returned from the API call
  props: ['articles', 'loaded'],

  components: {
    'spinner': Spinner,
    'article-box': Article
  },

  data () {
    return {
      advice: 'We\'re not too sure.  We suggest asking around'
    }
  },

  computed: {
    theResponse: function () {
      console.log(this.$store.state)
      return this.$store.state.data
    }
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
