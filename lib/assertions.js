import exists from './assertions/exists';
import focused from './assertions/focused';
import notFocused from './assertions/not-focused';
import isChecked from './assertions/is-checked';
import isNotChecked from './assertions/is-not-checked';
import isRequired from './assertions/is-required';
import isNotRequired from './assertions/is-not-required';
import isVisible from './assertions/is-visible';
import isNotVisible from './assertions/is-not-visible';
import isDisabled from './assertions/is-disabled';

import elementToString from './helpers/element-to-string';
import collapseWhitespace from './helpers/collapse-whitespace';

export default class DOMAssertions {
  constructor(target, rootElement, testContext) {
    this.target = target;
    this.rootElement = rootElement;
    this.testContext = testContext;
  }

  /**
   * Assert an [HTMLElement][] (or multiple) matching the `selector` exists.
   *
   * @name exists
   * @param {object?} options
   * @param {string?} message
   *
   * @example
   * assert.dom('#title').exists();
   * assert.dom('.choice').exists({ count: 4 });
   *
   * @see {@link #doesNotExist}
   */
  exists(options, message) {
    exists.call(this, options, message);
  }

  /**
   * Assert an [HTMLElement][] matching the `selector` does not exists.
   *
   * @name doesNotExist
   * @param {string?} message
   *
   * @example
   * assert.dom('.should-not-exist').doesNotExist();
   *
   * @see {@link #exists}
   */
  doesNotExist(message) {
    exists.call(this, { count: 0 }, message);
  }

  /**
   * Assert that the [HTMLElement][] or an [HTMLElement][] matching the
   * `selector` is currently checked.
   *
   * @name isChecked
   * @param {string?} message
   *
   * @example
   * assert.dom('input.active').isChecked();
   *
   * @see {@link #isNotChecked}
   */
  isChecked(message) {
    isChecked.call(this, message);
  }

  /**
   * Assert that the [HTMLElement][] or an [HTMLElement][] matching the
   * `selector` is currently unchecked.
   *
   * @name isNotChecked
   * @param {string?} message
   *
   * @example
   * assert.dom('input.active').isNotChecked();
   *
   * @see {@link #isChecked}
   */
  isNotChecked(message) {
    isNotChecked.call(this, message);
  }

  /**
   * Assert that the [HTMLElement][] or an [HTMLElement][] matching the
   * `selector` is currently focused.
   *
   * @name isFocused
   * @param {string?} message
   *
   * @example
   * assert.dom('input.email').isFocused();
   *
   * @see {@link #isNotFocused}
   */
  isFocused(message) {
    focused.call(this, message);
  }

  /**
   * Assert that the [HTMLElement][] or an [HTMLElement][] matching the
   * `selector` is not currently focused.
   *
   * @name isNotFocused
   * @param {string?} message
   *
   * @example
   * assert.dom('input[type="password"]').isNotFocused();
   *
   * @see {@link #isFocused}
   */
  isNotFocused(message) {
    notFocused.call(this, message);
  }

  /**
   * Assert that the [HTMLElement][] or an [HTMLElement][] matching the
   * `selector` is currently required.
   *
   * @name isRequired
   * @param {string?} message
   *
   * @example
   * assert.dom('input[type="text"]').isRequired();
   *
   * @see {@link #isNotRequired}
   */
  isRequired(message) {
    isRequired.call(this, message);
  }

  /**
   * Assert that the [HTMLElement][] or an [HTMLElement][] matching the
   * `selector` is currently not required.
   *
   * @name isNotRequired
   * @param {string?} message
   *
   * @example
   * assert.dom('input[type="text"]').isNotRequired();
   *
   * @see {@link #isRequired}
   */
  isNotRequired(message) {
    isNotRequired.call(this, message);
  }

  /**
   * Assert that the [HTMLElement][] or an [HTMLElement][] matching the
   * `selector` is visible. Visibility is determined with the heuristic
   * used in [jQuery's :visible pseudo-selector](https://github.com/jquery/jquery/blob/2d4f53416e5f74fa98e0c1d66b6f3c285a12f0ce/src/css/hiddenVisibleSelectors.js#L12),
   * specifically:
   *
   * - the element's offsetWidth is non-zero
   * - the element's offsetHeight is non-zero
   * - the length of an element's DOMRect objects found via getClientRects() is non-zero
   *
   * Additionally, visibility in this case means that the element is visible on the page,
   * but not necessarily in the viewport.
   *
   * @name isVisible
   * @param {string?} message
   *
   * @example
   * assert.dom('.foo').isVisible();
   *
   * @see {@link #isNotVisible}
   */
  isVisible(message) {
    isVisible.call(this, message);
  }

  /**
   * Assert that the [HTMLElement][] or an [HTMLElement][] matching the
   * `selector` is not visible on the page.
   *
   * Visibility is determined with the heuristic used in jQuery's
   * [`:visible`](https://github.com/jquery/jquery/blob/2d4f53416e5f74fa98e0c1d66b6f3c285a12f0ce/src/css/hiddenVisibleSelectors.js#L12)
   * pseudo-selector:
   *
   * - the element's offsetWidth is non-zero
   * - the element's offsetHeight is non-zero
   * - the length of an element's DOMRect objects found via getClientRects() is non-zero
   *
   * Additionally, visibility in this case means that the element is visible on the page,
   * but not necessarily in the viewport.
   *
   * @name isNotVisible
   * @param {string?} message
   *
   * @example
   * assert.dom('.foo').isNotVisible();
   *
   * @see {@link #isVisible}
   */
  isNotVisible(message) {
    isNotVisible.call(this, message);
  }

  /**
   * Assert that the [HTMLElement][] has an attribute with the provided `name`
   * and optionally checks if the attribute `value` matches the provided text
   * or regular expression.
   *
   * @name hasAttribute
   * @param {string} name
   * @param {string|RegExp|object?} value
   * @param {string?} message
   *
   * @example
   * assert.dom('input.password-input').hasAttribute('type', 'password');

   * @see {@link #doesNotHaveAttribute}
   */
  hasAttribute(name, value, message) {
    let element = this.findTargetElement();
    if (!element) return;

    if (arguments.length === 1) {
      value = { any: true };
    }

    let actualValue = element.getAttribute(name);

    if (value instanceof RegExp) {
      let result = value.test(actualValue);
      let expected = `Element ${this.targetDescription} has attribute "${name}" with value matching ${value}`;
      let actual = actualValue === null
        ? `Element ${this.targetDescription} does not have attribute "${name}"`
        : `Element ${this.targetDescription} has attribute "${name}" with value ${JSON.stringify(actualValue)}`;

      if (!message) {
        message = expected;
      }

      this.pushResult({ result, actual, expected, message });

    } else if (value.any === true) {
      let result = actualValue !== null;
      let expected = `Element ${this.targetDescription} has attribute "${name}"`;
      let actual = result ? expected : `Element ${this.targetDescription} does not have attribute "${name}"`;

      if (!message) {
        message = expected;
      }

      this.pushResult({ result, actual, expected, message });

    } else {
      let result = value === actualValue;
      let expected = `Element ${this.targetDescription} has attribute "${name}" with value ${JSON.stringify(value)}`;
      let actual = actualValue === null
        ? `Element ${this.targetDescription} does not have attribute "${name}"`
        : `Element ${this.targetDescription} has attribute "${name}" with value ${JSON.stringify(actualValue)}`;

      if (!message) {
        message = expected;
      }

      this.pushResult({ result, actual, expected, message });
    }
  }

  /**
   * Assert that the [HTMLElement][] has no attribute with the provided `name`.
   *
   * **Aliases:** `hasNoAttribute`, `lacksAttribute`
   *
   * @name doesNotHaveAttribute
   * @param {string} name
   * @param {string?} message
   *
   * @example
   * assert.dom('input.username').hasNoAttribute('disabled');
   *
   * @see {@link #hasAttribute}
   */
  doesNotHaveAttribute(name, message) {
    let element = this.findTargetElement();
    if (!element) return;

    let result = !element.hasAttribute(name);
    let expected = `Element ${this.targetDescription} does not have attribute "${name}"`;
    let actual = expected;

    if (!result) {
      let value = element.getAttribute(name);
      actual = `Element ${this.targetDescription} has attribute "${name}" with value ${JSON.stringify(value)}`;
    }

    if (!message) {
      message = expected;
    }

    this.pushResult({ result, actual, expected, message });
  }

  hasNoAttribute(name, message) {
    this.doesNotHaveAttribute(name, message);
  }

  lacksAttribute(name, message) {
    this.doesNotHaveAttribute(name, message);
  }

  /**
   *  Assert that the [HTMLElement][] or an [HTMLElement][] matching the
   * `selector` is disabled.
   *
   * @name isDisabled
   * @param {string?} message
   *
   * @example
   * assert.dom('.foo').isDisabled();
   *
   * @see {@link #isNotDisabled}
   */
  isDisabled(message) {
    isDisabled.call(this, message);
  }

  /**
   *  Assert that the [HTMLElement][] or an [HTMLElement][] matching the
   * `selector` is not disabled.
   *
   * @name isNotDisabled
   * @param {string?} message
   *
   * @example
   * assert.dom('.foo').isNotDisabled();
   *
   * @see {@link #isDisabled}
   */
  isNotDisabled(message) {
    isDisabled.call(this, message, { inverted: true });
  }

  /**
   * Assert that the [HTMLElement][] has the `expected` CSS class using
   * [`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList).
   *
   * @name hasClass
   * @param {string} expected
   * @param {string?} message
   *
   * @example
   * assert.dom('input[type="password"]').hasClass('secret-password-input');
   *
   * @see {@link #doesNotHaveClass}
   */
  hasClass(expected, message) {
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
   * Assert that the [HTMLElement][] does not have the `expected` CSS class using
   * [`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList).
   *
   * **Aliases:** `hasNoClass`, `lacksClass`
   *
   * @name doesNotHaveClass
   * @param {string} expected
   * @param {string?} message
   *
   * @example
   * assert.dom('input[type="password"]').doesNotHaveClass('username-input');
   *
   * @see {@link #hasClass}
   */
  doesNotHaveClass(expected, message) {
    let element = this.findTargetElement();
    if (!element) return;

    let result = !element.classList.contains(expected);
    let actual = element.classList.toString();

    if (!message) {
      message = `Element ${this.targetDescription} does not have CSS class "${expected}"`;
    }

    this.pushResult({ result, actual, expected: `not: ${expected}`, message });
  }

  hasNoClass(expected, message) {
    this.doesNotHaveClass(expected, message);
  }

  lacksClass(expected, message) {
    this.doesNotHaveClass(expected, message);
  }

  /**
   * Assert that the text of the [HTMLElement][] or an [HTMLElement][]
   * matching the `selector` matches the `expected` text, using the
   * [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
   * attribute and stripping/collapsing whitespace.
   *
   * `expected` can also be a regular expression.
   *
   * **Aliases:** `matchesText`
   *
   * @name hasText
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
  hasText(expected, message) {
    let element = this.findTargetElement();
    if (!element) return;

    if (expected instanceof RegExp) {
      let result = expected.test(element.textContent);
      let actual = element.textContent;

      if (!message) {
        message = `Element ${this.targetDescription} has text matching ${expected}`;
      }

      this.pushResult({ result, actual, expected, message });
    } else if (expected.any === true) {
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
      throw new TypeError(`You must pass a string or Regular Expression to "hasText". You passed ${expected}.`);
    }
  }

  matchesText(expected, message) {
    this.hasText(expected, message);
  }

  /**
   * Assert that the `textContent` property of an [HTMLElement][] is not empty.
   *
   * @name hasAnyText
   * @param {string?} message
   *
   * @example
   * assert.dom('button.share').hasAnyText();
   *
   * @see {@link #hasText}
   */
  hasAnyText(message) {
    this.hasText({ any: true }, message);
  }

  /**
   * Assert that the text of the [HTMLElement][] or an [HTMLElement][]
   * matching the `selector` contains the given `text`, using the
   * [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
   * attribute.
   *
   * **Aliases:** `containsText`, `hasTextContaining`
   *
   * @name includesText
   * @param {string} text
   * @param {string?} message
   *
   * @example
   * assert.dom('#title').includesText('Welcome');
   *
   * @see {@link #hasText}
   */
  includesText(text, message) {
    let element = this.findTargetElement();
    if (!element) return;

    let result = element.textContent.indexOf(text) !== -1;
    let actual = element.textContent;
    let expected = text;

    if (!message) {
      message = `Element ${this.targetDescription} has text containing "${text}"`;
    }

    this.pushResult({ result, actual, expected, message });
  }

  containsText(expected, message) {
    this.includesText(expected, message);
  }

  hasTextContaining(expected, message) {
    this.includesText(expected, message);
  }

  /**
   * Assert that the text of the [HTMLElement][] or an [HTMLElement][]
   * matching the `selector` does not include the given `text`, using the
   * [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
   * attribute.
   *
   * **Aliases:** `doesNotContainText`, `doesNotHaveTextContaining`
   *
   * @name doesNotIncludeText
   * @param {string} text
   * @param {string?} message
   *
   * @example
   * assert.dom('#title').doesNotIncludeText('Welcome');
   */
  doesNotIncludeText(text, message) {
    let element = this.findTargetElement();
    if (!element) return;

    let result = element.textContent.indexOf(text) === -1;
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

  doesNotContainText(unexpected, message) {
    this.doesNotIncludeText(unexpected, message);
  }

  doesNotHaveTextContaining(unexpected, message) {
    this.doesNotIncludeText(unexpected, message);
  }

  /**
   * Assert that the `value` property of an [HTMLInputElement][] matches
   * the `expected` text or regular expression.
   *
   * If no `expected` value is provided, the assertion will fail if the
   * `value` is an empty string.
   *
   * @name hasValue
   * @param {string|RegExp|object?} expected
   * @param {string?} message
   *
   * @example
   * assert.dom('input.username').hasValue('HSimpson');

   * @see {@link #hasAnyValue}
   * @see {@link #hasNoValue}
   */
  hasValue(expected, message) {
    let element = this.findTargetElement();
    if (!element) return;

    if (arguments.length === 0) {
      expected = { any: true };
    }

    if (expected instanceof RegExp) {
      let result = expected.test(element.value);
      let actual = element.value;

      if (!message) {
        message = `Element ${this.targetDescription} has value matching ${expected}`;
      }

      this.pushResult({ result, actual, expected, message });

    } else if (expected.any === true) {
      let result = Boolean(element.value);

      let expected = `Element ${this.targetDescription} has a value`;
      let actual = result ? expected : `Element ${this.targetDescription} has no value`;

      if (!message) {
        message = expected;
      }

      this.pushResult({ result, actual, expected, message });

    } else {
      let actual = element.value;
      let result = actual === expected;

      if (!message) {
        message = `Element ${this.targetDescription} has value "${expected}"`;
      }

      this.pushResult({ result, actual, expected, message });
    }
  }

  /**
   * Assert that the `value` property of an [HTMLInputElement][] is not empty.
   *
   * @name hasAnyValue
   * @param {string?} message
   *
   * @example
   * assert.dom('input.username').hasAnyValue();
   *
   * @see {@link #hasValue}
   * @see {@link #hasNoValue}
   */
  hasAnyValue(message) {
    this.hasValue({ any: true }, message);
  }

  /**
   * Assert that the `value` property of an [HTMLInputElement][] is empty.
   *
   * **Aliases:** `lacksValue`
   *
   * @name hasNoValue
   * @param {string?} message
   *
   * @example
   * assert.dom('input.username').hasNoValue();
   *
   * @see {@link #hasValue}
   * @see {@link #hasAnyValue}
   */
  hasNoValue(message) {
    this.hasValue('', message);
  }

  lacksValue(message) {
    this.hasNoValue(message);
  }

  /**
   * @private
   */
  pushResult(result) {
    this.testContext.pushResult(result);
  }

  /**
   * @private
   */
  findTargetElement() {
    if (this.target === null) {
      let message = `Element <unknown> exists`;
      this.pushResult({ message, result: false });
      return null;
    }

    if (typeof this.target === 'string') {
      let el = this.rootElement.querySelector(this.target);

      if (el === null) {
        let message = `Element ${this.target || '<unknown>'} exists`;
        this.pushResult({ message, result: false });
      }

      return el;

    } else if (this.target instanceof Element) {
      return this.target;

    } else {
      throw new TypeError(`Unexpected Parameter: ${this.target}`)
    }
  }

  /**
   * @private
   */
  get targetDescription() {
    return elementToString(this.target);
  }
}
