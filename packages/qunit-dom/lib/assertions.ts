import exists from './assertions/exists.js';
import focused from './assertions/focused.js';
import notFocused from './assertions/not-focused.js';
import isChecked from './assertions/is-checked.js';
import isNotChecked from './assertions/is-not-checked.js';
import isRequired from './assertions/is-required.js';
import isNotRequired from './assertions/is-not-required.js';
import isValid from './assertions/is-valid.js';
import isVisible from './assertions/is-visible.js';
import isDisabled from './assertions/is-disabled.js';
import matchesSelector from './assertions/matches-selector.js';
import collapseWhitespace from './helpers/collapse-whitespace.js';
import {
  type IDOMElementDescriptor,
  resolveDOMElement,
  resolveDOMElements,
  resolveDescription,
} from 'dom-element-descriptors';
import createDescriptor from './descriptor';

export interface AssertionResult {
  result: boolean;
  actual: any;
  expected: any;
  message: string;
}

export interface ExistsOptions {
  count: number;
}

type CSSStyleDeclarationProperty = keyof CSSStyleDeclaration;

type ActualCSSStyleDeclaration = Partial<Record<CSSStyleDeclarationProperty, unknown>>;

/**
 * @namespace
 */
export default class DOMAssertions {
  /**
   * @ignore
   * The target of our assertions
   */
  private descriptor: IDOMElementDescriptor;

  /**
   * @ignore
   * Whether we were constructed with an element, rather than a selector or
   * descriptor. Used to make error messages more helpful.
   */
  private wasPassedElement: boolean;

  /**
   * @hideconstructor
   */
  constructor(
    target: string | Element | null | IDOMElementDescriptor,
    rootElement: RootElement,
    private testContext: Assert
  ) {
    this.descriptor = createDescriptor(target, rootElement);
    this.wasPassedElement = target instanceof Element;
  }

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
  exists(message?: string): DOMAssertions;

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
  exists(options: ExistsOptions, message?: string): DOMAssertions;

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
  exists(
    ...options: [options: ExistsOptions, message?: string] | [message?: string]
  ): DOMAssertions {
    exists.call(this, ...options);
    return this;
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
  doesNotExist(message?: string): DOMAssertions {
    exists.call(this, { count: 0 }, message);
    return this;
  }

  /**
   * Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
   * `selector` is currently checked.
   *
   * Note: This also supports `aria-checked="true/false"`.
   *
   * @param {string?} message
   *
   * @example
   * assert.dom('input.active').isChecked();
   *
   * @see {@link #isNotChecked}
   */
  isChecked(message?: string): DOMAssertions {
    isChecked.call(this, message);
    return this;
  }

  /**
   * Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
   * `selector` is currently unchecked.
   *
   * Note: This also supports `aria-checked="true/false"`.
   *
   * @param {string?} message
   *
   * @example
   * assert.dom('input.active').isNotChecked();
   *
   * @see {@link #isChecked}
   */
  isNotChecked(message?: string): DOMAssertions {
    isNotChecked.call(this, message);
    return this;
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
  isFocused(message?: string): DOMAssertions {
    focused.call(this, message);
    return this;
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
  isNotFocused(message?: string): DOMAssertions {
    notFocused.call(this, message);
    return this;
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
  isRequired(message?: string): DOMAssertions {
    isRequired.call(this, message);
    return this;
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
  isNotRequired(message?: string): DOMAssertions {
    isNotRequired.call(this, message);
    return this;
  }

  /**
   * Assert that the {@link HTMLElement} passes validation
   *
   * Validity is determined by asserting that:
   *
   * - `element.reportValidity() === true`
   *
   * @param {string?} message
   *
   * @example
   * assert.dom('.input').isValid();
   *
   * @see {@link #isValid}
   */
  isValid(message?: string): DOMAssertions {
    isValid.call(this, message);
    return this;
  }

  /**
   * Assert that the {@link HTMLElement} does not pass validation
   *
   * Validity is determined by asserting that:
   *
   * - `element.reportValidity() === true`
   *
   * @param {string?} message
   *
   * @example
   * assert.dom('.input').isNotValid();
   *
   * @see {@link #isValid}
   */
  isNotValid(message?: string): DOMAssertions {
    isValid.call(this, message, { inverted: true });
    return this;
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
  isVisible(message?: string): DOMAssertions;

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
  isVisible(options: ExistsOptions, message?: string): DOMAssertions;

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
  isVisible(
    ...options: [options: ExistsOptions, message?: string] | [message?: string]
  ): DOMAssertions {
    isVisible.call(this, ...options);
    return this;
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
  isNotVisible(message?: string): DOMAssertions {
    isVisible.call(this, { count: 0 }, message);
    return this;
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
  hasAttribute(name: string): DOMAssertions;

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
  hasAttribute(
    name: string,
    value: string | RegExp | { any: true },
    message?: string
  ): DOMAssertions;

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
  hasAttribute(
    name: string,
    value?: string | RegExp | { any: true },
    message?: string
  ): DOMAssertions {
    let element = this.findTargetElement();
    if (!element) return this;

    if (arguments.length === 1) {
      value = { any: true };
    }

    let actualValue = element.getAttribute(name);

    if (value instanceof RegExp) {
      let result = typeof actualValue === 'string' && value.test(actualValue);
      let expected = `Element ${this.targetDescription} has attribute "${name}" with value matching ${value}`;
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

    return this;
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
   * assert.dom('input.username').doesNotHaveAttribute('disabled');
   *
   * @see {@link #hasAttribute}
   */
  doesNotHaveAttribute(name: string, message?: string): DOMAssertions {
    let element = this.findTargetElement();
    if (!element) return this;

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
    return this;
  }

  hasNoAttribute(name: string, message?: string): DOMAssertions {
    return this.doesNotHaveAttribute(name, message);
  }

  lacksAttribute(name: string, message?: string): DOMAssertions {
    return this.doesNotHaveAttribute(name, message);
  }

  /**
   * Assert that the {@link HTMLElement} has an ARIA attribute with the provided
   * `name`.
   *
   * @param {string} name
   *
   * @example
   * assert.dom('button').hasAria('pressed');
   *
   * @see {@link #doesNotHaveAria}
   */
  hasAria(name: string): DOMAssertions;

  /**
   * Assert that the {@link HTMLElement} has an ARIA attribute with the provided
   * `name` and checks if the attribute `value` matches the provided text or
   * regular expression.
   *
   * @param {string} name
   * @param {string|RegExp|object} value
   * @param {string?} message
   *
   * @example
   * assert.dom('button').hasAria('pressed', 'true');
   *
   * @see {@link #doesNotHaveAttribute}
   */
  hasAria(name: string, value: string | RegExp | { any: true }, message?: string): DOMAssertions;

  /**
   * Assert that the {@link HTMLElement} has an ARIA attribute with the provided
   * `name` and optionally checks if the attribute `value` matches the provided
   * text or regular expression.
   *
   * @param {string} name
   * @param {string|RegExp|object?} value
   * @param {string?} message
   *
   * @example
   * assert.dom('button').hasAria('pressed', 'true');
   *
   * @see {@link #doesNotHaveAria}
   */
  hasAria(
    name: string,
    ...value: [value: string | RegExp | { any: true }, message?: string] | []
  ): DOMAssertions {
    if (value.length === 0) {
      return this.hasAttribute(`aria-${name}`);
    } else {
      return this.hasAttribute(`aria-${name}`, ...value);
    }
  }

  /**
   * Assert that the {@link HTMLElement} has no ARIA attribute with the
   * provided `name`.
   *
   * **Aliases:** `hasNoAria`, `lacksAria`
   *
   * @param {string} name
   * @param {string?} message
   *
   * @example
   * assert.dom('button').doesNotHaveAria('pressed');
   *
   * @see {@link #hasAria}
   */
  doesNotHaveAria(name: string, message?: string): DOMAssertions {
    return this.doesNotHaveAttribute(`aria-${name}`, message);
  }

  hasNoAria(name: string, message?: string): DOMAssertions {
    return this.doesNotHaveAria(name, message);
  }

  lacksAria(name: string, message?: string): DOMAssertions {
    return this.doesNotHaveAria(name, message);
  }

  /**
   * Assert that the {@link HTMLElement} has a property with the provided `name`
   * and checks if the property `value` matches the provided text or regular
   * expression.
   *
   * @param {string} name
   * @param {RegExp|any} value
   * @param {string?} message
   *
   * @example
   * assert.dom('input.password-input').hasProperty('type', 'password');
   *
   * @see {@link #doesNotHaveProperty}
   */
  hasProperty(name: string, value: unknown, message?: string): DOMAssertions {
    let element = this.findTargetElement();
    if (!element) return this;

    let description = this.targetDescription;

    let actualValue = element[name as keyof Element];

    if (value instanceof RegExp) {
      let result = value.test(String(actualValue));
      let expected = `Element ${description} has property "${name}" with value matching ${value}`;
      let actual = `Element ${description} has property "${name}" with value ${JSON.stringify(
        actualValue
      )}`;

      if (!message) {
        message = expected;
      }

      this.pushResult({ result, actual, expected, message });
    } else {
      let result = value === actualValue;
      let expected = `Element ${description} has property "${name}" with value ${JSON.stringify(
        value
      )}`;
      let actual = `Element ${description} has property "${name}" with value ${JSON.stringify(
        actualValue
      )}`;

      if (!message) {
        message = expected;
      }

      this.pushResult({ result, actual, expected, message });
    }

    return this;
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
  isDisabled(message?: string): DOMAssertions {
    isDisabled.call(this, message);
    return this;
  }

  /**
   *  Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
   * `selector` is not disabled.
   *
   * **Aliases:** `isEnabled`
   *
   * @param {string?} message
   *
   * @example
   * assert.dom('.foo').isNotDisabled();
   *
   * @see {@link #isDisabled}
   */
  isNotDisabled(message?: string): DOMAssertions {
    isDisabled.call(this, message, { inverted: true });
    return this;
  }

  isEnabled(message?: string): DOMAssertions {
    return this.isNotDisabled(message);
  }

  /**
   * Assert that the {@link HTMLElement} has the `expected` CSS class using
   * [`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList).
   *
   * `expected` can also be a regular expression, and the assertion will return
   * true if any of the element's CSS classes match.
   *
   * @param {string|RegExp} expected
   * @param {string?} message
   *
   * @example
   * assert.dom('input[type="password"]').hasClass('secret-password-input');
   *
   * @example
   * assert.dom('input[type="password"]').hasClass(/.*password-input/);
   *
   * @see {@link #doesNotHaveClass}
   */
  hasClass(expected: string | RegExp, message?: string): DOMAssertions {
    let element = this.findTargetElement();
    if (!element) return this;

    let actual = element.classList.toString();

    if (expected instanceof RegExp) {
      let classNames = Array.prototype.slice.call(element.classList);
      let result = classNames.some((className: string): boolean => {
        return expected.test(className);
      });

      if (!message) {
        message = `Element ${this.targetDescription} has CSS class matching ${expected}`;
      }

      this.pushResult({ result, actual, expected, message });
    } else {
      let result = element.classList.contains(expected);

      if (!message) {
        message = `Element ${this.targetDescription} has CSS class "${expected}"`;
      }

      this.pushResult({ result, actual, expected, message });
    }

    return this;
  }

  /**
   * Assert that the {@link HTMLElement} does not have the `expected` CSS class using
   * [`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList).
   *
   * `expected` can also be a regular expression, and the assertion will return
   * true if none of the element's CSS classes match.
   *
   * **Aliases:** `hasNoClass`, `lacksClass`
   *
   * @param {string|RegExp} expected
   * @param {string?} message
   *
   * @example
   * assert.dom('input[type="password"]').doesNotHaveClass('username-input');
   *
   * @example
   * assert.dom('input[type="password"]').doesNotHaveClass(/username-.*-input/);
   *
   * @see {@link #hasClass}
   */
  doesNotHaveClass(expected: string | RegExp, message?: string): DOMAssertions {
    let element = this.findTargetElement();
    if (!element) return this;

    let actual = element.classList.toString();

    if (expected instanceof RegExp) {
      let classNames = Array.prototype.slice.call(element.classList);
      let result = classNames.every((className: string): boolean => {
        return !expected.test(className);
      });

      if (!message) {
        message = `Element ${this.targetDescription} does not have CSS class matching ${expected}`;
      }

      this.pushResult({ result, actual, expected: `not: ${expected}`, message });
    } else {
      let result = !element.classList.contains(expected);

      if (!message) {
        message = `Element ${this.targetDescription} does not have CSS class "${expected}"`;
      }

      this.pushResult({ result, actual, expected: `not: ${expected}`, message });
    }

    return this;
  }

  hasNoClass(expected: string | RegExp, message?: string): DOMAssertions {
    return this.doesNotHaveClass(expected, message);
  }

  lacksClass(expected: string | RegExp, message?: string): DOMAssertions {
    return this.doesNotHaveClass(expected, message);
  }

  /**
   * Assert that the [HTMLElement][] has the `expected` style declarations using
   * [`window.getComputedStyle`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).
   *
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
  hasStyle(expected: object, message?: string): DOMAssertions {
    return this.hasPseudoElementStyle(null, expected, message);
  }

  hasPseudoElementStyle(selector: string | null, expected: object, message?: string): DOMAssertions;

  /**
   * Assert that the pseudo element for `selector` of the [HTMLElement][] has the `expected` style declarations using
   * [`window.getComputedStyle`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).
   *
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
  hasPseudoElementStyle(
    selector: string | null,
    expected: Record<string, string>,
    message?: string
  ): DOMAssertions {
    let element = this.findTargetElement();
    if (!element) return this;

    let computedStyle = window.getComputedStyle(element, selector);
    let expectedProperties = Object.keys(expected) as CSSStyleDeclarationProperty[];
    if (expectedProperties.length <= 0) {
      throw new TypeError(
        `Missing style expectations. There must be at least one style property in the passed in expectation object.`
      );
    }

    let result = expectedProperties.every(
      property =>
        (computedStyle.getPropertyValue(property.toString()) || computedStyle[property]) ===
        expected[property]
    );
    let actual: ActualCSSStyleDeclaration = {};

    expectedProperties.forEach(
      property =>
        (actual[property] =
          computedStyle.getPropertyValue(property.toString()) || computedStyle[property])
    );

    if (!message) {
      let normalizedSelector = selector ? selector.replace(/^:{0,2}/, '::') : '';
      message = `Element ${this.targetDescription}${normalizedSelector} has style "${JSON.stringify(
        expected
      )}"`;
    }

    this.pushResult({ result, actual, expected, message });
    return this;
  }

  /**
   * Assert that the [HTMLElement][] does not have the `expected` style declarations using
   * [`window.getComputedStyle`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).
   *
   * @param {object} expected
   * @param {string?} message
   *
   * @example
   * assert.dom('.progress-bar').doesNotHaveStyle({
   *   opacity: 1,
   *   display: 'block'
   * });
   *
   * @see {@link #hasClass}
   */
  doesNotHaveStyle(expected: object, message?: string): DOMAssertions {
    return this.doesNotHavePseudoElementStyle(null, expected, message);
  }

  doesNotHavePseudoElementStyle(
    selector: string | null,
    expected: object,
    message?: string
  ): DOMAssertions;

  /**
   * Assert that the pseudo element for `selector` of the [HTMLElement][] does not have the `expected` style declarations using
   * [`window.getComputedStyle`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).
   *
   * @param {string} selector
   * @param {object} expected
   * @param {string?} message
   *
   * @example
   * assert.dom('.progress-bar').doesNotHavePseudoElementStyle(':after', {
   *   content: '";"',
   * });
   *
   * @see {@link #hasClass}
   */
  doesNotHavePseudoElementStyle(
    selector: string | null,
    expected: Record<string, unknown>,
    message?: string
  ): DOMAssertions {
    let element = this.findTargetElement();
    if (!element) return this;

    let computedStyle = window.getComputedStyle(element, selector);

    let expectedProperties = Object.keys(expected) as CSSStyleDeclarationProperty[];
    if (expectedProperties.length <= 0) {
      throw new TypeError(
        `Missing style expectations. There must be at least one style property in the passed in expectation object.`
      );
    }

    let result = expectedProperties.some(
      property => computedStyle[property] !== expected[property]
    );
    let actual: ActualCSSStyleDeclaration = {};

    expectedProperties.forEach(property => (actual[property] = computedStyle[property]));

    if (!message) {
      let normalizedSelector = selector ? selector.replace(/^:{0,2}/, '::') : '';
      message = `Element ${
        this.targetDescription
      }${normalizedSelector} does not have style "${JSON.stringify(expected)}"`;
    }

    this.pushResult({ result, actual, expected, message });
    return this;
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
  hasText(expected: string | RegExp | { any: true }, message?: string): DOMAssertions {
    let element = this.findTargetElement();
    if (!element) return this;

    if (expected instanceof RegExp) {
      let result = typeof element.textContent === 'string' && expected.test(element.textContent);
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
      let actual = collapseWhitespace(element.textContent || '');
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

    return this;
  }

  matchesText(expected: string | RegExp | { any: true }, message?: string): DOMAssertions {
    return this.hasText(expected, message);
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
  hasAnyText(message?: string): DOMAssertions {
    return this.hasText({ any: true }, message);
  }

  /**
   * Assert that the `textContent` property of an {@link HTMLElement} is empty.
   *
   * @param {string?} message
   *
   * @example
   * assert.dom('div').hasNoText();
   *
   * @see {@link #hasNoText}
   */
  hasNoText(message?: string): DOMAssertions {
    return this.hasText('', message);
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
  includesText(text: string, message?: string): DOMAssertions {
    let element = this.findTargetElement();
    if (!element) return this;

    let collapsedText = collapseWhitespace(element.textContent || '');
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
    return this;
  }

  containsText(expected: string, message?: string): DOMAssertions {
    return this.includesText(expected, message);
  }

  hasTextContaining(expected: string, message?: string): DOMAssertions {
    return this.includesText(expected, message);
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
  doesNotIncludeText(text: string, message?: string): DOMAssertions {
    let element = this.findTargetElement();
    if (!element) return this;

    let collapsedText = collapseWhitespace(element.textContent || '');
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
    return this;
  }

  doesNotContainText(unexpected: string, message?: string): DOMAssertions {
    return this.doesNotIncludeText(unexpected, message);
  }

  doesNotHaveTextContaining(unexpected: string, message?: string): DOMAssertions {
    return this.doesNotIncludeText(unexpected, message);
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
   *
   * @see {@link #includesValue}
   * @see {@link #hasAnyValue}
   * @see {@link #hasNoValue}
   */
  hasValue(expected?: string | RegExp | { any: true }, message?: string): DOMAssertions {
    let element = this.findTargetElement();
    if (!element) return this;

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

    return this;
  }

  /**
   * Assert that the `value` property of an {@link HTMLInputElement} includes
   * the `expected` text.
   *
   * **Aliases:** `containsValue`, `hasValueContaining`
   *
   * @param {string} expected
   * @param {string?} message
   *
   * @example
   * assert.dom('textarea.description').includesValue('https://example.com');
   *
   * @see {@link #doesNotIncludeValue}
   */
  includesValue(expected: string, message?: string): DOMAssertions {
    let element = this.findTargetElement();
    if (!element) return this;

    let actual = (element as HTMLInputElement).value;
    let result = actual.includes(expected);

    if (!message) {
      message = `Element ${this.targetDescription} includes value "${expected}"`;
    }

    this.pushResult({ result, actual, expected, message });

    return this;
  }

  containsValue(expected: string, message?: string): DOMAssertions {
    return this.includesValue(expected, message);
  }

  hasValueContaining(expected: string, message?: string): DOMAssertions {
    return this.includesValue(expected, message);
  }

  /**
   * Assert that the `value` property of an {@link HTMLInputElement} does not include
   * the `expected` text.
   *
   * **Aliases:** `doesNotContainValue`, `doesNotHaveValueContaining`
   *
   * @param {string} expected
   * @param {string?} message
   *
   * @example
   * assert.dom('textarea.description').doesNotIncludeValue('https://example.com');
   *
   * @see {@link #includesValue}
   */
  doesNotIncludeValue(expected: string, message?: string): DOMAssertions {
    let element = this.findTargetElement();
    if (!element) return this;

    let actual = (element as HTMLInputElement).value;
    let result = !actual.includes(expected);

    if (!message) {
      message = `Element ${this.targetDescription} does not include value "${expected}"`;
    }

    this.pushResult({ result, actual, expected, message });

    return this;
  }

  doesNotContainValue(expected: string, message?: string): DOMAssertions {
    return this.doesNotIncludeValue(expected, message);
  }

  doesNotHaveValueContaining(expected: string, message?: string): DOMAssertions {
    return this.doesNotIncludeValue(expected, message);
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
  hasAnyValue(message?: string): DOMAssertions {
    return this.hasValue({ any: true }, message);
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
  hasNoValue(message?: string): DOMAssertions {
    return this.hasValue('', message);
  }

  lacksValue(message?: string): DOMAssertions {
    return this.hasNoValue(message);
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
  matchesSelector(compareSelector: string, message?: string): DOMAssertions {
    let targetElements = this.findElements();
    let targets = targetElements.length;
    let matchFailures = matchesSelector(targetElements, compareSelector);
    let singleElement: boolean = targets === 1;
    let selectedByPart = this.selectedBy;
    let actual;
    let expected;

    if (matchFailures === 0) {
      // no failures matching.
      if (!message) {
        message = singleElement
          ? `The element ${selectedByPart} also matches the selector ${compareSelector}.`
          : `${targets} elements, ${selectedByPart}, also match the selector ${compareSelector}.`;
      }
      actual = expected = message;
      this.pushResult({ result: true, actual, expected, message });
    } else {
      let difference = targets - matchFailures;
      // there were failures when matching.
      if (!message) {
        message = singleElement
          ? `The element ${selectedByPart} did not also match the selector ${compareSelector}.`
          : `${matchFailures} out of ${targets} elements ${selectedByPart} did not also match the selector ${compareSelector}.`;
      }
      actual = singleElement ? message : `${difference} elements matched ${compareSelector}.`;
      expected = singleElement
        ? `The element should have matched ${compareSelector}.`
        : `${targets} elements should have matched ${compareSelector}.`;
      this.pushResult({ result: false, actual, expected, message });
    }

    return this;
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
  doesNotMatchSelector(compareSelector: string, message?: string): DOMAssertions {
    let targetElements = this.findElements();
    let targets = targetElements.length;
    let matchFailures = matchesSelector(targetElements, compareSelector);
    let singleElement: boolean = targets === 1;
    let selectedByPart = this.selectedBy;
    let actual;
    let expected;
    if (matchFailures === targets) {
      // the assertion is successful because no element matched the other selector.
      if (!message) {
        message = singleElement
          ? `The element ${selectedByPart} did not also match the selector ${compareSelector}.`
          : `${targets} elements, ${selectedByPart}, did not also match the selector ${compareSelector}.`;
      }
      actual = expected = message;
      this.pushResult({ result: true, actual, expected, message });
    } else {
      let difference = targets - matchFailures;
      // the assertion fails because at least one element matched the other selector.
      if (!message) {
        message = singleElement
          ? `The element ${selectedByPart} must not also match the selector ${compareSelector}.`
          : `${difference} elements out of ${targets}, ${selectedByPart}, must not also match the selector ${compareSelector}.`;
      }
      actual = singleElement
        ? `The element ${selectedByPart} matched ${compareSelector}.`
        : `${matchFailures} elements did not match ${compareSelector}.`;
      expected = singleElement
        ? message
        : `${targets} elements should not have matched ${compareSelector}.`;
      this.pushResult({ result: false, actual, expected, message });
    }

    return this;
  }

  /**
   * Assert that the tagName of the {@link HTMLElement} or an {@link HTMLElement}
   * matching the `selector` matches the `expected` tagName, using the
   * [`tagName`](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName)
   * property of the {@link HTMLElement}.
   *
   * @param {string} expected
   * @param {string?} message
   *
   * @example
   * // <h1 id="title">
   * //   Title
   * // </h1>
   *
   * assert.dom('#title').hasTagName('h1');
   */
  hasTagName(tagName: string, message?: string): DOMAssertions {
    let element = this.findTargetElement();
    let actual;
    let expected;

    if (!element) return this;

    if (typeof tagName !== 'string') {
      throw new TypeError(`You must pass a string to "hasTagName". You passed ${tagName}.`);
    }

    actual = element.tagName.toLowerCase();
    expected = tagName.toLowerCase();

    if (actual === expected) {
      if (!message) {
        message = `Element ${this.targetDescription} has tagName ${expected}`;
      }

      this.pushResult({ result: true, actual, expected, message });
    } else {
      if (!message) {
        message = `Element ${this.targetDescription} does not have tagName ${expected}`;
      }

      this.pushResult({ result: false, actual, expected, message });
    }

    return this;
  }

  /**
   * Assert that the tagName of the {@link HTMLElement} or an {@link HTMLElement}
   * matching the `selector` does not match the `expected` tagName, using the
   * [`tagName`](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName)
   * property of the {@link HTMLElement}.
   *
   * @param {string} expected
   * @param {string?} message
   *
   * @example
   * // <section id="block">
   * //   Title
   * // </section>
   *
   * assert.dom('section#block').doesNotHaveTagName('div');
   */
  doesNotHaveTagName(tagName: string, message?: string): DOMAssertions {
    let element = this.findTargetElement();
    let actual;
    let expected;

    if (!element) return this;

    if (typeof tagName !== 'string') {
      throw new TypeError(`You must pass a string to "doesNotHaveTagName". You passed ${tagName}.`);
    }

    actual = element.tagName.toLowerCase();
    expected = tagName.toLowerCase();

    if (actual !== expected) {
      if (!message) {
        message = `Element ${this.targetDescription} does not have tagName ${expected}`;
      }

      this.pushResult({ result: true, actual, expected, message });
    } else {
      if (!message) {
        message = `Element ${this.targetDescription} has tagName ${expected}`;
      }

      this.pushResult({ result: false, actual, expected, message });
    }

    return this;
  }

  /**
   * Assert that the html of the {@link HTMLElement} or an {@link HTMLElement}
   * matching the `selector` matches the `expected` html, using the
   * [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
   * property of the {@link HTMLElement}.
   *
   * `expected` can also be a regular expression.
   *
   * > Note: This assertion will collapse whitespace if the type you pass in is a string.
   * > If you are testing specifically for whitespace integrity, pass your expected html
   * > in as a RegEx pattern.
   *
   * @param {string|RegExp} expected
   * @param {string?} message
   *
   * @example
   * // <h1>
   * //   A <b>great</b> thing
   * // </h1>
   *
   * assert.dom('h1').hasHtml('A <b>great</b> thing');
   *
   * @example
   * assert.dom('h1').hasHtml(/.*\s<b>great.+/);
   */
  hasHtml(expected: string | RegExp, message?: string): DOMAssertions {
    let element = this.findTargetElement();
    if (!element) return this;

    if (expected instanceof RegExp) {
      let result = expected.test(element.innerHTML);
      let actual = element.innerHTML;

      if (!message) {
        if (result) {
          message = `Element ${this.targetDescription} has html matching ${expected}`;
        } else {
          message = `Element ${this.targetDescription} does not have html matching ${expected}`;
        }
      }

      this.pushResult({ result, actual, expected, message });
    } else if (typeof expected === 'string') {
      expected = collapseWhitespace(expected);
      let actual = collapseWhitespace(element.innerHTML);
      let result = actual === expected;

      if (!message) {
        if (result) {
          message = `Element ${this.targetDescription} has html "${expected}"`;
        } else {
          message = `Element ${this.targetDescription} does not have html "${expected}"`;
        }
      }

      this.pushResult({ result, actual, expected, message });
    } else {
      throw new TypeError(
        `You must pass a string or Regular Expression to "hasHtml". You passed ${expected}.`
      );
    }

    return this;
  }

  /**
   * Assert that the html of the {@link HTMLElement} or an {@link HTMLElement}
   * matching the `selector` does not match the `expected` html, using the
   * [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
   * property of the {@link HTMLElement}.
   *
   * @param {string} expected
   * @param {string?} message
   *
   * @example
   * // <section>
   * //   a <b>great</b> thing
   * // </section>
   *
   * assert.dom('section').doesNotHaveHtml('<b>fantastic</b>');
   */
  doesNotHaveHtml(expected: string, message?: string): DOMAssertions {
    let element = this.findTargetElement();

    if (!element) return this;

    if (typeof expected !== 'string') {
      throw new TypeError(`You must pass a string to "doesNotHaveHtml". You passed ${expected}.`);
    }

    let actual = element.innerHTML;

    if (actual !== expected) {
      if (!message) {
        message = `Element ${this.targetDescription} does not have html "${expected}"`;
      }

      this.pushResult({ result: true, actual, expected, message });
    } else {
      if (!message) {
        message = `Element ${this.targetDescription} has html "${expected}"`;
      }

      this.pushResult({ result: false, actual, expected, message });
    }

    return this;
  }

  /**
   * Assert that the html of the {@link HTMLElement} or an {@link HTMLElement}
   * matching the `selector` contains the given `html`, using the
   * [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
   * property.
   *
   * > Note: This assertion will collapse whitespace in `innerHTML` before searching.
   * > If you would like to assert on a string that *should* contain line breaks, tabs,
   * > more than one space in a row, or starting/ending whitespace, use the {@link #hasText}
   * > selector and pass your expected html in as a RegEx pattern.
   *
   * **Aliases:** `containsHtml`, `hasHtmlContaining`
   *
   * @param {string} expected
   * @param {string?} message
   *
   * @example
   * assert.dom('#title').includesHtml('<b>nice</b>');
   *
   * @see {@link #hasHtml}
   */
  includesHtml(html: string, message?: string): DOMAssertions {
    let element = this.findTargetElement();
    if (!element) return this;

    let collapsedHtml = collapseWhitespace(element.innerHTML || '');
    let result = collapsedHtml.indexOf(html) !== -1;
    let actual = collapsedHtml;
    let expected = html;

    if (!message) {
      message = `Element ${this.targetDescription} has html containing "${html}"`;
    }

    if (!result && html !== collapseWhitespace(html)) {
      console.warn(
        'The `.includesHtml()`, `.containsHtml()`, and `.hasHtmlContaining()` assertions collapse whitespace. The html you are checking for contains whitespace that may have made your test fail incorrectly. Try the `.hasHtml()` assertion passing in your expected html as a RegExp pattern. Your html:\n' +
          html
      );
    }

    this.pushResult({ result, actual, expected, message });
    return this;
  }

  containsHtml(expected: string, message?: string): DOMAssertions {
    return this.includesHtml(expected, message);
  }

  hasHtmlContaining(expected: string, message?: string): DOMAssertions {
    return this.includesHtml(expected, message);
  }

  /**
   * Assert that the html of the {@link HTMLElement} or an {@link HTMLElement}
   * matching the `selector` does not include the given `expected` html, using the
   * [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
   * attribute.
   *
   * **Aliases:** `doesNotContainHtml`, `doesNotHaveHtmlContaining`
   *
   * @param {string} html
   * @param {string?} message
   *
   * @example
   * assert.dom('#title').doesNotIncludeHtml('<i>nope</i>');
   */
  doesNotIncludeHtml(html: string, message?: string): DOMAssertions {
    let element = this.findTargetElement();
    if (!element) return this;

    let collapsedHtml = collapseWhitespace(element.innerHTML || '');
    let result = collapsedHtml.indexOf(html) === -1;
    let expected = `Element ${this.targetDescription} does not include html "${html}"`;
    let actual = expected;

    if (!result) {
      actual = `Element ${this.targetDescription} includes html "${html}"`;
    }

    if (!message) {
      message = expected;
    }

    this.pushResult({ result, actual, expected, message });
    return this;
  }

  doesNotContainHtml(unexpected: string, message?: string): DOMAssertions {
    return this.doesNotIncludeHtml(unexpected, message);
  }

  doesNotHaveHtmlContaining(unexpected: string, message?: string): DOMAssertions {
    return this.doesNotIncludeHtml(unexpected, message);
  }

  /**
   * @private
   */
  private pushResult(result: AssertionResult): void {
    this.testContext.pushResult(result);
  }

  /**
   * Finds a valid HTMLElement from target, or pushes a failing assertion if a valid
   * element is not found.
   * @private
   * @returns (HTMLElement|null) a valid HTMLElement, or null
   */
  private findTargetElement(): Element | null {
    let el = resolveDOMElement(this.descriptor);

    if (el === null) {
      let message = `Element ${this.targetDescription} should exist`;
      this.pushResult({ message, result: false, actual: undefined, expected: undefined });
      return null;
    }

    return el;
  }

  /**
   * Finds a collection of Element instances from target using querySelectorAll
   * @private
   * @returns (Element[]) an array of Element instances
   * @throws TypeError will be thrown if target is an unrecognized type
   */
  private findElements(): Element[] {
    return Array.from(resolveDOMElements(this.descriptor));
  }

  /**
   * @private
   */
  private get targetDescription(): string {
    return resolveDescription(this.descriptor) ?? 'undefined';
  }

  /**
   * @private
   */
  private get selectedBy(): string {
    if (this.wasPassedElement) {
      return 'passed';
    } else if (resolveDOMElement(this.descriptor)) {
      return `selected by ${this.targetDescription}`;
    } else {
      return 'selected by null';
    }
  }
}
