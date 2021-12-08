import DOMAssertions, { AssertionResult } from '../assertions';
import type { ExternalQuery } from '../query';

export default class TestAssertions {
  public results: AssertionResult[] = [];

  dom(target: string | Element | null | ExternalQuery, rootElement?: Element) {
    return new DOMAssertions(target, rootElement || document, this as any);
  }

  pushResult(result: AssertionResult) {
    this.results.push(result);
  }
}
