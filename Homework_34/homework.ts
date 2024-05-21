'use strict';
//https://github.com/MikeMcl/bignumber.js
//Либа для точных вычислений

type UnionNumber = number | BigNumber | string;
declare class BigNumber {
  constructor(number: number | string);
  plus: (num: UnionNumber) => BigNumber;
  minus: (num: UnionNumber) => BigNumber;
  multipliedBy: (num: UnionNumber) => BigNumber;
  dividedBy: (num: UnionNumber) => BigNumber;
  toNumber: () => number;
}

class Calculator {
  add(...numbers: number[]): number | string {
    if (!numbers.length) return 'wrong input';

    return numbers
      .reduce((sum, num) => sum.plus(num), new BigNumber(0))
      .toNumber();
  }
  subtract(...numbers: number[]): number | string {
    if (!numbers.length) return 'wrong input';
    return numbers
      .slice(1)
      .reduce(
        (sum, num) => sum.minus(num),
        new BigNumber(numbers.at(0) as number)
      )
      .toNumber();
  }
  multiply(...numbers: number[]): number | string {
    if (!numbers.length) return 'wrong input';

    return numbers
      .reduce((sum, num) => sum.multipliedBy(num), new BigNumber(1))
      .toNumber();
  }
  divide(numerator: number, denominator: number): number | string {
    if (typeof numerator !== 'number' || typeof numerator !== 'number')
      return 'wrong input';
    return new BigNumber(numerator).dividedBy(denominator).toNumber();
  }
}
const calc = new Calculator();

console.log(calc.add(0.1, 0.2, 0.3)); // 0.6

console.log(calc.subtract(0.3, 0.1)); // 0.2

console.log(calc.multiply(0.1, 0.2)); // 0.02

console.log(calc.divide(0.3, 0.1)); // 0.2
