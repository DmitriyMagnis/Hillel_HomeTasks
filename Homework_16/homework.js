function sumClosure(number) {
  let sum = number ?? 0;
  return function (num) {
    return (sum += num ?? 0);
  };
}

const sum = sumClosure(0);

console.log(sum(4)); // 4
console.log(sum(6)); // 10
console.log(sum(10)); // 20
console.log(sum(7)); // 27
