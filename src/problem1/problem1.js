const sum_to_n_a = function (n) {
  if (n === 0) {
    return 0;
  }
  var result = 0;
  const _n = Math.abs(n);
  for (let i = 1; i <= _n; i++) {
    result += i;
  }
  return n < 0 ? result * -1 : result;
};

const sum_to_n_b = function (n) {
  if (n === 0) {
    return 0;
  }
  const _n = Math.abs(n);
  const factor = n < 0 ? -1 : 1;
  return (
    (Array.from(Array(_n).keys()).reduce((acc, curr) => acc + curr, 0) + _n) *
    factor
  );
};

var sum_to_n_c = function (n) {
  if (n === 0) {
    return 0;
  }
  const _n = Math.abs(n);
  const factor = n < 0 ? -1 : 1;
  return ((_n * (_n + 1)) / 2) * factor;
};
