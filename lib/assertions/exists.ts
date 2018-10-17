export default function exists(options, message) {
  if (typeof this.target !== 'string') {
    throw new TypeError(`Unexpected Parameter: ${this.target}`)
  }

  if (typeof options === 'string') {
    message = options;
    options = undefined;
  }

  let elements = this.rootElement.querySelectorAll(this.target);

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

    this.pushResult({result, actual, expected, message});

  } else {
    throw new TypeError(`Unexpected Parameter: ${expectedCount}`)
  }
}

function format(selector: string, num?: number) {
  if (num === undefined || num === null) {
    return `Element ${selector} exists`;
  } else if (num === 0) {
    return `Element ${selector} does not exist`;
  } else if (num === 1) {
    return `Element ${selector} exists once`;
  } else if (num === 2) {
    return `Element ${selector} exists twice`;
  } else {
    return `Element ${selector} exists ${num} times`;
  }
}
