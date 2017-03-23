let masterStockHash = require('./master_stock_hash.json');
let stopWords = require('./stopwords.json');
let punctuation = require('./punctuation.json');
var request=require('request-promise');

// TODO This should be using entity recognition
module.exports = class QueryExtractor {
  constructor(question) {
    this.question = question;
  }

  getQuestionWithoutPunctuation() {
    var cleanedQuestion = this.question;
    punctuation.forEach( (p) => {
      cleanedQuestion = cleanedQuestion.replace(p, "");
    });
    return cleanedQuestion;
  }

  extractSymbols(inputString = this.getQuestionWithoutPunctuation(), mapObject) {
    return inputString
      .toUpperCase()
      .split(" ")
      .filter( (word) => {
        return mapObject[word] != undefined;
      }).map((word) => {
        return {
          marketName: mapObject[word],
          ticker: word
        };
      });
  }

  getCompany() {
    // TODO extact to another method
    return new Promise( (resolve, reject) => {
      var PythonShell = require('python-shell');
      var entityPython = new PythonShell('server/api/entity_extractor.py');
      
      entityPython.send(JSON.stringify(this.getQuestionWithoutPunctuation()));
      
      var dataString;

      entityPython.on('message', function(message){
        dataString = message;
      });

      entityPython.end(function(err){
          
        if (err) {
            console.log(err);
            reject(err);
        };

        console.log('String returned by python file = ' + dataString);

        //attempt to find symbol in MSH
        var extractor = new QueryExtractor();
        var symbolArr = extractor.extractSymbols(dataString, masterStockHash);
        if (symbolArr.length != 0) {
          resolve(symbolArr[0]);
        } 
        else {
          //attempt to find first name in MSH

          // TODO add market name here
          var host = 'http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=' + dataString;

          request({uri: host}).then(function (res) {
              var generalJSON = JSON.parse(res)[0];

              if (generalJSON != undefined) {

                resolve(generalJSON);

              }
          });
        }
      });
    });

  }
}
