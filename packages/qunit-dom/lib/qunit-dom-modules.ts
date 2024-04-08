import install from './install.js';
import { overrideRootElement } from './root-element.js';
import { type DOMAssertionsHandler } from './assertions.js';

export { default as install } from './install.js';

interface SetupOptions<T = void> {
  getRootElement?: () => Element | null;
  customHandlers?: DOMAssertionsHandler<T>[];
}

export function setup(assert: Assert, options: SetupOptions = {}) {
  install(assert);

  const getRootElement =
    typeof options.getRootElement === 'function'
      ? options.getRootElement
      : () => document.querySelector('#ember-testing');

  overrideRootElement(getRootElement);
}
