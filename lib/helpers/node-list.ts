export function toArray(list: NodeList): Node[] {
  return Array.prototype.slice.call(list);
}
