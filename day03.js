const fs = require('fs');

const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const fullAlphabet = [...alphabet, ...alphabet.map(l => l.toUpperCase())];

function getPrioritiesSum(input) {
  const list = input.split('\n');
  return list.map((el, i) => {
    if (i % 3) { return; }
    const list1 = [...el];
    const list2 = [...list[i + 1]];
    const list3 = [...list[i + 2]];
    const badge = list1.find(type => list2.includes(type) && list3.includes(type));
    return fullAlphabet.indexOf(badge) + 1;
  }).reduce((p, c) => p + (c || 0) , 0);
}
fs.readFile('input.txt', (e, data) => {
  console.log(getPrioritiesSum(data.toString()));
})