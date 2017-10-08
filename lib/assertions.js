import exists from './assertions/exists';
import missing from './assertions/missing';
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
   * Asserts that the passed in DOM element exists.
   *
   * @param {object?} options
   * @param {string?} message
   */
  exists(options, message) {
    exists.call(this, this.target, options, message);
  }

  /**
   * Asserts that the passed in DOM element does not exist.
   *
   * @param {string?} message
   */
  missing(message) {
    missing.call(this, this.target, message);
  }

  /**
   * Asserts that the passed in DOM element is currently focused.
   *
   * @param {string?} message
   */
  focused(message) {
    focused.call(this, this.target, message);
  }

  /**
   * Asserts that the passed in DOM element is currently *not* focused.
   *
   * @param {string?} message
   */
  notFocused(message) {
    notFocused.call(this, this.target, message);
  }

  /**
   * Asserts if `text` is contained in the `textContent` property
   * of the passed in DOM element.
   *
   * @param {string} text
   * @param {string?} message
   */
  textContains(text, message) {
    textContains.call(this, this.target, text, message);
  }

  /**
   * Asserts if `regex` is matching the `textContent` property
   * of the passed in DOM element.
   *
   * @param {RegExp} regex
   * @param {string?} message
   */
  textMatches(regex, message) {
    textMatches.call(this, this.target, regex, message);
  }

  /**
   * @private
   */
  pushResult(result) {
    this.testContext.pushResult(result);
  }
}
