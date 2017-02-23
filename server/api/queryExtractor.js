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

  extractSymbols() {
    return this.getQuestionWithoutPunctuation()
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
}
