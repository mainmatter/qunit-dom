import { type FoundElement } from '../assertions';

export default function matchesSelector(elements: Element[], compareSelector: string): number {
  let failures = elements.filter(it => !it.matches(compareSelector));

  return failures.length;
}

export function filterElements(elements: FoundElement[]): Element[] {
  return elements.filter(el => el instanceof Element) as Element[];
}
