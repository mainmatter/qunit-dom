export default function isDisabled(
  message?: string,
  options: { inverted?: boolean; aliased?: boolean } = {}
) {
  const { inverted, aliased } = options,
    notDisabledPlaceholder = aliased ? 'enabled' : 'not disabled',
    element = this.findTargetElement();

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

  let actual =
    element.disabled === false
      ? `Element ${this.targetDescription} is ${notDisabledPlaceholder}`
      : `Element ${this.targetDescription} is disabled`;

  let expected = inverted
    ? `Element ${this.targetDescription} is ${notDisabledPlaceholder}`
    : `Element ${this.targetDescription} is disabled`;

  if (!message) {
    message = expected;
  }

  this.pushResult({ result, actual, expected, message });
}
