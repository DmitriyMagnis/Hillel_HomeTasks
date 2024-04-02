'use strict';

const string = typeof 'string';
const number = typeof 3;
const undefineD = typeof undefined;
const nullable = `null -> typeof null = ${typeof null}`;
const bool = typeof true;
const bigInt = typeof 10n;
const object = typeof {};
const symbol = typeof Symbol('symbol');

const headString = 'There are 8 language types in JavaScript:';

console.log(
	headString + '\n' + string + '\n' + number + '\n' + undefineD + '\n' + nullable + '\n' + bool + '\n' + bigInt + '\n' + object + '\n' + symbol
);
