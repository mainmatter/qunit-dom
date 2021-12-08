export default function required(message?: string) {
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

  let result = element.required === true;
  let actual = result ? 'required' : 'not required';
  let expected = 'required';

  if (!message) {
    message = `Element ${this.targetDescription} is required`;
  }

  this.pushResult({ result, actual, expected, message });
}
