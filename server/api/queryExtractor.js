let masterStockHash = require('./master_stock_hash.json');
let stopWords = require('./stopwords.json');
let punctuation = require('./punctuation.json');

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

  extractSymbols(inputString = this.getQuestionWithoutPunctuation()) {
    
    return inputString
      .toUpperCase()
      .split(" ")
      .filter( (word) => {
        return masterStockHash[word] != undefined;
      }).map((word) => {
        return {
          marketName: masterStockHash[word],
          ticker: word
        };
      });
  }

  getCompany(ticker) {

    var spawn = require('child_process').spawn;
    var entityPython = spawn('python', ['entity_extractor.py']);

    var dataString;

    entityPython.stdout.on('data', function(data){
      dataString = data.toString();
    });

    entityPython.stdout.on('end', function(){

      console.log('String returned by python file =',dataString);



    });


    entityPython.stdin.write(JSON.stringify(this.question));
    entityPython.stdin.end();

  }
}
