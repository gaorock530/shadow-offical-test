export default function (min, max) {
  const diff = max - min;
  return Math.random() * diff + min;
}