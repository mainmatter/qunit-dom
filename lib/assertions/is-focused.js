const find = require('../helpers/find');
const elementToString = require('../helpers/element-to-string');

/**
 * Asserts that the passed in DOM element is currently focused.
 *
 * @param {HTMLElement|string} el
 * @param {string?} message
 */
function isFocused(el, message) {
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

module.exports = isFocused;
