function checkAriaDisabled(element) {
  let ariaDisabled = element.attributes['aria-disabled'];
  if(ariaDisabled) {
    return ariaDisabled.value === 'true' ? true : false;
  }
  return null;
}

export default function isDisabled(message, options: { inverted?: boolean } = {}) {
  let { inverted } = options;

  let element = this.findTargetElement();
  if (!element) return;

  let state = null;
  if (!(
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLButtonElement ||
      element instanceof HTMLOptGroupElement ||
      element instanceof HTMLOptionElement ||
      element instanceof HTMLFieldSetElement
    )) {
      state = checkAriaDisabled(element);
      if(state === null) {
        throw new TypeError(`Generic Element Type: ${element.toString()} does not use aria-disabled attribute`);
      }
  } else {
    state = element.disabled;
  }

  let result = state === !inverted;

  let actual = state === false
    ? `Element ${this.targetDescription} is not disabled`
    : `Element ${this.targetDescription} is disabled`;

  let expected = inverted
    ? `Element ${this.targetDescription} is not disabled`
    : `Element ${this.targetDescription} is disabled`;

  if (!message) {
    message = expected;
  }

  this.pushResult({ result, actual, expected, message });
}
