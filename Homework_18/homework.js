function printChoise() {
  for (let i = 1; i <= 10; i++) {
    const input = prompt(`Enter number greater then 100: Attempt ${i}`);
    if (input === null) {
      console.log('Task canceled');
      break;
    }
    //Number(null, '' etc) => 0 NaN < 100
    if (input > 100) {
      console.log('Number: ' + input);
      console.log('Attempt: ' + i);
      break;
    }
  }
}
printChoise(printChoise);
