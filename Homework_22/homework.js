const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 8];

const getEvenNumbers = (arr = []) => {
  if (!Array.isArray(arr)) throw Error('wrong Input');
  return arr.filter(value => value % 2 === 0);
};

const even = getEvenNumbers(arr);
console.log(even); // [2, 4, 6, 8]
