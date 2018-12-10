export function toArray<K extends keyof HTMLElementTagNameMap>(selectors: NodeListOf<HTMLElementTagNameMap[K]>): HTMLElementTagNameMap[K][];
export function toArray<K extends keyof SVGElementTagNameMap>(selectors: NodeListOf<SVGElementTagNameMap[K]>): SVGElementTagNameMap[K][];
export function toArray<E extends Element = Element>(selectors: NodeListOf<E>): E[];
export function toArray(list: NodeList): Node[];

/**
 * This function can be used to convert a NodeList to a regular array.
 * We should be using `Array.from()` for this, but IE11 doesn't support that :(
 */
export function toArray(list: NodeList): Node[] {
  return Array.prototype.slice.call(list);
}
