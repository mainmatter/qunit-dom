import DOMAssertions, { type AssertionResult } from '../assertions.js';
import type { IDOMElementDescriptor } from 'dom-element-descriptors';

export default class TestAssertions {
  public results: AssertionResult[] = [];

  dom(target: string | Element | null | IDOMElementDescriptor, rootElement?: RootElement) {
    return new DOMAssertions(target, rootElement || document, this as any);
  }

  pushResult(result: AssertionResult) {
    this.results.push(result);
  }
}
