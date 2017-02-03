<template>
  <div class="titleQuestion">
    <h1>Not sure of a term?</h1>
  </div>
  <div id="terms">
    <div class="termDef" v-for="term in terms">
      {{term.term}}
    </div>

  </div>
</template>


<script>
export default {
  data: function () {
    return {
      terms: [
      {term: 'Stock', definition: 'This is the text that describes what a stock is.'},
      {term: 'Index', definition: 'This is the text that describes what an index is.'}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.terms {
  color: ;
  background: #42b983;
  width: 100%;
  height: auto;
}

.termDef {
  background: white;
  margin: 5px 0px;
}
</style>
