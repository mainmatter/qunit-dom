// imported from https://github.com/nathanboktae/chai-dom

export default function elementToString(el) {
  let desc;
  if (el instanceof NodeList) {
    if (el.length === 0) { return 'empty NodeList'; }
    desc = Array.prototype.slice.call(el, 0, 5).map(elementToString).join(', ');
    return el.length > 5 ? `${desc}... (+${el.length - 5} more)` : desc;
  }
  if (!(el instanceof HTMLElement)) {
    return String(el);
  }

  desc = el.tagName.toLowerCase();
  if (el.id) {
    desc += `#${el.id}`;
  }
  if (el.className) {
    desc += `.${String(el.className).replace(/\s+/g, '.')}`;
  }
  Array.prototype.forEach.call(el.attributes, function(attr) {
    if (attr.name !== 'class' && attr.name !== 'id') {
      desc += `[${attr.name}${attr.value ? `="${attr.value}"]` : ']'}`;
    }
  });
  return desc;
}
