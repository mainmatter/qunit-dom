import visible from '../helpers/visible';

export default function isVisible(message) {
  let element = this.findElement();

  let result = visible(element);
  let actual = result
    ? `Element ${this.target} is visible`
    : `Element ${this.target} is not visible`;
  let expected = `Element ${this.target} is visible`;

  if (!message) {
    message = expected;
  }

  this.pushResult({ result, actual, expected, message });
}
