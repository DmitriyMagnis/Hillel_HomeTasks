const array = [1, 3, 4, 6, 2, 5, 7];

function removeElement(array = [], item) {
    const itemIndex = array.indexOf(item);
		const arrayWithoutItem = array.splice(itemIndex, 1);
		return arrayWithoutItem;
}

removeElement(array, 4);

console.log(array); // Результат: [1, 3, 6, 2, 5, 7]