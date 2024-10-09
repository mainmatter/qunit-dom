export default function getComputedStyle(element: Element, selector?: string | null) {
  let computedStyleMap: StylePropertyMapReadOnly | undefined;

  if (!selector && 'computedStyleMap' in element) {
    computedStyleMap = element.computedStyleMap();
  }

  const computedStyle = window.getComputedStyle(element, selector);

  return new Proxy<Record<string, string>>(
    {},
    {
      get(_, property) {
        let value;

        if (typeof property === 'string' && computedStyleMap) {
          value = computedStyleMap.get(property)?.toString();
        }

        return (
          value ||
          computedStyle.getPropertyValue(property.toString()) ||
          Reflect.get(computedStyle, property)
        );
      },

      has(_, property) {
        if (computedStyleMap && typeof property === 'string') {
          return computedStyleMap.has(property);
        }

        return Reflect.has(computedStyle, property);
      },

      ownKeys(_) {
        if (computedStyleMap) {
          return Array.from(computedStyleMap.keys());
        }

        return Reflect.ownKeys(computedStyle);
      },

      getOwnPropertyDescriptor(_, property) {
        if (computedStyleMap && typeof property == 'string') {
          return {
            writable: false,
            configurable: true,
            enumerable: true,
            value: computedStyleMap.get(property),
          };
        }

        return Reflect.getOwnPropertyDescriptor(computedStyle, property);
      },
    }
  );
}
