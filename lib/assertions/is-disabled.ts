function checkAriaDisabled(element) {
  let ariaDisabled = element.attributes['aria-disabled'];
  if(ariaDisabled) {
    return ariaDisabled.value === 'true' ? true : false;
  }
  return null;
}

function walkAndCheck(node, checker, depth = 0){
  let parent = node.parentElement;
   if(parent){
    let result = checker(node);
    if(result === null){
      return walkAndCheck(parent, checker, ++depth);
    }
    return {
      state: result,
      depth
    }
  } else {
    return null;
  }
}

export default function isDisabled(message, options: { inverted?: boolean } = {}) {
  let { inverted } = options;

  let element = this.findTargetElement();
  if (!element) return;

  let state = null;
  let prefix = 'Element';
  if (!(
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLButtonElement ||
      element instanceof HTMLOptGroupElement ||
      element instanceof HTMLOptionElement ||
      element instanceof HTMLFieldSetElement
    )) {
      let result = walkAndCheck(element, checkAriaDisabled);
      if(result === null) {
        throw new TypeError(`Generic Element Type: ${element.toString()} does not use aria-disabled attribute`);
      } else {
        state = result.state;
        if(result.depth > 0){
          prefix = 'Parent of Element';
        }
      }
  } else {
    state = element.disabled;
  }

  let result = state === !inverted;

  let actual = state === false
    ? `${prefix} ${this.targetDescription} is not disabled`
    : `${prefix} ${this.targetDescription} is disabled`;

  let expected = inverted
    ? `${prefix} ${this.targetDescription} is not disabled`
    : `${prefix} ${this.targetDescription} is disabled`;

  if (!message) {
    message = expected;
  }

  this.pushResult({ result, actual, expected, message });
}
