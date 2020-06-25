import DOMAssertions, { AssertionResult } from '../assertions';

export default class TestAssertions {
  public results: AssertionResult[] = [];

  dom(target: string | Element | null, rootElement?: Element) {
    if (arguments.length > 0 && arguments[0] === null) {
      throw new Error('Null target or element was passed');
    }

    return new DOMAssertions(target, rootElement || document, this as any);
  }

  pushResult(result: AssertionResult) {
    this.results.push(result);
  }
}
