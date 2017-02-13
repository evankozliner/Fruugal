let Answer = require('./Answer.js');

module.exports = class GeneralInfoAnswer extends Answer {
  answer() {
    return new Promise((res, rej) => {
      res({
        classType: 'GeneralInfoClass'
      });
    });
  }
}
