// Visible logic based on jQuery's
// https://github.com/jquery/jquery/blob/4a2bcc27f9c3ee24b3effac0fbe1285d1ee23cc5/src/css/hiddenVisibleSelectors.js#L11-L13

export default function visible(el) {
  if (el === null) return false;
  if (el.offsetWidth === 0 || el.offsetHeight === 0) return false;

  let clientRects = el.getClientRects();
  if (clientRects.length === 0) return false;
  for (let i = 0; i < clientRects.length; i++) {
    let rect = clientRects[i];
    if (rect.width !== 0 && rect.height !== 0) return true;
  }

  return false;
}
