var stockRoute = require('express').Router();
var request=require('request-promise');

// TODO Make this return actual stock data
// NOTE Consider seperating into seperate directory & files if this file gets too bulky
stockRoute.get('/', (req, res) => {
  getGeneral(res, ticker);
});

var ticker = 'goog';

function getGeneral(response, ticker) {
  var host = 'http://dev.markitondemand.com';
  var pathGeneral = '/MODApis/Api/v2/Lookup/json?input=' + ticker;
  var pathStock = '/MODApis/Api/v2/Quote/json?symbol=' + ticker;

  request({uri: host + pathGeneral})
    .then(function (res) {
    request({uri: host + pathStock})
      .then(function (res2) {
        var generalJSON = JSON.parse(res)[0];
        var stockJSON = JSON.parse(res2);
        
        response.json(generalJSON.concat(stockJSON));
      }
  });

}

module.exports = stockRoute;
