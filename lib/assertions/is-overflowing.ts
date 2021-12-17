import elementToString from '../helpers/element-to-string';

export default function isOverflowing(message?: string) {
  let element = this.findTargetElement();
  if (!element) return;

  const elementString = elementToString(this.target);
  const result = element.scrollWidth > element.clientWidth;

  if (!message) {
    message = `Element ${elementString} is overflowing`;
  }

  const actual = `${elementString} has width ${element.clientWidth} and scrollWidth ${element.scrollWidth}`;
  const expected = `${elementString} has scrollWidth greater than ${element.clientWidth}`;

  this.pushResult({ result, actual, expected, message });
}
