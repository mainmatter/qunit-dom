const elementToString = require('../helpers/element-to-string');

function textContains(text, message) {
  let element = this.findTargetElement();
  if (!element) return;

  let result = element.textContent.indexOf(text) !== -1;
  let actual = element.textContent;
  let expected = text;

  if (!message) {
    message = `Element ${elementToString(this.target)} contains "${text}"`;
  }

  this.pushResult({ result, actual, expected, message });
}

module.exports = textContains;
