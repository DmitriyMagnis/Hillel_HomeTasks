function product(number = 1) {
  return function (num = 1) {
    return number * num;
  };
}

const result = product(5)(2);

console.log(result);
