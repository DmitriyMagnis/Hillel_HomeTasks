const array = [1, 3, 4, 6, 2, 5, 7];

function removeElement(array = [], item) {
  const itemIndex = array.indexOf(item);

  if (itemIndex < 0) return;

  array.splice(itemIndex, 1);
}

removeElement(array, 4);

console.log(array); // Результат: [1, 3, 6, 2, 5, 7]
