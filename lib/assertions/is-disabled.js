export default function isDisabled(message) {
  let element = this.findTargetElement();
  if (!element) return;

  let expected = `Element ${this.targetDescription} is disabled`;
  let actual = `Element ${this.targetDescription} is disabled`;
  let result = element.disabled;

  if (result === false) {
    actual = `Element ${this.targetDescription} is not disabled`;
  } else if(result === undefined) {
    actual = `Element ${this.targetDescription} does not support disabled`;
    result = false;
  }

  if (!message) {
    message = expected;
  }

  this.pushResult({ result, actual, expected, message });
}
