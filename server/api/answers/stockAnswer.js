// TODO try import
// TODO change everything to stockPrice for js standards

let Answer = require('./Answer.js');
let StockQuery = require('../stockQuery.js');
let queryExtactor = require('../queryExtractor.js');

module.exports = class StockAnswer extends Answer {
  answer() {
    return new Promise((res, rej) => {
      let companySymbol = (new queryExtractor(this.question)).extractSymbol();
      let stockQuery = new StockQuery(companySymbol);
      stockQuery.getStockPriceInfo().then( (stockPriceInfo) => {
        resolve({
          classType: 'StockAnswer',
          companySymbol: companySymbol,
          stockPrice: stockPriceInfo.LastPrice
        });
      });
    });
  }
}
