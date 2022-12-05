const fs = require('fs');

function getTopRearranged(input) {
  const cols = [];
  input.split('\n').forEach(el => {
    if (el.startsWith('move')) {
      const match = el.match(/move (\d+) from (\d+) to (\d+)/);
      if (!match) { return; }
      const [_, count, from, to] = match;
      const moving = cols[+from - 1].splice(0, +count);
      cols[+to - 1].unshift(...moving);
      return;
    }
    if (!el.includes('1')) {
      [...el].filter((_, i) => i % 4 === 1).forEach((char, i) => {
        if (char === ' ') { return; }
        if (!cols[i]) {
          cols[i] = [];
        }
        cols[i].push(char);
      })
    }
  });
  return cols.map(el => el[0]).join('');
}
fs.readFile('input.txt', (e, data) => {
  console.log(getTopRearranged(data.toString()));
})