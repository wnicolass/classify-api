export default function getKeyByValue(obj, value) {
  return Object.keys(obj).find((key) => obj[key] === value);
}
