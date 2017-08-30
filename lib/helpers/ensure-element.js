function ensureElement(el, selector) {
  if (el === null) {
    let message = `Element ${selector || '<unknown>'} exists`;
    this.pushResult({ message, result: false });
  }

  return el !== null;
}

module.exports = ensureElement;
