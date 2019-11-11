import elementToString from '../helpers/element-to-string';

export default function checked(message) {
  let element = this.findTargetElement();
  if (!element) return;

  let isChecked = element.checked === true;
  let isNotChecked = element.checked === false;

  let result = isChecked;

  let hasCheckedProp = isChecked || isNotChecked;
  if (!hasCheckedProp) {
    let ariaChecked = element.getAttribute('aria-checked');
    if (ariaChecked !== null) {
      result = ariaChecked === 'true';
    }
  }

  let actual = result ? 'checked' : 'not checked';
  let expected = 'checked';

  if (!message) {
    message = `Element ${elementToString(this.target)} is checked`;
  }

  this.pushResult({ result, actual, expected, message });
}
