var stockRoute = require('express').Router();
var request=require('request-promise');

// TODO Make this return actual stock data
// NOTE Consider seperating into seperate directory & files if this file gets too bulky
stockRoute.get('/', (req, res) => {
  getStock(res);
});

function getStock(response) {
  var host = 'http://dev.markitondemand.com';
  var pathGeneral = '/MODApis/Api/v2/Lookup/json?input=apple';
  var pathStock = '/MODApis/Api/v2/Quote/json?symbol=aapl';

  request({uri: host + pathGeneral})
    .then(function (res) {
    response.json(JSON.parse(res));
  });
}

module.exports = stockRoute;
