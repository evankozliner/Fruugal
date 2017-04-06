let Answer = require('./Answer.js');
var request = require('request-promise');
let QueryExtractor = require('../queryExtractor.js');
var QuestionUnknownAnswer = require('./questionUnknownAnswer.js');

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
        console.log("RES");
        console.log(response);
        res({
          data: JSON.parse(response),
          classType: 'DescriptionClass'
        });
      })
      .catch( reason => {
        console.log(reason);
        rej(reason);
      });
    });
  }

  answer() {
    return new Promise( (res, rej) => {
      let queryExtractor = new QueryExtractor(this.rawQuestion);
      //let extractedData = (new QueryExtractor(this.rawQuestion)).extractSymbols()[0];

      queryExtractor.getCompany().then( extractedData => {
        if (extractedData === undefined) {  
          console.log("Stock answer is undefined");
          return (new QuestionUnknownAnswer(this.rawQuestion)).answer();
        };
        res(this.descriptionAnswer(extractedData.ticker));
      })
      .catch(function(reason) { console.log(reason); rej(reason); });

      //if (extractedData === undefined) {
      //  return (new QuestionUnknownAnswer(this.rawQuestion)).answer();
      //};
    });
    //return this.descriptionAnswer(extractedData.ticker)
  }
}
