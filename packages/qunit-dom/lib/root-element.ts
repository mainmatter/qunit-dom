let _getRootElement: () => Element | null = () => null;

export function overrideRootElement(fn: () => Element | null) {
  _getRootElement = fn;
}

export function getRootElement() {
  return _getRootElement();
}
