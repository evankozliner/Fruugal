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

      var host = 'http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=';

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

          console.log("RESOLVE FOR NLTK:")
          console.log(smar);

          var hostChart = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A365%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22" + smar.ticker + "%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D";

          request({uri: hostChart}).then(function (chartResponse) {

            var chartJSON = JSON.parse(chartResponse);

            smar.chart = chartJSON;

            console.log("returnJSON: " + JSON.stringify(smar));

            resolve(smar);

          });
        } else {

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
              'keywords': {
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

                if (watsonResponse.keywords.length <= 0) {

                  console.log("Empty Watson keyword response.");
                  reject("Empty Watson keyword response.");

                } else {

                  for (i = 0; i < watsonResponse.keywords.length; i++) {

                    name = watsonResponse.keywords[i].text;

                  }

                }

                  
              } else {

                for (i = 0; i < watsonResponse.entities.length; i++) {
                  if (watsonResponse.entities[i].type == "Company") {
                    name = watsonResponse.entities[i].text;
                    break;
                  }
                } 
              }

              if (name != undefined) {
                name = name.replace(" ", "%20");

                console.log(name);

                var hostEntity = host + name;

                request({uri: hostEntity}).then(function (markitRes) {
                  
                  var generalJSON = JSON.parse(markitRes)[0];

                  console.log(generalJSON);

                  if (generalJSON != undefined) {

                    var returnJSON = JSON.parse(JSON.stringify({ marketName : generalJSON.Name, ticker: generalJSON.Symbol }));

                    var theTicker = generalJSON.Symbol;

                    var hostChart = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A365%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22" + theTicker + "%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D";

                    request({uri: hostChart}).then(function (chartResponse) {

                      var chartJSON = JSON.parse(chartResponse);

                      returnJSON.chart = chartJSON;

                      console.log("returnJSON: " + JSON.stringify(returnJSON));

                      resolve(returnJSON);

                    });

                  } else {
                    resolve(null);
                  }

                });

              } else {

                resolve(null);

              }
            }
          });

        }
      });
    });
  }

  
}
