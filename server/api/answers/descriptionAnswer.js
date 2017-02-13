let Answer = require('./Answer.js');
var request = require('request-promise');
let QueryExtractor = require('../queryExtractor.js');

module.exports = class DescriptionAnswer extends Answer {
  constructor(question) {
    super(question);
    this.host = "api.intrinio.com";
    this.hostPath = "/companies?ticker=";
  }

  buildBasicAuth() {
    return "Basic " + new Buffer(process.env.INTRINO_USERNAME + ":" 
      + process.env.INTRINO_PASSWORD).toString("base64");
  }

  descriptionAnswer(extractedSymbol) {
    return new Promise((res, rej) => {
      request({
        uri: "https://" +this.host + this.hostPath + extractedSymbol,
        headers: {Authorization: this.buildBasicAuth()}
      }).then( (response) => {
        res({
          data: JSON.parse(response),
          classType: 'DescriptionClass'
        });
      });
    });
  }

  answer() {
    // TODO this logic is a repeat of stockAnswer
    let extractedData = (new QueryExtractor(this.rawQuestion)).extractSymbols()[0];
    if (extractedData === undefined) {  
      return (new QuestionUnknownAnswer(this.rawQuestion)).answer();
    };
    console.log(extractedData)
    return this.descriptionAnswer(extractedData.ticker)
  }
}
