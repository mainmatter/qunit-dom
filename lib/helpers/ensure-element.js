function ensureElement(el) {
  if (el === null) {
    let message = `Element ${this.target || '<unknown>'} exists`;
    this.pushResult({ message, result: false });
  }

  return el !== null;
}

module.exports = ensureElement;
