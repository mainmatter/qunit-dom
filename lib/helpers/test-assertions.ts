import DOMAssertions, { AssertionResult, DOMAssertionOptions } from '../assertions';

export default class TestAssertions {
  public results: AssertionResult[] = [];

  dom(target: string | Element | null, rootElement?: Element, options?: DOMAssertionOptions) {
    return new DOMAssertions(target, rootElement || document, this as any, options);
  }

  pushResult(result: AssertionResult) {
    this.results.push(result);
  }
}
