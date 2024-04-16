function printChoise() {
  let input = null;
  for (let i = 0; i < 10; i++) {
    input = prompt(`Enter number greater then 100: Attempt ${i + 1}`);
    if (input > 100) {
      console.log('Number: ' + input);
      console.log('Attempt: ' + (i + 1));
      break;
    }
  }
}
printChoise(printChoise);
