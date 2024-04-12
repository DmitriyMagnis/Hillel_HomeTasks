'use strict';

const numberInput = prompt('Enter valid integer', 2)?.trim();
let outputString = '';

if (numberInput && +numberInput) {
  for (let i = 1; i <= 100; i++) {
    if (+numberInput < 1) {
      outputString = 'no valid numbers';
      break;
    }
    const squaredNumber = i ** 2;
    if (squaredNumber <= +numberInput) {
      outputString += i + ' ==> ';
    }
  }
  console.log(outputString);
} else alert('wrong input');
