'use strict';

const qBirthDate = prompt('When were you birth year?', '2000')?.trim()
								 ?? alert('Unfortunatly you didnt pass your birth date');
const qBirthPlace = prompt('What city do you live in?', 'Kyiv')?.trim()
								 ?? alert('Unfortunatly you didnt pass the city your live in');
const qFavoriteSport = prompt('What is your favoirte sport?', 'Boxing')?.trim()
								 ?? alert('Unfortunatly you didnt pass your favorite sport');

let showBirthPlace = '';
let showSports = ''
const showAge = (qBirthDate && Number(qBirthDate) && (Number(qBirthDate) < 2024)) 
							? 2024 - qBirthDate
							: 'Canceled or invalid input';

if (!qBirthPlace) showBirthPlace = 'Canceled or invalid input';
else if (qBirthPlace.toLowerCase() === 'kyiv') showBirthPlace = 'Y live in UKRAINE';
else if (qBirthPlace.toLowerCase() === 'london') showBirthPlace = 'Y live in England';
else if (qBirthPlace.toLowerCase() === 'washington') showBirthPlace = 'Y live in USA';
else showBirthPlace = `Y live in ${qBirthPlace} city`;

if (!qFavoriteSport) showSports = 'Canceled or invalid input';
else if (qFavoriteSport.toLowerCase() === 'boxing') showSports = `Cool! Y wana be an Usik?`;
else if (qFavoriteSport.toLowerCase() === 'swimming') showSports = `Cool! Y wana be an Phelps?`;
else if (qFavoriteSport.toLowerCase() === 'tennis') showSports = `Cool! Y wana be an Williams?`;
else showSports = `Cool, Y wana be an ${qFavoriteSport}!`;

alert(`age: ${showAge}\n Birth: ${showBirthPlace} \n Sport: ${showSports}`);



