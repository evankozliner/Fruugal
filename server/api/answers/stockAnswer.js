// TODO try import
// TODO change everything to stockPrice for js standards

let Answer = require('./Answer.js');
let StockQuery = require('../stockQuery.js');
let QueryExtractor = require('../queryExtractor.js');
var QuestionUnknownAnswer = require('./questionUnknownAnswer.js');

module.exports = class StockAnswer extends Answer {
  stockAnswer(extractedData) {
    return new Promise((res, rej) => {
      // Assume we only want 1 symbol here, hence [0] array reference
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

  answer() {
    return new Promise( (res, rej) => {
      //let extractedData = (new QueryExtractor(this.rawQuestion)).getCompany();
      let queryExtractor = new QueryExtractor(this.rawQuestion);
      queryExtractor.getCompany().then( extractedData => {
        if (extractedData === undefined) {  
          console.log("Stock answer is undefined");
          return (new QuestionUnknownAnswer(this.rawQuestion)).answer();
        };
        res(this.stockAnswer(extractedData));
      })
      .catch(function(reason) { console.log(reason); rej(reason); });
    });
  }
}
