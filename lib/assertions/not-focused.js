const elementToString = require('../helpers/element-to-string');

function notFocused(message) {
  let element = this.findTargetElement();
  if (!element) return;

  let result = document.activeElement !== element;

  if (!message) {
    message = `Element ${elementToString(this.target)} is not focused`;
  }

  this.pushResult({ result, message });
}

module.exports = notFocused;
