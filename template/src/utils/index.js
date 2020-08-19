export const addFunc = function (a, b) {
  return a + b;
};
export const minusFunc = function (a, b) {
  return a - b;
};
export const IFFunc = function (a) {
  if (typeof a === 'string') {
    return a;
  } else {
    return String(a);
  }
};