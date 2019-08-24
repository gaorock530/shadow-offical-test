/**
 * 
 * @param {timestamp} t timestamp differece, progress 
 * @param {Number} b start point
 * @param {Number} c distance
 * @param {Time} d duration
 */
export default function easeInOutCubic(t, b, c, d) {
  t /= d/2;
  if (t<1) return c/2*t*t*t + b;
  t -= 2;
  return c/2*(t*t*t + 2) + b;
}