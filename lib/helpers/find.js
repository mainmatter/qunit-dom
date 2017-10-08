const ensureElement = require('./ensure-element');

function _find(el) {
  if (typeof el === 'string') {
    return this.rootElement.querySelector(el);
  } else if (el instanceof HTMLElement) {
    return el;
  } else {
    throw new TypeError(`Unexpected Parameter: ${el}`)
  }
}

function find(el) {
  if (!ensureElement.call(this, el)) {
    return null;
  }

  el = _find.call(this, el);

  if (!ensureElement.call(this, el)) {
    return null;
  }

  return el;
}

module.exports = find;
