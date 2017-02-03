module.exports = class QuestionClassifier { 
  constructor() {
    this.watson = require('watson-developer-cloud');
  }
  
 classify(question) {
   return new Promise(function(resolve, reject) {
     resolve("myClass");
   });
 }
}
