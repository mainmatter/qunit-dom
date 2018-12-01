export default function matchesSelector(
  targetSelector: string | Element,
  compareSelector: string
): Array<number> {
  let targetElements: Array<Element> =
    typeof targetSelector === 'string'
      ? Array.from(document.querySelectorAll(targetSelector))
      : [targetSelector];

  let failures = targetElements.reduce(function(acc, element) {
    return element.matches(compareSelector) ? acc : acc + 1;
  }, 0);

  return [targetElements.length, failures];
}
