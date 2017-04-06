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

  extractSymbolsNLU(aSymbol, mapObject) {

    return {
      marketName: mapObject[aSymbol],
      ticker: aSymbol
    }

  }

  getCompany() {
    // TODO extact to another method
    return new Promise( (resolve, reject) => {
      var PythonShell = require('python-shell');
      var entityPython = new PythonShell('server/api/entity_extractor.py');

      var theMessage = this.getQuestionWithoutPunctuation();
      
      entityPython.send(JSON.stringify(theMessage));
      
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

          var smar = symbolArr[0];

          console.log("RESOLVE FOR NLTK AAPL:")
          console.log(smar);

          resolve(symbolArr[0]);
        } 
        else {

          console.log("NLTK FAILED");
          
            var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
            var nlu = new NaturalLanguageUnderstandingV1({
              username: process.env.NLU_USERNAME,
              password: process.env.NLU_PASSWORD,
              version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
            });

            nlu.analyze({
              text: theMessage,
              'features': {
                'entities': {
                  'limit': 5
                },
              },
            }, function(err, watsonResponse) {
              if (err) {
                console.log(err);
                reject(err);
              } else {
                var i;
                var name;

                if (watsonResponse.entities.length <= 0) {
                  console.log("Empty Watson response.");
                  reject("Empty Watson response.");
                }

                for (i = 0; i < watsonResponse.entities.length; i++) {
                  if (watsonResponse.entities[i].type == "Company") {
                    name = watsonResponse.entities[i].text;
                    break;
                  }
                } 

                console.log(name);
                var host = 'http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=' + name;

                request({uri: host}).then(function (res) {
                  
                  var generalJSON = JSON.parse(res)[0];

                  console.log(generalJSON);

                  if (generalJSON != undefined) {

                    var returnJSON = JSON.parse(JSON.stringify({ marketName : generalJSON.Name, ticker: generalJSON.Symbol }));

                    console.log(returnJSON);

                    resolve(returnJSON);

                  }

                });
              }
            });

        }
      });
    });
  }

  
}
