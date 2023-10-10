import install from './install.js';
import { overrideRootElement } from './root-element.js';

export { default as install } from './install.js';

interface SetupOptions {
  getRootElement?: () => Element | null;
}

export function setup(assert: Assert, options: SetupOptions = {}) {
  install(assert);

  const getRootElement =
    typeof options.getRootElement === 'function'
      ? options.getRootElement
      : () => document.querySelector('#ember-testing');

  overrideRootElement(getRootElement);
}
