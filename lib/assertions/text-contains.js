const find = require('../helpers/find');
const elementToString = require('../helpers/element-to-string');

/**
 * Asserts if `text` is contained in the `textContent` property
 * of the passed in DOM element.
 *
 * @param {HTMLElement|string} el
 * @param {string} text
 * @param {string?} message
 */
function textContains(el, text, message) {
  let element = find.call(this, el);
  if (!element) return;

  let result = element.textContent.indexOf(text) !== -1;
  let actual = element.textContent;
  let expected = text;

  if (!message) {
    message = `Element ${elementToString(el)} contains "${text}"`;
  }

  this.pushResult({ result, actual, expected, message });
}

module.exports = textContains;
