import DOMAssertions, { type AssertionResult } from '../assertions.js';

export default class TestAssertions {
  public results: AssertionResult[] = [];

  dom(target: string | Element | null, rootElement?: Element) {
    return new DOMAssertions(target, rootElement || document, this as any);
  }

  pushResult(result: AssertionResult) {
    this.results.push(result);
  }
}
