'use strict';

//1. Привітатись з юзером - "Hello!";

alert('Hello');

//2. Спитати імя - "What is your name?";

const defaultName = 'Dmitriy';

const inputName = prompt('What is your name?', defaultName);
console.log(inputName);

// 3. Спитати з якої він країни - "Where are you from?";

const defaultCountry = 'Ukraine';

const inputLocation = prompt('Where are you from?', defaultCountry);
console.log(inputLocation);

//4. Вивести на екран - "Nice to meet you, {name}! You are from {country}!"

const concatenation = `Nice to meet you, ${inputName}! You are from ${inputLocation}!`;

confirm(concatenation);

console.log(concatenation);