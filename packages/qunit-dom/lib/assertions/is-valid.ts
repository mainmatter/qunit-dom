import elementToString from '../helpers/element-to-string.js';

export default function isValid(message?: string, options: { inverted?: boolean } = {}) {
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

  let validity = element.reportValidity() === true;
  let result = validity === !options.inverted;
  let actual = validity ? 'valid' : 'not valid';
  let expected = options.inverted ? 'not valid' : 'valid';

  if (!message) {
    message = `Element ${elementToString(this.target)} is ${actual}`;
  }

  this.pushResult({ result, actual, expected, message });
}
