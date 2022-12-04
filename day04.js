const fs = require('fs');


function countOverlappingPairs(input) {
  return input.split('\n').filter(el => {
    const [first, second] = el.split(',');
    const [firstStart, firstEnd] = first.split('-');
    const [secondStart, secondEnd] = second.split('-');
    return +firstStart >= +secondStart && +firstStart <= +secondEnd ||
      +secondStart >= +firstStart && +secondStart <= +firstEnd;
  }).length;
}
fs.readFile('input.txt', (e, data) => {
  console.log(countOverlappingPairs(data.toString()));
})