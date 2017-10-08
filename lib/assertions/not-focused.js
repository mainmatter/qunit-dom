const find = require('../helpers/find');
const elementToString = require('../helpers/element-to-string');

function notFocused(el, message) {
  let element = find.call(this, el);
  if (!element) return;

  let result = document.activeElement !== element;

  if (!message) {
    message = `Element ${elementToString(el)} is not focused`;
  }

  this.pushResult({ result, message });
}

module.exports = notFocused;
