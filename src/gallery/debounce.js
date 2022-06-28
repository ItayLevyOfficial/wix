export default function debounce(fn, ms = 200) {
  return (...args) => {
    return setTimeout(() => fn.apply(this, args), ms);
  };
}
