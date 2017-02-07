let Answer = require('./Answer.js');

module.exports = class GeneralInfoAnswer extends Answer {
  answer() {
    return this.rawQuestion;
  }
}
