import DOMAssertions, { type RootElement } from './assertions';

declare global {
  interface Assert {
    dom(target: string | Element | null, rootElement?: RootElement): DOMAssertions;
  }
}
