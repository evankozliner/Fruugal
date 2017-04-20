let Answer = require('./Answer.js');
let DescriptionAnswer = require('./descriptionAnswer.js');
var QuestionUnknownAnswer = require('./questionUnknownAnswer.js');

module.exports = class FundamentalsAnswer extends Answer {
  // basically just reuses description answer but calls it stock answer so the front end knows
  // what to do
  constructor(question) {
    super(question);
    this.descriptionAnswer = new DescriptionAnswer(this.rawQuestion);
    this.answerComponents = [  this.descriptionAnswer.answer() ];
  }

  answer() {
    return Promise.all(this.answerComponents)
      .then(answers => {
      return {
        answers: answers,
        classType: 'FundamentalsAnswer'
      }
    }).catch( (reason) => {
      console.log("General info failure");
      return (new QuestionUnknownAnswer(this.rawQuestion)).answer();
    });
  }
}
