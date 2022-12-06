const fs = require('fs');

function countCharactersBeforeFirstMarker(input, position) {
  const list = [...input];
  let index;
  list.find((_, i) => {
    if (i < position) { return; }
    const lastFour = list.slice(i-position, i);
    const uniq = [...new Set(lastFour)];
    if (uniq.length === position) {
      index = i;
      return true;
    }
  });
  return index;
}
fs.readFile('input.txt', (e, data) => {
  console.log(countCharactersBeforeFirstMarker(data.toString(), 14));
})