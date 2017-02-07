var QuestionClassifier = require('./questionClassifier.js');

var routes = require('express').Router();

// Our API will be seperated in this fashion, different Watson concerns will have different files
var stocks = require('./stocks.js');

// In addition to requiring the file we need to tell our API to use it under some namespace
routes.use('/stocks', stocks);

var routeQuestion = function(questionClass) {
  return questionClass;
}

routes.get('/', function(req, res) {
  console.log(req);
  console.log("User query: " + req.query.message);

  var questionClassifier = new QuestionClassifier();

  // TODO 
  // Question abstract class
  // QuestionRouter class, returns an implementation of type Question 

  questionClassifier.classify(req.query.message)
    .then(routeQuestion)
    .then(function(watsonsAnswer) {
      console.log(watsonsAnswer);
      res.status(200).json({reply: watsonsAnswer});
    })
    .catch(function(reason) { 
      console.log(reason); 
      res.status(500).json({error: reason});
    });
});

module.exports = routes;
