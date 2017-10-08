const find = require('../helpers/find');
const elementToString = require('../helpers/element-to-string');

function textContains(el, regex, message) {
  let element = find.call(this, el);
  if (!element) return;

  let result = regex.test(element.textContent);
  let actual = element.textContent;
  let expected = regex;

  if (!message) {
    message = `Element ${elementToString(el)} matches ${regex}`;
  }

  this.pushResult({ result, actual, expected, message });
}

module.exports = textContains;
