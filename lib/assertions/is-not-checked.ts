import elementToString from '../helpers/element-to-string';

export default function notChecked(message?: string, options?: { withAriaSupport?: boolean }) {
  let {
    // @TODO: Remove inline default in favor of consistent global default.
    withAriaSupport = this.options.withAriaSupport ?? true,
  } = options;

  let element = this.findTargetElement();
  if (!element) return;

  let isChecked = element.checked === true;
  let isNotChecked = element.checked === false;

  let result = !isChecked;

  let hasCheckedProp = isChecked || isNotChecked;
  if (withAriaSupport && !hasCheckedProp) {
    let ariaChecked = element.getAttribute('aria-checked');
    if (ariaChecked !== null) {
      result = ariaChecked !== 'true';
    }
  }

  let actual = result ? 'not checked' : 'checked';
  let expected = 'not checked';

  if (!message) {
    message = `Element ${elementToString(this.target)} is not checked`;
  }

  this.pushResult({ result, actual, expected, message });
}
