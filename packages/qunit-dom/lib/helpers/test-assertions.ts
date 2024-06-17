import DOMAssertions, {
  type AssertionResult,
  type RootElement,
  DOMAssertionsHandler,
} from '../assertions.js';

export default class TestAssertions {
  public results: AssertionResult[] = [];

  constructor(private targetHandler = DOMAssertionsHandler) {}

  dom(target: string | Element | null, rootElement?: RootElement) {
    return new DOMAssertions(rootElement || document, this as any, new this.targetHandler(target));
  }

  pushResult(result: AssertionResult) {
    this.results.push(result);
  }
}
