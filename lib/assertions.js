import exists from './assertions/exists';
import focused from './assertions/focused';
import notFocused from './assertions/not-focused';

const elementToString = require('./helpers/element-to-string');
const collapseWhitespace = require('./helpers/collapse-whitespace');

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
   */
  isNotFocused(message) {
    notFocused.call(this, message);
  }

  /**
   * Assert that the text of the [HTMLElement][] or an [HTMLElement][]
   * matching the `selector` matches the given `text`, using the
   * [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
   * attribute and stripping/collapsing whitespace.
   *
   * @param {string} text
   * @param {string?} message
   *
   * @example
   * // <h2 id="title">
   * //   Welcome to <b>QUnit</b>
   * // </h2>
   *
   * assert.dom('#title').hasText('Welcome to QUnit');
   */
  hasText(text, message) {
    let element = this.findTargetElement();
    if (!element) return;

    let actual = collapseWhitespace(element.textContent);
    let expected = collapseWhitespace(text);
    let result = actual === expected;

    if (!message) {
      message = `Element ${this.targetDescription} has text "${text}"`;
    }

    this.pushResult({ result, actual, expected, message });
  }

  /**
   * Assert that the text of the [HTMLElement][] or an [HTMLElement][]
   * matching the `selector` contains the given `text`, using the
   * [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
   * attribute.
   *
   * @param {string} text
   * @param {string?} message
   *
   * @example
   * assert.dom('#title').textContains('Welcome');
   */
  textContains(text, message) {
    let element = this.findTargetElement();
    if (!element) return;

    let result = element.textContent.indexOf(text) !== -1;
    let actual = element.textContent;
    let expected = text;

    if (!message) {
      message = `Element ${this.targetDescription} contains "${text}"`;
    }

    this.pushResult({ result, actual, expected, message });
  }

  /**
   * Assert that the text of the [HTMLElement][] or an [HTMLElement][]
   * matching the `selector` matches the given regular expression, using the
   * [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
   * attribute.
   *
   * @param {RegExp} regex
   * @param {string?} message
   *
   * @example
   * assert.dom('.foo').textMatches(/[12]\d{3}/);
   */
  textMatches(regex, message) {
    let element = this.findTargetElement();
    if (!element) return;

    let result = regex.test(element.textContent);
    let actual = element.textContent;
    let expected = regex;

    if (!message) {
      message = `Element ${this.targetDescription} matches ${regex}`;
    }

    this.pushResult({ result, actual, expected, message });
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
