// TODO try import
// TODO change everything to stockPrice for js standards

let Answer = require('./Answer.js');
let StockQuery = require('../stockQuery.js');
let QueryExtractor = require('../queryExtractor.js');

module.exports = class StockAnswer extends Answer {
  answer() {
    return new Promise((res, rej) => {
      // Assume we only want 1 symbol here, hence [0] array reference
      let extractedData = (new QueryExtractor(this.rawQuestion)).extractSymbols()[0];
      let companySymbol = extractedData.ticker;
      let companyName = extractedData.marketName;
      let stockQuery = new StockQuery(companySymbol);
      stockQuery.getStockPriceInfo().then( (stockPriceInfo) => {
        res({
          classType: 'StockAnswer',
          companySymbol: companySymbol,
          companyName: companyName,
          stockPrice: stockPriceInfo.LastPrice
        });
      })
      .catch(function(reason) {
        console.log(reason); 
        rej(reason);
      });
    });
  }
}
