// Setup the package that this repo provides
import DOMAssertions, { setup, DOMAssertionsHandler, type RootElement } from 'qunit-dom';

declare global {
  interface Assert {
    dom(target?: string | Element | null | number, rootElement?: RootElement): DOMAssertions;
  }
}

class CustomHandler extends DOMAssertionsHandler {
  constructor(target: number) {
    super(target as any);
  }

  findElements(rootElement: RootElement) {
    const { target } = this;
    if (typeof target === 'number' && rootElement) {
      return Array.prototype.slice.call(rootElement.querySelectorAll(`[data-id="${target}"]`), 0);
    }
    return super.findElements(rootElement);
  }

  findElement(rootElement: RootElement) {
    const { target } = this;
    if (typeof target === 'number' && rootElement) {
      return rootElement.querySelector(`[data-id="${target}"]`);
    }
    return super.findElement(rootElement);
  }

  description(): string {
    const { target } = this;

    if (typeof target === 'number') {
      if (target >= 200) {
        return  `data-id=${target}` ;
      } else if (target <= 100) {
        return `${target}`;
      }
    }

    return super.description();
  }
}

export default function (assert: Assert) {
  setup(assert, {
    targetHandler: CustomHandler,
  });
}

