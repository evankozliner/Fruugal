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

    var spawn = require('child_process').spawn;
    var entityPython = spawn('python', ['entity_extractor.py']);

    var dataString;

    entityPython.stdout.on('data', function(data){
      dataString = data.toString();
    });

    entityPython.stdout.on('end', function(){

      console.log('String returned by python file =',dataString);

      //attempt to find symbol in MSH
      var symbolArr = extractSymbols(dataString, masterStockHash);
      if (symbolArr.length != 0) {
        return symbolArr[0].ticker;
      }

      //attempt to find first name in MSH

      var host = 'http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=' + dataString;

      request({uri: host})
      .then(function (res) {
          var generalJSON = JSON.parse(res)[0];

          if (generalJSON != undefined) {

            return generalJSON.Symbol;

          }
      });

      for each (pair in masterStockHash) {
        var currentName = masterStockHash[pair];
        var currentSymbol = pair;


      }

    });


    entityPython.stdin.write(JSON.stringify(this.getQuestionWithoutPunctuation()));
    entityPython.stdin.end();

  }
}
