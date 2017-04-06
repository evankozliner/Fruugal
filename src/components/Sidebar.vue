<template>
<div class="container1">
  <div class="titleQuestion">
    <h1>Not sure of a term?</h1>
  </div>
  <div v-for="term in terms" id="terms">
    <term-and-def :term='term.term' :definition='term.definition'></term-and-def>
  </div>
</div>
</template>


<script>
import termAndDef from './TermAndDef'

export default {

  components: { 'termAndDef': termAndDef },

  data: function () {
    return {
      terms: [
        {term: 'Stock', definition: 'This is the definition of a stock.'},
        {term: 'Index', definition: 'This is the definition of an index.'},
        {term: 'Company', definition: 'This is the super crazy long definition of a company. However, it only describes a little bit of it still.'},
        {term: 'Market', definition: 'This is the definition of a market where stuff is super cool.  This is the definition of a market where stuff is super cool.  This is the definition of a market where stuff is super cool.  This is the definition of a market where stuff is super cool.  This is the definition of a market where stuff is super cool.  This is the definition of a market where stuff is super cool.'},
        {term: 'Tax Evasion', definition: 'This is the definition of an index.'},
        {term: 'Financial Crisis', definition: 'This is the definition of an index.'},
        {term: 'Index', definition: 'This is the definition of an index.'}
      ],

      isActive: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container1 {
  margin: 5px;
  text-align: left;
  padding: 0px;
  //background: rgba(255,255,255,0.5);
}

.titleQuestion {
  font-size: 20px;
  color: black;
}

#terms {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  //justify-content: flex-start;
  height: auto;
  padding-bottom: 10px;
  margin: 1px;
  //border: 3px solid white;

  transition: all 0.5s;
}

</style>
