import exists from './assertions/exists';
import focused from './assertions/focused';
import notFocused from './assertions/not-focused';
import isChecked from './assertions/is-checked';
import isNotChecked from './assertions/is-not-checked';
import isRequired from './assertions/is-required';
import isNotRequired from './assertions/is-not-required';
import isVisible from './assertions/is-visible';
import isDisabled from './assertions/is-disabled';
import matchesSelector from './assertions/matches-selector';
import elementToString from './helpers/element-to-string';
import collapseWhitespace from './helpers/collapse-whitespace';
import { toArray } from './helpers/node-list';

export default class DOMAssertions {
  constructor(
    private target: string | Element | null,
    private rootElement: Element,
    private testContext: Assert
  ) {}

  /**
   * Assert an {@link HTMLElement} (or multiple) matching the `selector` exists.
   *
   * @param {string?} message
   *
   * @example
   * assert.dom('#title').exists();
   *
   * @see {@link #doesNotExist}
   */
  exists(message?: string): void;

  /**
   * Assert an {@link HTMLElement} (or multiple) matching the `selector` exists.
   *
   * @param {object?} options
   * @param {number?} options.count
   * @param {string?} message
   *
   * @example
   * assert.dom('.choice').exists({ count: 4 });
   *
   * @see {@link #doesNotExist}
   */
  exists(options: { count: number }, message?: string): void;

  /**
   * Assert an {@link HTMLElement} (or multiple) matching the `selector` exists.
   *
   * @param {object?} options
   * @param {number?} options.count
   * @param {string?} message
   *
   * @example
   * assert.dom('#title').exists();
   * assert.dom('.choice').exists({ count: 4 });
   *
   * @see {@link #doesNotExist}
   */
  exists(options: { count: number } | string, message?: string): void {
    exists.call(this, options, message);
  }

  /**
   * Assert an {@link HTMLElement} matching the `selector` does not exists.
   *
   * @param {string?} message
   *
   * @example
   * assert.dom('.should-not-exist').doesNotExist();
   *
   * @see {@link #exists}
   */
  doesNotExist(message?: string): void {
    exists.call(this, { count: 0 }, message);
  }

  /**
   * Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
   * `selector` is currently checked.
   *
   * @param {string?} message
   *
   * @example
   * assert.dom('input.active').isChecked();
   *
   * @see {@link #isNotChecked}
   */
  isChecked(message?: string): void {
    isChecked.call(this, message);
  }

  /**
   * Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
   * `selector` is currently unchecked.
   *
   * @param {string?} message
   *
   * @example
   * assert.dom('input.active').isNotChecked();
   *
   * @see {@link #isChecked}
   */
  isNotChecked(message?: string): void {
    isNotChecked.call(this, message);
  }

  /**
   * Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
   * `selector` is currently focused.
   *
   * @param {string?} message
   *
   * @example
   * assert.dom('input.email').isFocused();
   *
   * @see {@link #isNotFocused}
   */
  isFocused(message?: string): void {
    focused.call(this, message);
  }

  /**
   * Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
   * `selector` is not currently focused.
   *
   * @param {string?} message
   *
   * @example
   * assert.dom('input[type="password"]').isNotFocused();
   *
   * @see {@link #isFocused}
   */
  isNotFocused(message?: string): void {
    notFocused.call(this, message);
  }

  /**
   * Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
   * `selector` is currently required.
   *
   * @param {string?} message
   *
   * @example
   * assert.dom('input[type="text"]').isRequired();
   *
   * @see {@link #isNotRequired}
   */
  isRequired(message?: string): void {
    isRequired.call(this, message);
  }

  /**
   * Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
   * `selector` is currently not required.
   *
   * @param {string?} message
   *
   * @example
   * assert.dom('input[type="text"]').isNotRequired();
   *
   * @see {@link #isRequired}
   */
  isNotRequired(message?: string): void {
    isNotRequired.call(this, message);
  }

  /**
   * Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
   * `selector` exists and is visible.
   *
   * Visibility is determined by asserting that:
   *
   * - the element's offsetWidth and offsetHeight are non-zero
   * - any of the element's DOMRect objects have a non-zero size
   *
   * Additionally, visibility in this case means that the element is visible on the page,
   * but not necessarily in the viewport.
   *
   * @param {string?} message
   *
   * @example
   * assert.dom('.foo').isVisible();
   *
   * @see {@link #isNotVisible}
   */
  isVisible(message?: string): void;

  /**
   * Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
   * `selector` exists and is visible.
   *
   * Visibility is determined by asserting that:
   *
   * - the element's offsetWidth and offsetHeight are non-zero
   * - any of the element's DOMRect objects have a non-zero size
   *
   * Additionally, visibility in this case means that the element is visible on the page,
   * but not necessarily in the viewport.
   *
   * @param {object?} options
   * @param {number?} options.count
   * @param {string?} message
   *
   * @example
   * assert.dom('.choice').isVisible({ count: 4 });
   *
   * @see {@link #isNotVisible}
   */
  isVisible(options: { count: number }, message?: string): void;

  /**
   * Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
   * `selector` exists and is visible.
   *
   * Visibility is determined by asserting that:
   *
   * - the element's offsetWidth and offsetHeight are non-zero
   * - any of the element's DOMRect objects have a non-zero size
   *
   * Additionally, visibility in this case means that the element is visible on the page,
   * but not necessarily in the viewport.
   *
   * @param {object?} options
   * @param {number?} options.count
   * @param {string?} message
   *
   * @example
   * assert.dom('#title').isVisible();
   * assert.dom('.choice').isVisible({ count: 4 });
   *
   * @see {@link #isNotVisible}
   */
  isVisible(options: { count: number } | string, message?: string): void {
    isVisible.call(this, options, message);
  }

  /**
   * Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
   * `selector` does not exist or is not visible on the page.
   *
   * Visibility is determined by asserting that:
   *
   * - the element's offsetWidth or offsetHeight are zero
   * - all of the element's DOMRect objects have a size of zero
   *
   * Additionally, visibility in this case means that the element is visible on the page,
   * but not necessarily in the viewport.
   *
   * @param {string?} message
   *
   * @example
   * assert.dom('.foo').isNotVisible();
   *
   * @see {@link #isVisible}
   */
  isNotVisible(message?: string): void {
    isVisible.call(this, { count: 0 }, message);
  }

  /**
   * Assert that the {@link HTMLElement} has an attribute with the provided `name`.
   *
   * @param {string} name
   *
   * @example
   * assert.dom('input.password-input').hasAttribute('disabled');
   *
   * @see {@link #doesNotHaveAttribute}
   */
  hasAttribute(name: string): void;

  /**
   * Assert that the {@link HTMLElement} has an attribute with the provided `name`
   * and checks if the attribute `value` matches the provided text or regular
   * expression.
   *
   * @param {string} name
   * @param {string|RegExp|object} value
   * @param {string?} message
   *
   * @example
   * assert.dom('input.password-input').hasAttribute('type', 'password');
   *
   * @see {@link #doesNotHaveAttribute}
   */
  hasAttribute(name: string, value: string | RegExp | { any: true }, message?: string): void;

  /**
   * Assert that the {@link HTMLElement} has an attribute with the provided `name`
   * and optionally checks if the attribute `value` matches the provided text
   * or regular expression.
   *
   * @param {string} name
   * @param {string|RegExp|object?} value
   * @param {string?} message
   *
   * @example
   * assert.dom('input.password-input').hasAttribute('type', 'password');
   *
   * @see {@link #doesNotHaveAttribute}
   */
  hasAttribute(name: string, value?: string | RegExp | { any: true }, message?: string): void {
    let element = this.findTargetElement();
    if (!element) return;

    if (arguments.length === 1) {
      value = { any: true };
    }

    let actualValue = element.getAttribute(name);

    if (value instanceof RegExp) {
      let result = value.test(actualValue);
      let expected = `Element ${
        this.targetDescription
      } has attribute "${name}" with value matching ${value}`;
      let actual =
        actualValue === null
          ? `Element ${this.targetDescription} does not have attribute "${name}"`
          : `Element ${this.targetDescription} has attribute "${name}" with value ${JSON.stringify(
              actualValue
            )}`;

      if (!message) {
        message = expected;
      }

      this.pushResult({ result, actual, expected, message });
    } else if ((value as { any: true }).any === true) {
      let result = actualValue !== null;
      let expected = `Element ${this.targetDescription} has attribute "${name}"`;
      let actual = result
        ? expected
        : `Element ${this.targetDescription} does not have attribute "${name}"`;

      if (!message) {
        message = expected;
      }

      this.pushResult({ result, actual, expected, message });
    } else {
      let result = value === actualValue;
      let expected = `Element ${
        this.targetDescription
      } has attribute "${name}" with value ${JSON.stringify(value)}`;
      let actual =
        actualValue === null
          ? `Element ${this.targetDescription} does not have attribute "${name}"`
          : `Element ${this.targetDescription} has attribute "${name}" with value ${JSON.stringify(
              actualValue
            )}`;

      if (!message) {
        message = expected;
      }

      this.pushResult({ result, actual, expected, message });
    }
  }

  /**
   * Assert that the {@link HTMLElement} has no attribute with the provided `name`.
   *
   * **Aliases:** `hasNoAttribute`, `lacksAttribute`
   *
   * @param {string} name
   * @param {string?} message
   *
   * @example
   * assert.dom('input.username').hasNoAttribute('disabled');
   *
   * @see {@link #hasAttribute}
   */
  doesNotHaveAttribute(name: string, message?: string): void {
    let element = this.findTargetElement();
    if (!element) return;

    let result = !element.hasAttribute(name);
    let expected = `Element ${this.targetDescription} does not have attribute "${name}"`;
    let actual = expected;

    if (!result) {
      let value = element.getAttribute(name);
      actual = `Element ${
        this.targetDescription
      } has attribute "${name}" with value ${JSON.stringify(value)}`;
    }

    if (!message) {
      message = expected;
    }

    this.pushResult({ result, actual, expected, message });
  }

  hasNoAttribute(name: string, message?: string): void {
    this.doesNotHaveAttribute(name, message);
  }

  lacksAttribute(name: string, message?: string): void {
    this.doesNotHaveAttribute(name, message);
  }

  /**
   *  Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
   * `selector` is disabled.
   *
   * @param {string?} message
   *
   * @example
   * assert.dom('.foo').isDisabled();
   *
   * @see {@link #isNotDisabled}
   */
  isDisabled(message?: string): void {
    isDisabled.call(this, message);
  }

  /**
   *  Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
   * `selector` is not disabled.
   *
   * @param {string?} message
   *
   * @example
   * assert.dom('.foo').isNotDisabled();
   *
   * @see {@link #isDisabled}
   */
  isNotDisabled(message?: string): void {
    isDisabled.call(this, message, { inverted: true });
  }

  /**
   * Assert that the {@link HTMLElement} has the `expected` CSS class using
   * [`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList).
   *
   * @param {string} expected
   * @param {string?} message
   *
   * @example
   * assert.dom('input[type="password"]').hasClass('secret-password-input');
   *
   * @see {@link #doesNotHaveClass}
   */
  hasClass(expected: string, message?: string): void {
    let element = this.findTargetElement();
    if (!element) return;

    let actual = element.classList.toString();
    let result = element.classList.contains(expected);

    if (!message) {
      message = `Element ${this.targetDescription} has CSS class "${expected}"`;
    }

    this.pushResult({ result, actual, expected, message });
  }

  /**
   * Assert that the {@link HTMLElement} does not have the `expected` CSS class using
   * [`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList).
   *
   * **Aliases:** `hasNoClass`, `lacksClass`
   *
   * @param {string} expected
   * @param {string?} message
   *
   * @example
   * assert.dom('input[type="password"]').doesNotHaveClass('username-input');
   *
   * @see {@link #hasClass}
   */
  doesNotHaveClass(expected: string, message?: string): void {
    let element = this.findTargetElement();
    if (!element) return;

    let result = !element.classList.contains(expected);
    let actual = element.classList.toString();

    if (!message) {
      message = `Element ${this.targetDescription} does not have CSS class "${expected}"`;
    }

    this.pushResult({ result, actual, expected: `not: ${expected}`, message });
  }

  hasNoClass(expected: string, message?: string): void {
    this.doesNotHaveClass(expected, message);
  }

  lacksClass(expected: string, message?: string): void {
    this.doesNotHaveClass(expected, message);
  }

  /**
   * Assert that the [HTMLElement][] has the `expected` style declarations using
   * [`window.getComputedStyle`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).
   *
   * @name hasStyle
   * @param {object} expected
   * @param {string?} message
   *
   * @example
   * assert.dom('.progress-bar').hasStyle({
   *   opacity: 1,
   *   display: 'block'
   * });
   *
   * @see {@link #hasClass}
   */
  hasStyle(expected: object, message?: string): void {
    this.hasPseudoElementStyle(null, expected, message);
  }

  hasPseudoElementStyle(selector: string, expected: object, message?: string): void;

  /**
   * Assert that the pseudo element for `selector` of the [HTMLElement][] has the `expected` style declarations using
   * [`window.getComputedStyle`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).
   *
   * @name hasPseudoElementStyle
   * @param {string} selector
   * @param {object} expected
   * @param {string?} message
   *
   * @example
   * assert.dom('.progress-bar').hasPseudoElementStyle(':after', {
   *   content: '";"',
   * });
   *
   * @see {@link #hasClass}
   */
  hasPseudoElementStyle(selector: string | null, expected: object, message?: string): void {
    let element = this.findTargetElement();
    if (!element) return;
    let computedStyle = window.getComputedStyle(element, selector);
    let expectedProperties = Object.keys(expected);
    let result = expectedProperties.every(
      property => computedStyle[property] === expected[property]
    );
    let actual = {};
    expectedProperties.forEach(property => (actual[property] = computedStyle[property]));
    if (!message) {
      let normalizedSelector = selector ? selector.replace(/^:{0,2}/, '::') : '';
      message = `Element ${this.targetDescription}${normalizedSelector} has style "${JSON.stringify(
        expected
      )}"`;
    }
    this.pushResult({ result, actual, expected, message });
  }

  /**
   * Assert that the text of the {@link HTMLElement} or an {@link HTMLElement}
   * matching the `selector` matches the `expected` text, using the
   * [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
   * attribute and stripping/collapsing whitespace.
   *
   * `expected` can also be a regular expression.
   *
   * > Note: This assertion will collapse whitespace if the type you pass in is a string.
   * > If you are testing specifically for whitespace integrity, pass your expected text
   * > in as a RegEx pattern.
   *
   * **Aliases:** `matchesText`
   *
   * @param {string|RegExp} expected
   * @param {string?} message
   *
   * @example
   * // <h2 id="title">
   * //   Welcome to <b>QUnit</b>
   * // </h2>
   *
   * assert.dom('#title').hasText('Welcome to QUnit');
   *
   * @example
   * assert.dom('.foo').hasText(/[12]\d{3}/);
   *
   * @see {@link #includesText}
   */
  hasText(expected: string | RegExp | { any: true }, message?: string): void {
    let element = this.findTargetElement();
    if (!element) return;

    if (expected instanceof RegExp) {
      let result = expected.test(element.textContent);
      let actual = element.textContent;

      if (!message) {
        message = `Element ${this.targetDescription} has text matching ${expected}`;
      }

      this.pushResult({ result, actual, expected, message });
    } else if ((expected as { any: true }).any === true) {
      let result = Boolean(element.textContent);

      let expected = `Element ${this.targetDescription} has a text`;
      let actual = result ? expected : `Element ${this.targetDescription} has no text`;

      if (!message) {
        message = expected;
      }

      this.pushResult({ result, actual, expected, message });
    } else if (typeof expected === 'string') {
      expected = collapseWhitespace(expected);
      let actual = collapseWhitespace(element.textContent);
      let result = actual === expected;

      if (!message) {
        message = `Element ${this.targetDescription} has text "${expected}"`;
      }

      this.pushResult({ result, actual, expected, message });
    } else {
      throw new TypeError(
        `You must pass a string or Regular Expression to "hasText". You passed ${expected}.`
      );
    }
  }

  matchesText(expected: string | RegExp | { any: true }, message?: string): void {
    this.hasText(expected, message);
  }

  /**
   * Assert that the `textContent` property of an {@link HTMLElement} is not empty.
   *
   * @param {string?} message
   *
   * @example
   * assert.dom('button.share').hasAnyText();
   *
   * @see {@link #hasText}
   */
  hasAnyText(message?: string): void {
    this.hasText({ any: true }, message);
  }

  /**
   * Assert that the text of the {@link HTMLElement} or an {@link HTMLElement}
   * matching the `selector` contains the given `text`, using the
   * [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
   * attribute.
   *
   * > Note: This assertion will collapse whitespace in `textContent` before searching.
   * > If you would like to assert on a string that *should* contain line breaks, tabs,
   * > more than one space in a row, or starting/ending whitespace, use the {@link #hasText}
   * > selector and pass your expected text in as a RegEx pattern.
   *
   * **Aliases:** `containsText`, `hasTextContaining`
   *
   * @param {string} text
   * @param {string?} message
   *
   * @example
   * assert.dom('#title').includesText('Welcome');
   *
   * @see {@link #hasText}
   */
  includesText(text: string, message?: string): void {
    let element = this.findTargetElement();
    if (!element) return;

    let collapsedText = collapseWhitespace(element.textContent);
    let result = collapsedText.indexOf(text) !== -1;
    let actual = collapsedText;
    let expected = text;

    if (!message) {
      message = `Element ${this.targetDescription} has text containing "${text}"`;
    }

    if (!result && text !== collapseWhitespace(text)) {
      console.warn(
        'The `.includesText()`, `.containsText()`, and `.hasTextContaining()` assertions collapse whitespace. The text you are checking for contains whitespace that may have made your test fail incorrectly. Try the `.hasText()` assertion passing in your expected text as a RegExp pattern. Your text:\n' +
          text
      );
    }

    this.pushResult({ result, actual, expected, message });
  }

  containsText(expected: string, message?: string): void {
    this.includesText(expected, message);
  }

  hasTextContaining(expected: string, message?: string): void {
    this.includesText(expected, message);
  }

  /**
   * Assert that the text of the {@link HTMLElement} or an {@link HTMLElement}
   * matching the `selector` does not include the given `text`, using the
   * [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
   * attribute.
   *
   * **Aliases:** `doesNotContainText`, `doesNotHaveTextContaining`
   *
   * @param {string} text
   * @param {string?} message
   *
   * @example
   * assert.dom('#title').doesNotIncludeText('Welcome');
   */
  doesNotIncludeText(text: string, message?: string): void {
    let element = this.findTargetElement();
    if (!element) return;

    let collapsedText = collapseWhitespace(element.textContent);
    let result = collapsedText.indexOf(text) === -1;
    let expected = `Element ${this.targetDescription} does not include text "${text}"`;
    let actual = expected;

    if (!result) {
      actual = `Element ${this.targetDescription} includes text "${text}"`;
    }

    if (!message) {
      message = expected;
    }

    this.pushResult({ result, actual, expected, message });
  }

  doesNotContainText(unexpected: string, message?: string): void {
    this.doesNotIncludeText(unexpected, message);
  }

  doesNotHaveTextContaining(unexpected: string, message?: string): void {
    this.doesNotIncludeText(unexpected, message);
  }

  /**
   * Assert that the `value` property of an {@link HTMLInputElement} matches
   * the `expected` text or regular expression.
   *
   * If no `expected` value is provided, the assertion will fail if the
   * `value` is an empty string.
   *
   * @param {string|RegExp|object?} expected
   * @param {string?} message
   *
   * @example
   * assert.dom('input.username').hasValue('HSimpson');

   * @see {@link #hasAnyValue}
   * @see {@link #hasNoValue}
   */
  hasValue(expected: string | RegExp | { any: true }, message?: string) {
    let element = this.findTargetElement();
    if (!element) return;

    if (arguments.length === 0) {
      expected = { any: true };
    }

    let value = (element as HTMLInputElement).value;

    if (expected instanceof RegExp) {
      let result = expected.test(value);
      let actual = value;

      if (!message) {
        message = `Element ${this.targetDescription} has value matching ${expected}`;
      }

      this.pushResult({ result, actual, expected, message });
    } else if ((expected as { any: true }).any === true) {
      let result = Boolean(value);

      let expected = `Element ${this.targetDescription} has a value`;
      let actual = result ? expected : `Element ${this.targetDescription} has no value`;

      if (!message) {
        message = expected;
      }

      this.pushResult({ result, actual, expected, message });
    } else {
      let actual = value;
      let result = actual === expected;

      if (!message) {
        message = `Element ${this.targetDescription} has value "${expected}"`;
      }

      this.pushResult({ result, actual, expected, message });
    }
  }

  /**
   * Assert that the `value` property of an {@link HTMLInputElement} is not empty.
   *
   * @param {string?} message
   *
   * @example
   * assert.dom('input.username').hasAnyValue();
   *
   * @see {@link #hasValue}
   * @see {@link #hasNoValue}
   */
  hasAnyValue(message?: string): void {
    this.hasValue({ any: true }, message);
  }

  /**
   * Assert that the `value` property of an {@link HTMLInputElement} is empty.
   *
   * **Aliases:** `lacksValue`
   *
   * @param {string?} message
   *
   * @example
   * assert.dom('input.username').hasNoValue();
   *
   * @see {@link #hasValue}
   * @see {@link #hasAnyValue}
   */
  hasNoValue(message?: string): void {
    this.hasValue('', message);
  }

  lacksValue(message?: string): void {
    this.hasNoValue(message);
  }

  /**
   * Assert that the target selector selects only Elements that are also selected by
   * compareSelector.
   *
   * @param {string} compareSelector
   * @param {string?} message
   *
   * @example
   * assert.dom('p.red').matchesSelector('div.wrapper p:last-child')
   */
  matchesSelector(compareSelector: string, message?: string) {
    let targetElements = this.target instanceof Element ? [this.target] : this.findElements();
    let targets = targetElements.length;
    let matchFailures = matchesSelector(targetElements, compareSelector);
    let singleElement: boolean = targets === 1;
    let selectedByPart = this.target instanceof Element ? 'passed' : `selected by ${this.target}`;
    let actual;
    let expected;

    if (matchFailures === 0) {
      // no failures matching.
      if (!message) {
        message = singleElement
          ? `The element ${selectedByPart} also matches the selector ${compareSelector}.`
          : `${targets} elements, selected by ${
              this.target
            }, also match the selector ${compareSelector}.`;
      }
      actual = expected = message;
      this.pushResult({ result: true, actual, expected, message });
    } else {
      let difference = targets - matchFailures;
      // there were failures when matching.
      if (!message) {
        message = singleElement
          ? `The element ${selectedByPart} did not also match the selector ${compareSelector}.`
          : `${matchFailures} out of ${targets} elements selected by ${
              this.target
            } did not also match the selector ${compareSelector}.`;
      }
      actual = singleElement ? message : `${difference} elements matched ${compareSelector}.`;
      expected = singleElement
        ? `The element should have matched ${compareSelector}.`
        : `${targets} elements should have matched ${compareSelector}.`;
      this.pushResult({ result: false, actual, expected, message });
    }
  }

  /**
   * Assert that the target selector selects only Elements that are not also selected by
   * compareSelector.
   *
   * @param {string} compareSelector
   * @param {string?} message
   *
   * @example
   * assert.dom('input').doesNotMatchSelector('input[disabled]')
   */
  doesNotMatchSelector(compareSelector: string, message?: string) {
    let targetElements = this.target instanceof Element ? [this.target] : this.findElements();
    let targets = targetElements.length;
    let matchFailures = matchesSelector(targetElements, compareSelector);
    let singleElement: boolean = targets === 1;
    let selectedByPart = this.target instanceof Element ? 'passed' : `selected by ${this.target}`;
    let actual;
    let expected;
    if (matchFailures === targets) {
      // the assertion is successful because no element matched the other selector.
      if (!message) {
        message = singleElement
          ? `The element ${selectedByPart} did not also match the selector ${compareSelector}.`
          : `${targets} elements, selected by ${
              this.target
            }, did not also match the selector ${compareSelector}.`;
      }
      actual = expected = message;
      this.pushResult({ result: true, actual, expected, message });
    } else {
      let difference = targets - matchFailures;
      // the assertion fails because at least one element matched the other selector.
      if (!message) {
        message = singleElement
          ? `The element ${selectedByPart} must not also match the selector ${compareSelector}.`
          : `${difference} elements out of ${targets}, selected by ${
              this.target
            }, must not also match the selector ${compareSelector}.`;
      }
      actual = singleElement
        ? `The element ${selectedByPart} matched ${compareSelector}.`
        : `${matchFailures} elements did not match ${compareSelector}.`;
      expected = singleElement
        ? message
        : `${targets} elements should not have matched ${compareSelector}.`;
      this.pushResult({ result: false, actual, expected, message });
    }
  }

  /**
   * @private
   */
  private pushResult(result) {
    this.testContext.pushResult(result);
  }

  /**
   * Finds a valid HTMLElement from target, or pushes a failing assertion if a valid
   * element is not found.
   * @private
   * @returns (HTMLElement|null) a valid HTMLElement, or null
   */
  private findTargetElement(): Element | null {
    let el = this.findElement();

    if (el === null) {
      let message = `Element ${this.target || '<unknown>'} should exist`;
      this.pushResult({ message, result: false });
      return null;
    }

    return el;
  }

  /**
   * Finds a valid HTMLElement from target
   * @private
   * @returns (HTMLElement|null) a valid HTMLElement, or null
   * @throws TypeError will be thrown if target is an unrecognized type
   */
  private findElement(): Element | null {
    if (this.target === null) {
      return null;
    } else if (typeof this.target === 'string') {
      return this.rootElement.querySelector(this.target);
    } else if (this.target instanceof Element) {
      return this.target;
    } else {
      throw new TypeError(`Unexpected Parameter: ${this.target}`);
    }
  }

  /**
   * Finds a collection of HTMLElement instances from target using querySelectorAll
   * @private
   * @returns (HTMLElement[]) an array of HTMLElement instances
   * @throws TypeError will be thrown if target is an unrecognized type
   */
  private findElements(): HTMLElement[] {
    if (this.target === null) {
      return [];
    } else if (typeof this.target === 'string') {
      return toArray(this.rootElement.querySelectorAll(this.target));
    } else {
      throw new TypeError(`Unexpected Parameter: ${this.target}`);
    }
  }

  /**
   * @private
   */
  private get targetDescription() {
    return elementToString(this.target);
  }
}
