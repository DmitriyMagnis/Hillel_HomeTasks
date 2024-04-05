'use strict';

const userNameInput = prompt('Whats your name?', 'Dima')?.trim();

if (!userNameInput) alert('You didnt enter your name!');
else alert(`Hello, ${userNameInput}! How are you?`);




