import DOMAssertions, { AssertionResult } from '../assertions';

export default class TestAssertions {
  public results: AssertionResult[] = [];

  dom(target: string | Element | null, rootElement?: Element) {
    return new DOMAssertions(target, rootElement || document, this as any);
  }

  pushResult(result: AssertionResult) {
    this.results.push(result);
  }
}
