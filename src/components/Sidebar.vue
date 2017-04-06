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
        {term: 'Averaging Down', definition: 'This is when an investor buys more of a stock as the price goes down. This makes it so your average purchase price decreases.'},
        {term: 'Bear Market', definition: 'This is trading talk for the stock market being in a down trend, or a period of falling stock prices. This is the opposite of a bull market.'},
        {term: 'Beta', definition: 'A measurement of the relationship between the price of a stock and the movement of the whole market. If stock XYZ has a beta of 1.5, that means that for every 1 point move in the market, stock XYZ moves 1.5 points and vice versa'},
        {term: 'Bull Market', definition: 'This is when the stock market as a whole is in a prolonged period of increasing stock prices. Opposite of a bear market'},
        {term: 'Dividend', definition: 'This is a portion of a company’s earnings that is paid to shareholders, or people that own hat company’s stock, on a quarterly or annual basis. Not all company’s do this.'},
        {term: 'Hedge', definition: 'This is used to limit your losses. You can do this by taking an offsetting position. For example, if you hold 100 shares of XYZ, you could short the stock or futures positions on the stock.'},
        {term: 'Margin', definition: 'A margin account lets a person borrow money (take out a loan essentially) from a broker to purchase an investment. The difference between the amount of the loan, and the price of the securities, is called the margin.'},
        {term: 'Spread', definition: 'This is the difference between the bid and the ask prices of a stock, or the amount someone is willing to buy it and someone is willing to sell it.'},
        {term: 'Volume', definition: 'The number of shares of stock traded during a particular time period, normally measured in average daily trading volume.'}
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
  color: #2c3e50;
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
