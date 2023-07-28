import elementToString from '../helpers/element-to-string';

export default function required(message?: string, options?: { withAriaSupport?: boolean }) {
  let {
    // @TODO: Remove inline default in favor of consistent global default.
    withAriaSupport = this.options.withAriaSupport ?? false,
  } = options;

  let element = this.findTargetElement();
  if (!element) return;

  if (
    !(
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement
    )
  ) {
    throw new TypeError(`Unexpected Element Type: ${element.toString()}`);
  }

  let result = element.required === true;

  if (withAriaSupport && !result) {
    let ariaRequired = element.getAttribute('aria-required');
    if (ariaRequired !== null) {
      result = ariaRequired === 'true';
    }
  }

  let actual = result ? 'required' : 'not required';
  let expected = 'required';

  if (!message) {
    message = `Element ${elementToString(this.target)} is required`;
  }

  this.pushResult({ result, actual, expected, message });
}
