var request = require('request-promise');

module.exports = class StockQuery {
  constructor(symbol) {
    this.symbol = symbol;
    this.host = 'http://dev.markitondemand.com';
    this.generalPath = `/MODApis/Api/v2/Lookup/json?input=${this.symbol}`;
    this.stockPath = `/MODApis/Api/v2/Quote/json?symbol=${this.symbol}`;
  }

  getStockPriceInfo() {
    return new Promise((res, rej) => {
      request({uri: this.host + this.stockPath}).then( (response) => {
        res(JSON.parse(response));
      });
    });
  }

  // TODO refactor this out
  getGeneral(response, ticker) {
    var host = 'http://dev.markitondemand.com';
    var pathGeneral = '/MODApis/Api/v2/Lookup/json?input=' + ticker;
    var pathStock = '/MODApis/Api/v2/Quote/json?symbol=' + ticker;
  
    request({uri: host + pathGeneral})
      .then(function (res) {
      request({uri: host + pathStock})
        .then(function (res2) {
          var generalJSON = JSON.parse(res)[0];
          var stockJSON = JSON.parse(res2);
  
          var jsons = new Array();
          jsons.push(generalJSON);
          jsons.push(stockJSON);
  
          response.json(jsons);
        })
    });
  
  }
}
