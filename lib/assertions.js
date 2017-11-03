import exists from './assertions/exists';
import focused from './assertions/focused';
import notFocused from './assertions/not-focused';

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
   * `selector` is currently focused.
   *
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
   * Assert that the [HTMLElement][] has an attribute with the provided `name`
   * and optionally checks if the attribute `value` matches the provided text
   * or regular expression.
   *
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
   * Assert that the [HTMLElement][] has the `expected` CSS class using
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

    } else {
      expected = collapseWhitespace(expected);
      let actual = collapseWhitespace(element.textContent);
      let result = actual === expected;

      if (!message) {
        message = `Element ${this.targetDescription} has text "${expected}"`;
      }

      this.pushResult({ result, actual, expected, message });
    }
  }

  /**
   * Assert that the text of the [HTMLElement][] or an [HTMLElement][]
   * matching the `selector` contains the given `text`, using the
   * [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
   * attribute.
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
   * matching the `selector` does not contain the given `text`, using the
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
  doesNotIncludeText(text, message) {
    let element = this.findTargetElement();
    if (!element) return;

    let result = element.textContent.indexOf(text) === -1;
    let actual = element.textContent;
    let expected = text;

    if (!message) {
      message = `Element ${this.targetDescription} does not have text containing "${text}"`;
    }

    this.pushResult({ result, actual, expected, message });
  }

  doesNotContainText(expected, message) {
    this.doesNotIncludeText(expected, message);
  }

  doesNotHaveTextContaining(expected, message) {
    this.doesNotIncludeText(expected, message);
  }

  /**
   * Assert that the `value` property of an [HTMLInputElement][] matches
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

    } else if (this.target instanceof HTMLElement) {
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
