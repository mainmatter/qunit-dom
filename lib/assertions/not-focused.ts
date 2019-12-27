export default function notFocused(message: string) {
  let element = this.findTargetElement();
  if (!element) return;

  let result = document.activeElement !== element;

  if (!message) {
    message = `Element ${this.targetDescription} is not focused`;
  }

  this.pushResult({ result, message });
}
