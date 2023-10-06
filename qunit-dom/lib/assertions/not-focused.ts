export default function notFocused(message?: string) {
  let element = this.findTargetElement();
  if (!element) return;

  let result = document.activeElement !== element;
  let expected = `Element ${this.targetDescription} is not focused`;
  let actual = result ? expected : `Element ${this.targetDescription} is focused`;

  if (!message) {
    message = expected;
  }

  this.pushResult({ result, message, actual, expected });
}
