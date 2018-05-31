import visible from '../helpers/visible';

export default function isNotVisible(message) {
  let element = this.findElement();

  let result = !visible(element);
  let actual = result
    ? `Element ${this.target} is not visible`
    : `Element ${this.target} is visible`;
  let expected = `Element ${this.target} is not visible`;

  if (!message) {
    message = expected;
  }

  this.pushResult({ result, actual, expected, message });
}