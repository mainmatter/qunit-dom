import elementToString from '../helpers/element-to-string';

export default function isValid(
  message?: string,
  options: { inverted?: boolean; withAriaSupport?: boolean } = {}
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
      element instanceof HTMLFormElement ||
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLButtonElement ||
      element instanceof HTMLOutputElement ||
      element instanceof HTMLSelectElement
    )
  ) {
    throw new TypeError(`Unexpected Element Type: ${element.toString()}`);
  }

  let validity = element.reportValidity() === true;
  let result = validity === !inverted;

  // https://www.w3.org/TR/wai-aria-1.1/#aria-invalid
  if (withAriaSupport && result) {
    let ariaInvalid = element.getAttribute('aria-invalid');
    if (ariaInvalid !== null) {
      if (inverted) {
        result = ['grammar', 'spelling', 'true'].includes(ariaInvalid);
      } else {
        result = ariaInvalid === 'false';
      }
    }
  }

  let actual = validity ? 'valid' : 'not valid';
  let expected = inverted ? 'not valid' : 'valid';

  if (!message) {
    message = `Element ${elementToString(this.target)} is ${actual}`;
  }

  this.pushResult({ result, actual, expected, message });
}
