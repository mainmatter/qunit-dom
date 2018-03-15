import elementToString from '../helpers/element-to-string';

export default function required(message) {
  let element = this.findTargetElement();
  if (!element) return;
debugger;
  let result = element.required === true;
  let actual = element.required === true ? 'required' : 'not required';
  let expected = 'required';

  if (!message) {
    message = `Element ${elementToString(this.target)} is required`;
  }

  this.pushResult({ result, actual, expected, message });
}