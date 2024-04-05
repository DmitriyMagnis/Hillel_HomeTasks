'use strict';

const qBirthDate = prompt('When were you birth year?', '2000')
								 ?? alert('Unfortunatly you didnt pass your birth date');
const qBirthPlace = prompt('What city do you live in?', 'Kyiv')
								 ?? alert('Unfortunatly you didnt pass the city your live in');
const qFavoriteSport = prompt('What is your favoirte sport?', 'Boxing')
								 ?? alert('Unfortunatly you didnt pass your favorite sport');

let showBirthPlace = '';
let showSports = '';
const showAge = (qBirthDate === undefined)
							? 'canceled'
							: Number(qBirthDate)
							? 2024 - qBirthDate
							: 'invalid input';

if (qBirthPlace === undefined) showBirthPlace = 'Canceled';
else if (qBirthPlace.trim() === '') showBirthPlace = 'Empty';
else if (qBirthPlace.toLowerCase() === 'kyiv') showBirthPlace = 'Y live in UKRAINE';
else if (qBirthPlace.toLowerCase() === 'london') showBirthPlace = 'Y live in England';
else if (qBirthPlace.toLowerCase() === 'washington') showBirthPlace = 'Y live in USA';
else showBirthPlace = `Y live in ${qBirthPlace} city`;

if (qFavoriteSport === undefined) showSports = 'Canceled';
else if (qFavoriteSport.trim() === '') showSports = 'Empty';
else if (qFavoriteSport.toLowerCase() === 'boxing') showSports = `Cool! Y wana be an Usik?`;
else if (qFavoriteSport.toLowerCase() === 'swimming') showSports = `Cool! Y wana be an Phelps?`;
else if (qFavoriteSport.toLowerCase() === 'tennis') showSports = `Cool! Y wana be an Williams?`;
else showSports = `Cool, Y wana be an ${qFavoriteSport}!`;

alert(`age: ${showAge}\n Birth: ${showBirthPlace} \n Sport: ${showSports}`);



