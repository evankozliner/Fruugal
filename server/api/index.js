var routes = require('express').Router();

// Our API will be seperated in this fashion, different Watson concerns will have different files
var stocks = require('./stocks.js');

// In addition to requiring the file we need to tell our API to use it under some namespace
routes.use('/stocks', stocks);


routes.get('/', function(req, res) {
  res.status(200).json({ heartbeat: 'Connected!' });
});

module.exports = routes;
