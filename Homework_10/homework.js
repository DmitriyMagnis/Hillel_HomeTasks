'use strict';

const currencyInput = prompt('Pick exchange course', 'USD, EUR')?.trim();
const USDCURRENCYRATE = 26;
const EURCURRENCYRATE = 46;
const OTHERCURRENCYRATE = 76;
let outputRates = '';

if (currencyInput) {
	let sign = '';
	let currencyrate = null;
	switch (currencyInput) {
		case 'USD':
			sign = '$';
			currencyrate = USDCURRENCYRATE;
			break;
		case 'EUR':
			sign = '€';
			currencyrate = EURCURRENCYRATE;
			break;
		default:
			sign = '¥';
			currencyrate = OTHERCURRENCYRATE;
			break;
	}

	for (let i = 10; i <= 100; i += 10) {
		outputRates += `${i + sign} => ${i * currencyrate}₴ \n`;
	}

	console.log(outputRates);

} else alert('wrong input');






