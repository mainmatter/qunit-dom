import exists from './assertions/exists';
import focused from './assertions/focused';
import notFocused from './assertions/not-focused';
import textContains from './assertions/text-contains';
import textMatches from './assertions/text-matches';

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
    textContains.call(this, text, message);
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
    textMatches.call(this, regex, message);
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
}
