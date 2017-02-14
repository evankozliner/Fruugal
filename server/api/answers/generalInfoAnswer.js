let Answer = require('./Answer.js');
let StockAnswer = require('./stockAnswer.js');
let DescriptionAnswer = require('./descriptionAnswer.js');

module.exports = class GeneralInfoAnswer extends Answer {
  // TODO seperate multipart answer logic into its own class
  constructor(question) {
    super(question);
    this.stockAnswer = new StockAnswer(this.rawQuestion);
    this.descriptionAnswer = new DescriptionAnswer(this.rawQuestion);
    this.answerComponents = [ this.stockAnswer.answer(), this.descriptionAnswer.answer() ];
  }

  answer() {
    return Promise.all(this.answerComponents)
      .then(answers => {
      return {
        answers: answers,
        classType: 'GeneralInfoAnswer'
      }
    });
  }
}
