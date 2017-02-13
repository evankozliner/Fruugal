module.exports = class Answer {
  constructor(question) {
    this.rawQuestion = question;
  }

  deferToUnknownAnswer() {
    return
  }
}

