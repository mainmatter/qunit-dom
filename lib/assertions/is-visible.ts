import visible from '../helpers/visible';

export default function isVisible(options, message) {
  if (typeof options === 'string') {
    message = options;
    options = undefined;
  }

  let elements = this.findElements(this.target).filter(visible);

  let expectedCount = options ? options.count : null;

  if (expectedCount === null) {
    let result = elements.length > 0;
    let expected = format(this.target);
    let actual = result ? expected : format(this.target, 0);

    if (!message) {
      message = expected;
    }

    this.pushResult({ result, actual, expected, message });
  } else if (typeof expectedCount === 'number') {
    let result = elements.length === expectedCount;
    let actual = format(this.target, elements.length);
    let expected = format(this.target, expectedCount);

    if (!message) {
      message = expected;
    }

    this.pushResult({ result, actual, expected, message });
  } else {
    throw new TypeError(`Unexpected Parameter: ${expectedCount}`);
  }
}

function format(selector: string, num?: number) {
  if (num === undefined || num === null) {
    return `Element ${selector} is visible`;
  } else if (num === 0) {
    return `Element ${selector} is not visible`;
  } else if (num === 1) {
    return `Element ${selector} is visible once`;
  } else if (num === 2) {
    return `Element ${selector} is visible twice`;
  } else {
    return `Element ${selector} is visible ${num} times`;
  }
}
