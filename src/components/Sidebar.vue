<template>
<div class="container">
  <div class="titleQuestion">
    <h1>Not sure of <br />a term?</h1>
  </div>
  <div v-for="term in terms" id="terms">
    <term-and-def :term='term.term', :definition='term.definition'></term-and-def>
  </div>
</div>
</template>


<script>
import termAndDef from './TermAndDef'

export default {

  components: { termAndDef },

  data: function () {
    return {
      terms: [
        {term: 'Stock', definition: 'This is the definition of a stock.'},
        {term: 'Index', definition: 'This is the definition of an index.'},
        {term: 'Company', definition: 'This is the super crazy long definition of a company. However, it only describes a little bit of it still.'}
      ],

      isActive: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  margin: 5px;
  text-align: left;
  //background: red;
}

.titleQuestion {
  font-size: 20px;
}

#terms {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  padding: 10px;
  margin: 1px;
  //border: 3px solid white;

  transition: all 0.5s;
}

</style>
