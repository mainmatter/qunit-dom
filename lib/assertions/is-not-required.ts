import elementToString from '../helpers/element-to-string';

export default function notRequired(message?: string, options?: { withAriaSupport?: boolean }) {
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

  let result = element.required === false;

  if (withAriaSupport && result) {
    let ariaRequired = element.getAttribute('aria-required');
    if (ariaRequired !== null) {
      result = ariaRequired === 'false';
    }
  }

  let actual = !result ? 'required' : 'not required';
  let expected = 'not required';

  if (!message) {
    message = `Element ${elementToString(this.target)} is not required`;
  }

  this.pushResult({ result, actual, expected, message });
}
