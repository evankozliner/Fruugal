var QuestionClassifier = require('./questionClassifier.js');
var GeneralInfoAnswer = require('./answers/generalInfoAnswer.js');
var QuestionUnknownAnswer = require('./answers/questionUnknownAnswer.js');
let StockAnswer = require('./answers/stockAnswer.js');

var routes = require('express').Router();

// Our API will be seperated in this fashion, different Watson concerns will have different files
var stocks = require('./stocks.js');

// In addition to requiring the file we need to tell our API to use it under some namespace
routes.use('/stocks', stocks);

var routeQuestion = function(classificationRes) {
  switch(classificationRes.watsonClassRes) {
    case "stock":
      return new StockAnswer(classificationRes.question);
    case "info":
      return new GeneralInfoAnswer(classificationRes.question);
    default:
      return new QuestionUnknownAnswer(classificationRes.question);
  }
}

routes.get('/', function(req, res) {
  console.log("User query: " + req.query.message);

  var questionClassifier = new QuestionClassifier();

  questionClassifier.classify(req.query.message)
    .then(routeQuestion)
    .then(function(watsonsAnswer) { 
      return watsonsAnswer.answer(); 
    })
    .then(function(ans) { res.status(200).json(ans); })
    .catch(function(reason) { 
      console.log(reason); 
      res.status(500).json({error: reason});
    });
});

module.exports = routes;
