import elementToString from '../helpers/element-to-string';

export default function isValid(message?: string) {
  let element = this.findTargetElement();
  if (!element) return;

  if (
    !(
      element instanceof HTMLFormElement ||
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLButtonElement ||
      element instanceof HTMLOutputElement ||
      element instanceof HTMLSelectElement
    )
  ) {
    throw new TypeError(`Unexpected Element Type: ${element.toString()}`);
  }

  let result = element.reportValidity() === true;
  let actual = result ? 'valid' : 'not valid';
  let expected = 'valid';

  if (!message) {
    message = `Element ${elementToString(this.target)} is ${actual}`;
  }

  this.pushResult({ result, actual, expected, message });
}
