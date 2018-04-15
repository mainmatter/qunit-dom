export default function collapseWhitespace(string) {
  return string
    .replace(/\s+/g, ' ')
    .replace(/\u200b+/g, '')
    .replace(/^ /, '')
    .replace(/ $/, '');
}
