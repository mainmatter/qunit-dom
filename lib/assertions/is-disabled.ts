export default function isDisabled(
  message?: string,
  options?: { inverted?: boolean; withAriaSupport?: boolean }
) {
  let {
    inverted,

    // @TODO: Remove inline default in favor of consistent global default.
    withAriaSupport = this.options.withAriaSupport ?? false,
  } = options;

  let element = this.findTargetElement();
  if (!element) return;

  if (
    !(
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLButtonElement ||
      element instanceof HTMLOptGroupElement ||
      element instanceof HTMLOptionElement ||
      element instanceof HTMLFieldSetElement
    )
  ) {
    throw new TypeError(`Unexpected Element Type: ${element.toString()}`);
  }

  let result = element.disabled === !inverted;

  if (withAriaSupport && !result) {
    let ariaDisabled = element.getAttribute('aria-disabled');
    if (ariaDisabled !== null) {
      result = ariaDisabled === 'true';
    }
  }

  let actual =
    element.disabled === false
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
