var stockRoute = require('express').Router();

// TODO Make this return actual stock data
// NOTE Consider seperating into seperate directory & files if this file gets too bulky
stockRoute.get('/', (req, res) => {
  res.status(200).json({ name: 'Apple',
             nasdaq: 'AAPL',
             price: 121.85,
             change: '+1.88',
             CEO: 'Tim Cook'});
});

module.exports = stockRoute;
