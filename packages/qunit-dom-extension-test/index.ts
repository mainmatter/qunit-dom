// Setup the package that this repo provides
import DOMAssertions, { setup, DOMAssertionsHandler, type RootElement } from 'qunit-dom';

declare global {
  interface Assert {
    dom(target?: number, rootElement?: RootElement): DOMAssertions<number>;
  }
}

class CustomHandler extends DOMAssertionsHandler<number> {
  findElements(target: number, rootElement: RootElement) {
    if (typeof target === 'number' && rootElement) {
      return Array.prototype.slice.call(rootElement.querySelectorAll(`[data-id="${target}"]`), 0);
    }
    return [null];
  }

  findElement(target: number, rootElement: RootElement) {
    if (typeof target === 'number' && rootElement) {
      return rootElement.querySelector(`[data-id="${target}"]`);
    }
    return null;
  }

  description(target: number): string {
    if (target >= 200) {
      return  `data-id=${target}` ;
    } else if (target <= 100) {
      return target.toString();
    } else {
      return "<not found>";
    }
  }
}

export default function (assert: Assert) {
  setup(assert, {
    targetHandler: new CustomHandler(),
  });
}

