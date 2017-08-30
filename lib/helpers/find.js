module.exports = function find(el) {
  if (typeof el === 'string') {
    return this.rootElement.querySelector(el);
  } else if (el instanceof HTMLElement) {
    return el;
  } else {
    throw new TypeError(`Unexpected Parameter: ${el}`)
  }
};
