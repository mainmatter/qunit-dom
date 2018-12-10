/**
 * This function can be used to convert a NodeList to a regular array.
 * We should be using `Array.from()` for this, but IE11 doesn't support that :(
 */
export function toArray(list: NodeList): Node[] {
  return Array.prototype.slice.call(list);
}
