import elementToString from '../helpers/element-to-string';

export default function notChecked(message) {
  let element = this.findTargetElement();
  if (!element) return;

  let result = element.checked === false;
  let actual = element.checked === true ? 'checked' : 'not checked';
  let expected = 'not checked';

  if (!message) {
    message = `Element ${elementToString(this.target)} is not checked`;
  }

  this.pushResult({ result, actual, expected, message });
}
