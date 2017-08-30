const elementToString = require('../helpers/element-to-string');

function textContains(el, text, message) {
  let result = el.textContent.indexOf(text) !== -1;
  let actual = el.textContent;
  let expected = text;

  if (!message) {
    message = `Element ${elementToString(el)} contains "${text}"`;
  }

  this.pushResult({ result, actual, expected, message });
}

module.exports = textContains;
