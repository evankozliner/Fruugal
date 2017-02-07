module.exports = class QuestionClassifier { 
  
  filterWatsonResponse(watsonRes) {
    return watsonRes.top_class;
  }

  emptyRequestPromise() {
    return new Promise(function(resolve,rej) {
      resolve("Empty Question");
    });
  }
 
  classify(question) {
    var questionThis = this;

    if (question === "") { return this.emptyRequestPromise(); }

    return new Promise(function(resolve, reject) {
      var watson = require('watson-developer-cloud');
      var nlc = watson.natural_language_classifier({
        username: process.env.NLC_USERNAME,
        password: process.env.NLC_PASSWORD,
        version: 'v1'
      });
      nlc.classify({
        text: question, 
        classifier_id: `${process.env.NLC_ID}`
      }, function(err, watsonResponse) {
        if (err) { 
          console.log(err); 
          reject(err);
        } else {
          resolve(questionThis.filterWatsonResponse(watsonResponse));
        }
      });
    });
  }
}
