function textContains(regex, message) {
  let element = this.findTargetElement();
  if (!element) return;

  let result = regex.test(element.textContent);
  let actual = element.textContent;
  let expected = regex;

  if (!message) {
    message = `Element ${this.targetDescription} matches ${regex}`;
  }

  this.pushResult({ result, actual, expected, message });
}

module.exports = textContains;
