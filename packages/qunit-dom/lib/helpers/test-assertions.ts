import DOMAssertions, {
  type AssertionResult,
  type RootElement,
  DOMAssertionsHandler,
} from '../assertions.js';

export default class TestAssertions {
  public results: AssertionResult[] = [];

  constructor(private targetHandler = new DOMAssertionsHandler()) {}

  dom(target: string | Element | null, rootElement?: RootElement) {
    return new DOMAssertions(target, rootElement || document, this as any, this.targetHandler);
  }

  pushResult(result: AssertionResult) {
    this.results.push(result);
  }
}
