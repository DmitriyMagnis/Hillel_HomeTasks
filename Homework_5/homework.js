'use strict';

const userInput = prompt('Enter your number', 333)?.replace(/\s/g, '');

if(!userInput || !Number(userInput)) alert('Invalid input');
else if (userInput.length !== 3) alert('Must be 3 digits');
else if ((userInput.charAt(0) === userInput.charAt(1))  
				&& (userInput.charAt(1) === userInput.charAt(2)) 
				&& (userInput.charAt(0) === userInput.charAt(2))
			) alert('All numbers are the same!');
else if((userInput.charAt(0) === userInput.charAt(1)) 
				|| (userInput.charAt(1) === userInput.charAt(2)) 
				|| (userInput.charAt(0) === userInput.charAt(2))
			) alert('At lease 2 numbers match!');
else 		alert('All numbers are deffrent!');
