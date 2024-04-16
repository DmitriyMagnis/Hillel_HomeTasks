// const message = prompt('Enter yor strinng');
// const chars = prompt('Enter some chars for removing');

// const charsToArray = chars ? chars.split('') : [];

// function removeChars(string, charsArr) {
//   if (!string) return 'wrong string';
//   if (!charsArr.length) return string;

//   //string.replace(new RegExp(value, 'g'), '')
//   return charsArr.reduce(
//     (accStr, chars) =>
//       accStr
//         .split('')
//         .filter(s => s !== chars)
//         .join(''),
//     string
//   );
// }

// const result = removeChars(message, charsToArray);

// alert(result);

const a = [5, 7, 2, 1];
a.sort((a, b) => {
  if (a < b) return 1;
  else if (a > b) return -1;
  return 0;
});
console.log(a);
