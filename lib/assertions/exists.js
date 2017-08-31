/**
 * Asserts that the passed in DOM element exists.
 *
 * @param {string} selector
 * @param {object?} options
 * @param {string?} message
 */
function exists(selector, options, message) {
  if (typeof selector !== 'string') {
    throw new TypeError(`Unexpected Parameter: ${selector}`)
  }

  if (typeof options === 'string') {
    message = options;
    options = undefined;
  }

  let elements = this.rootElement.querySelectorAll(selector);

  let expectedCount = options ? options.count : null;

  if (expectedCount === null) {
    let result = elements.length > 0;
    let expected = format(selector);
    let actual = result ? expected : format(selector, 0);

    if (!message) {
      message = expected;
    }

    this.pushResult({ result, actual, expected, message });

  } else if (typeof expectedCount === 'number') {
    let result = elements.length === expectedCount;
    let actual = format(selector, elements.length);
    let expected = format(selector, expectedCount);

    if (!message) {
      message = expected;
    }

    this.pushResult({result, actual, expected, message});

  } else {
    throw new TypeError(`Unexpected Parameter: ${expectedCount}`)
  }
}

function format(selector, num) {
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

module.exports = exists;
