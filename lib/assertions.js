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

  exists(options, message) {
    exists.call(this, this.target, options, message);
  }

  missing(message) {
    missing.call(this, this.target, message);
  }

  focused(message) {
    focused.call(this, this.target, message);
  }

  notFocused(message) {
    notFocused.call(this, this.target, message);
  }

  textContains(text, message) {
    textContains.call(this, this.target, text, message);
  }

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
