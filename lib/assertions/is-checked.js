import elementToString from '../helpers/element-to-string';

export default function checked(message) {
  let element = this.findTargetElement();
  if (!element) return;

  let result = element.checked === true;
  let actual = element.checked === true ? 'checked' : 'not checked';
  let expected = 'checked';

  if (!message) {
    message = `Element ${elementToString(this.target)} is checked`;
  }

  this.pushResult({ result, actual, expected, message });
}
