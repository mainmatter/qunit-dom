export default function hasProperty(property, options: { value?: any, message?: string } = {}) {
  let { value, message } = options;
  let element = this.findTargetElement();
  if (!element) return;

  const actualValue = element[property];
  const propertyExists = typeof actualValue !== 'undefined';

  if (typeof value === 'undefined') {
    const result = propertyExists;
    const expected = `Element ${this.targetDescription} has property "${property}"`;
    const actual = result
      ? expected
      : `Element ${this.targetDescription} does not have property "${property}"`;
    message = message || expected;

    this.pushResult({ result, actual, expected, message });
  } else {
    const result = propertyExists && actualValue === value;
    const expected = `Element ${this.targetDescription} has property "${property}" with value ${JSON.stringify(value)}`;
    let actual;
    if (!propertyExists) {
      actual = `Element ${this.targetDescription} does not have property "${property}"`;
    } else {
      actual = `Element ${this.targetDescription} has property "${property}" with value ${JSON.stringify(actualValue)}`;
    }
    message = message || expected;

    this.pushResult({ result, actual, expected, message });
  }
}