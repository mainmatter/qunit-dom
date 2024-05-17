import {
  type AssertionResult,
  type AssertionHandler,
  DOMAssertionsHandler,
} from '../assertions.js';

export default class TestAssertions {
  public results: AssertionResult[] = [];

  constructor(private targetHandler: AssertionHandler = new DOMAssertionsHandler()) {}

  dom(target: QUnitDOMAssertTarget, rootElement?: RootElement) {
    return new DOMAssertions(target, rootElement || document, this as any, this.targetHandler);
  }

  pushResult(result: AssertionResult) {
    this.results.push(result);
  }
}
