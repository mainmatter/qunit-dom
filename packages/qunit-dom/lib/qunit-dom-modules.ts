import { DOMAssertionsHandler } from './assertions.js';
import install from './install.js';
import { overrideRootElement } from './root-element.js';

export { default as install } from './install.js';

interface SetupOptions<T> {
  getRootElement?: () => Element | null;
  targetHandler: DOMAssertionsHandler<T>;
}

export function setup<T>(
  assert: Assert,
  options: SetupOptions<DOMAssertionsHandler<T>> = { targetHandler: new DOMAssertionsHandler() }
) {
  install(assert, options.targetHandler);

  const getRootElement =
    typeof options.getRootElement === 'function'
      ? options.getRootElement
      : () => document.querySelector('#ember-testing');

  overrideRootElement(getRootElement);
}
