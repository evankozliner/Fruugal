var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

app = express();
api = require('./api');

// Handle serving our index.html page
app.use(serveStatic(__dirname + "./../"));

// Handle receiving API requests
app.use('/api', api);

var port = process.env.PORT || 5000;

app.listen(port);

console.log('server started ' + port);


