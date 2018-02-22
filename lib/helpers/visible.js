// Visible logic based on jQuery's
// https://github.com/jquery/jquery/blob/4a2bcc27f9c3ee24b3effac0fbe1285d1ee23cc5/src/css/hiddenVisibleSelectors.js#L11-L13

export default function visible(el) {
  return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}
