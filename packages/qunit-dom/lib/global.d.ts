import DOMAssertions, { type RootElement } from './assertions';

declare global {
  interface Assert {
    dom<Target>(target: Target, rootElement?: RootElement): DOMAssertions<Target>;
  }
}
