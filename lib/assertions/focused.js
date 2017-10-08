const find = require('../helpers/find');
const elementToString = require('../helpers/element-to-string');

function focused(el, message) {
  let element = find.call(this, el);
  if (!element) return;

  let result = document.activeElement === element;
  let actual = elementToString(document.activeElement);
  let expected = elementToString(el);

  if (!message) {
    message = `Element ${expected} is focused`;
  }

  this.pushResult({ result, actual, expected, message });
}

module.exports = focused;
