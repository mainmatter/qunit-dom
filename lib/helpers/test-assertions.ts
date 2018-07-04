import DOMAssertions from "../assertions";

export default class TestAssertions {
  public results = [];

  dom(target, rootElement) {
    return new DOMAssertions(target, rootElement || document, this);
  }

  pushResult(result) {
    this.results.push(result);
  }
}
