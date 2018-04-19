export default function isDisabled(message) {
  let element = this.findTargetElement();
  if (!element) return;

  if (!(
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLButtonElement ||
      element instanceof HTMLOptGroupElement ||
      element instanceof HTMLOptionElement ||
      element instanceof HTMLFieldSetElement
    )) {
    throw new TypeError(`Unexpected Element Type: ${element.toString()}`);
  }

  let expected = `Element ${this.targetDescription} is disabled`;
  let actual = `Element ${this.targetDescription} is disabled`;
  let result = element.disabled;

  if (result === false) {
    actual = `Element ${this.targetDescription} is not disabled`;
  }

  if (!message) {
    message = expected;
  }

  this.pushResult({ result, actual, expected, message });
}
