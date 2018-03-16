import elementToString from '../helpers/element-to-string';

export default function notRequired(message) {
  let element = this.findTargetElement();
  if (!element) return;

  let result = element.required === false;
  let actual = element.required === true ? 'required' : 'not required';
  let expected = 'not required';

  if (!message) {
    message = `Element ${elementToString(this.target)} is not required`;
  }

  this.pushResult({ result, actual, expected, message });
}
