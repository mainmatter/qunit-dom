const exists = require('./exists');

/**
 * Asserts that the passed in DOM element does not exist.
 *
 * @param {string} selector
 * @param {string?} message
 */
function missing(selector, message) {
  return exists.call(this, selector, { count: 0 }, message);
}

module.exports = missing;
