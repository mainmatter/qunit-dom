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
    message = `Element ${this.targetDescription} is not required`;
  }

  this.pushResult({ result, actual, expected, message });
}
