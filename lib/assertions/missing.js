const exists = require('./exists');

function missing(selector, message) {
  return exists.call(this, selector, { count: 0 }, message);
}

module.exports = missing;
