function sumClosure(number = 0) {
  let sum = number;
  return function (num = 0) {
    return (sum += num);
  };
}

const sum = sumClosure(0);

console.log(sum(4)); // 4
console.log(sum(6)); // 10
console.log(sum(10)); // 20
console.log(sum(7)); // 27
