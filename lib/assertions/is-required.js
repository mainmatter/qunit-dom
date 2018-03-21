import elementToString from '../helpers/element-to-string';

export default function required(message) {
  let element = this.findTargetElement();
  if (!element) return;

  if (!(
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLSelectElement
  )) {
    throw new TypeError(`Unexpected Element Type: ${element.toString()}`);
  }

  let result = element.required === true;
  let actual = result ? 'required' : 'not required';
  let expected = 'required';

  if (!message) {
    message = `Element ${elementToString(this.target)} is required`;
  }

  this.pushResult({ result, actual, expected, message });
}