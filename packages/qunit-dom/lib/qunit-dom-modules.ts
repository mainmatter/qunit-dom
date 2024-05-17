import install from './install.js';
import { overrideRootElement } from './root-element.js';
import { type AssertionHandler } from './assertions.js';

export { default as install } from './install.js';

interface SetupOptions {
  getRootElement?: () => Element | null;
  targetHandler?: AssertionHandler;
}

export function setup(assert: Assert, options: SetupOptions = {}) {
  install(assert, options.targetHandler);

  const getRootElement =
    typeof options.getRootElement === 'function'
      ? options.getRootElement
      : () => document.querySelector('#ember-testing');

  overrideRootElement(getRootElement);
}
