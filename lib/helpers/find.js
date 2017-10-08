function find(el) {
  if (el === null) {
    let message = `Element <unknown> exists`;
    this.pushResult({ message, result: false });
    return null;
  }

  if (typeof el === 'string') {
    el = this.rootElement.querySelector(el);
  }

  if (el === null) {
    let message = `Element ${this.target || '<unknown>'} exists`;
    this.pushResult({ message, result: false });
    return null;
  }

  if (!(el instanceof HTMLElement)) {
    throw new TypeError(`Unexpected Parameter: ${el}`)
  }

  return el;
}

module.exports = find;
