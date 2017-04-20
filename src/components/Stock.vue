<template>
<div>
  <div class="info">
    <header id='stock_info'>
      <h1>{{theResponse.companyName}}</h1>
      <h2>Current stock price: ${{theResponse.stockPrice}}</h2>
    </header>
  </div>
  
  <div>
    <chart :info="theResponse.chart"></chart>
  </div>

  <transition name="slide-fade" mode="out-in"> <!-- Allows articles div to transition in -->
    <div id="articles" v-if="loaded && articles">  <!-- Makes sure articles is not null -->
      <h1>What are people thinking?</h1>
      <div id='article_display' v-for="article in articles" v-bind:key='article'>
        <article-box :info="article"></article-box>
      </div>
    </div> <!-- articles div -->
  </transition>
</div>
</template>

<script>
import Spinner from './Spinner2.vue'
import Article from './Article.vue'
import Chart from './Chart.vue'

export default {

  // The data returned from the API call
  props: ['articles', 'loaded'],

  components: {
    'spinner': Spinner,
    'article-box': Article,
    'chart': Chart
  },

  data () {
    return {
      currentData: null
    }
  },

  computed: {
    theResponse: function () {
      console.log(this.$store.state)
      var storeData = this.$store.state
      var retval = this.currentData
      if (storeData.page === 'StockAnswer') {
        retval = storeData.data
        this.currentData = retval
      }
      return retval
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
  background: #42b983;
  padding: 5px;
  width: 100%;
  margin: auto;
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

/* Transitions for */
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .2s ease;
}

/* For the articles div entrance */
.slide-fade-enter
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateY(20px);
  opacity: 0;
}

/* For the loading the page */
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
