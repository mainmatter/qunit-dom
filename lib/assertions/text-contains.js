const elementToString = require('../helpers/element-to-string');

function textContains(el, text, message) {
  let element = (el instanceof HTMLElement) ? el : this.rootElement.querySelector(el);

  let result = element.textContent.indexOf(text) !== -1;
  let actual = element.textContent;
  let expected = text;

  if (!message) {
    message = `Element ${elementToString(el)} contains "${text}"`;
  }

  this.pushResult({ result, actual, expected, message });
}

module.exports = textContains;
