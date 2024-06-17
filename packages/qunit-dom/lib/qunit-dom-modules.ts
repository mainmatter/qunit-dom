import { DOMAssertionsHandler } from './assertions.js';
import install, { type ConstructableHandler } from './install.js';
import { overrideRootElement } from './root-element.js';

export { default as install } from './install.js';

interface SetupOptions {
  getRootElement?: () => Element | null;
  targetHandler: ConstructableHandler;
}

export function setup(
  assert: Assert,
  options: SetupOptions = { targetHandler: DOMAssertionsHandler }
) {
  install(assert, options.targetHandler);

  const getRootElement =
    typeof options.getRootElement === 'function'
      ? options.getRootElement
      : () => document.querySelector('#ember-testing');

  overrideRootElement(getRootElement);
}
