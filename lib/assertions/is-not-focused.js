const find = require('../helpers/find');
const elementToString = require('../helpers/element-to-string');

/**
 * Asserts that the passed in DOM element is currently *not* focused.
 *
 * @param {HTMLElement|string} el
 * @param {string?} message
 */
function isNotFocused(el, message) {
  let element = find.call(this, el);
  if (!element) return;

  let result = document.activeElement !== element;

  if (!message) {
    message = `Element ${elementToString(el)} is not focused`;
  }

  this.pushResult({ result, message });
}

module.exports = isNotFocused;
