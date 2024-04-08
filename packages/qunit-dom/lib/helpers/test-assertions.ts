import DOMAssertions, { type AssertionResult, type DOMAssertionsHandler } from '../assertions.js';

export default class TestAssertions {
  public results: AssertionResult[] = [];

  constructor(private customHandlers?: DOMAssertionsHandler[]) {}

  dom(target: string | Element | null, rootElement?: Element) {
    return new DOMAssertions(target, rootElement || document, this as any, this.customHandlers);
  }

  pushResult(result: AssertionResult) {
    this.results.push(result);
  }
}
