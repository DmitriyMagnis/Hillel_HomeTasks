const array = [{}, 1, 2, 3, 4, 5, 9, 'string', null];

function average(array = []) {
  if (!Array.isArray(array)) return 'wrong input';

  const allDigits = array.filter(v => typeof v === 'number');

  if (!allDigits.length) return 'no digits found';

  const makeSum = allDigits.reduce((sum, d) => sum + d, 0);

  return makeSum / allDigits.length;
}

const result = average(array);

console.log(result);
