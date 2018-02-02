export default function collapseWhitespace(string) {
  return string
    .replace(/[\t\r\n]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^ /, '')
    .replace(/ $/, '');
}
