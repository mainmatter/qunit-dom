export default function matchesSelector(
  elements: Array<Element>,
  compareSelector: string
): number {
  let failures = elements.filter(it => !it.matches(compareSelector));

  return failures.length;
}
