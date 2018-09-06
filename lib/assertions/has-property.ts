export default function hasProperty(property, value, message) {
  let element = this.findTargetElement();
  if (!element) return;

  if (arguments.length === 1) {
    value = { any: true };
  }

  let actualValue = element[property];

  if (arguments.length === 1) {
    const result = element.hasOwnProperty(property);
    const expected = `Element ${this.targetDescription} has property "${property}"`;
    const actual = result
      ? expected
      : `Element ${this.targetDescription} does not have property "${property}"`;
    message = message || expected;

    this.pushResult({ result, actual, expected, message });
  } else if (value instanceof RegExp) {
    let result = value.test(actualValue);
    let expected = `Element ${this.targetDescription} has property "${property}" with value matching ${value}`;
    let actual = actualValue === undefined
      ? `Element ${this.targetDescription} does not have property "${property}"`
      : `Element ${this.targetDescription} has property "${property}" with value ${JSON.stringify(actualValue)}`;

    if (!message) {
      message = expected;
    }

    this.pushResult({ result, actual, expected, message });

  } else if ((value as { any: true }).any === true) {
    let result = actualValue !== undefined;
    let expected = `Element ${this.targetDescription} has property "${property}"`;
    let actual = result ? expected : `Element ${this.targetDescription} does not have property "${property}"`;

    if (!message) {
      message = expected;
    }

    this.pushResult({ result, actual, expected, message });

  } else {
    let result = value === actualValue;
    let expected = `Element ${this.targetDescription} has property "${property}" with value ${JSON.stringify(value)}`;
    let actual = actualValue === undefined
      ? `Element ${this.targetDescription} does not have property "${property}"`
      : `Element ${this.targetDescription} has property "${property}" with value ${JSON.stringify(actualValue)}`;

    if (!message) {
      message = expected;
    }

    this.pushResult({ result, actual, expected, message });
  }
}