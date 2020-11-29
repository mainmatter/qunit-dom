import visible from '../helpers/visible.js';
import type { ExistsOptions } from '../assertions.js';

export default function isVisible(options?: string | ExistsOptions, message?: string) {
  let expectedCount: number | null = null;

  if (typeof options === 'string') {
    message = options;
  } else if (options) {
    expectedCount = options.count;
  }

  let elements = this.findElements().filter(visible);

  if (expectedCount === null) {
    let result = elements.length > 0;
    let expected = format(this.targetDescription);
    let actual = result ? expected : format(this.targetDescription, 0);

    if (!message) {
      message = expected;
    }

    this.pushResult({ result, actual, expected, message });
  } else if (typeof expectedCount === 'number') {
    let result = elements.length === expectedCount;
    let actual = format(this.targetDescription, elements.length);
    let expected = format(this.targetDescription, expectedCount);

    if (!message) {
      message = expected;
    }

    this.pushResult({ result, actual, expected, message });
  } else {
    throw new TypeError(`Unexpected Parameter: ${expectedCount}`);
  }
}

function format(selector: string, num?: number) {
  if (selector === '<unknown>') {
    selector = '<not found>';
  }

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
