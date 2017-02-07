let Answer = require('./Answer.js');

module.exports = class QuestionUnknownAnswer extends Answer {
  answer() {
    return `I don't know how to answer the question: ${this.rawQuestion}`
  }
}
