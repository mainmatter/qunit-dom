import elementToString from '../helpers/element-to-string.js';

export default function notRequired(message?: string) {
  let element = this.findTargetElement();
  if (!element) return;

  if (
    !(
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement
    )
  ) {
    throw new TypeError(`Unexpected Element Type: ${element.toString()}`);
  }

  let result = element.required === false;
  let actual = !result ? 'required' : 'not required';
  let expected = 'not required';

  if (!message) {
    message = `Element ${elementToString(this.target)} is not required`;
  }

  this.pushResult({ result, actual, expected, message });
}
