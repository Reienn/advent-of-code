const fs = require('fs');

function getMaxValues(input, howManyValues) {
  const list = input.split('\n\n').map(el => el.split('\n').reduce((p, c) => +p + +c), 0);
  const sorted = list.sort((a, b) => b - a);
  return sorted.slice(0, howManyValues).reduce((p, c) => +p + +c, 0);
}
fs.readFile('input.txt', (e, data) => {
  console.log(getMaxValues(data.toString(), 3));
})