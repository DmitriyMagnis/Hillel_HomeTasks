'use strict';

const inputNumber = 10369;

const strigifiedNumber = String(inputNumber);

const addSpaces = strigifiedNumber.substring(0, 1) + ' ' 
								+ strigifiedNumber.substring(1, 2) + ' ' 
								+ strigifiedNumber.substring(2, 3) + ' ' 
								+ strigifiedNumber.substring(3, 4) + ' '  
								+ strigifiedNumber.substring(4, 5);

console.log(addSpaces);