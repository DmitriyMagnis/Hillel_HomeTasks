'use strict';
let inputNumber = null;

do {
	inputNumber = inputNumber || prompt('Enter number', 2);

	if (inputNumber && +inputNumber) {
		let isPrime = true;

		for (let i = 2; i < +inputNumber; i++) {
			if (+inputNumber % i === 0) {
				isPrime = false;
				break;
			}
		}

		alert(isPrime ? 'Prime' : 'Not Prime');
		inputNumber = prompt('Wana repeat?', 2);
	}

} while (inputNumber && +inputNumber);


