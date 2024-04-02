'use strict';

const defaultText = 'Input here';

const firstUserInput = prompt('Whats r name?', defaultText);
const secondUserInput = prompt('Where r you from?', defaultText);
const thirdUserInput = prompt('What do you do?', defaultText);

const resultString = `Hello, ${firstUserInput}.\n Your are from ${secondUserInput}.\n Your are working as ${thirdUserInput}`;

confirm(resultString);
