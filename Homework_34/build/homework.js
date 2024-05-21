'use strict';
class Calculator {
    add(...numbers) {
        if (!numbers.length)
            return 'wrong input';
        return numbers
            .reduce((sum, num) => sum.plus(num), new BigNumber(0))
            .toNumber();
    }
    subtract(...numbers) {
        if (!numbers.length)
            return 'wrong input';
        return numbers
            .slice(1)
            .reduce((sum, num) => sum.minus(num), new BigNumber(numbers.at(0)))
            .toNumber();
    }
    multiply(...numbers) {
        if (!numbers.length)
            return 'wrong input';
        return numbers
            .reduce((sum, num) => sum.multipliedBy(num), new BigNumber(1))
            .toNumber();
    }
    divide(numerator, denominator) {
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
