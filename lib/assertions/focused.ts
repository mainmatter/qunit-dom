import elementToString from '../helpers/element-to-string';

export default function focused(message?: string) {
  let element = this.findTargetElement();
  if (!element) return;

  let result = document.activeElement === element;
  let actual = elementToString(document.activeElement);
  let expected = this.targetDescription;

  if (!message) {
    message = `Element ${expected} is focused`;
  }

  this.pushResult({ result, actual, expected, message });
}
