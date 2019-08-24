export default function (value, min, max, rangeMin, rangeMax) {
  const offset = rangeMin;
  const ratio = (rangeMax - rangeMin) / (max - min);
  return ratio * (value - min) + offset;
}