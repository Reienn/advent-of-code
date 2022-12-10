const fs = require('fs');

function getSignalStrengthsSum(input, cycles) {
  let sum = 0;
  let cycle = 1;
  let x = 1;
  input.split('\n').map(line => {
    cycle++;
    const val = line?.match(/addx (-?\d+)/)?.[1];
    if (val) {
      if (cycles.includes(cycle)) {
        sum += cycle * x;
      }
      x += +val;
      cycle++;
    }
    if (cycles.includes(cycle)) {
      sum += cycle * x;
    }
  });
  return sum;
}

function renderImage(input, width, height) {
  let cycle = 0;
  let x = 1;
  let output = [];
  let currentPixel = [0,0];

  const countOutput = () => {
    if (currentPixel[0] + 1 === width) {
      const row = currentPixel[1] + 1;
      currentPixel = [0, row === height ? 0 : row];
    } else {
      currentPixel[0]++;
    }
    if (!output[currentPixel[1]]) {
      output[currentPixel[1]] = [];
    }
    const value = [x - 1, x, x + 1].includes(currentPixel[0]) ? '#' : '.';
    output[currentPixel[1]].push(value);
  }

  input.split('\n').map(line => {
    cycle++;
    const val = line?.match(/addx (-?\d+)/)?.[1];
    if (val) {
      countOutput();
      x += +val;
      cycle++;
    }
    countOutput();
  });
  return output.map(el => el.join('')).join('\n');
}

fs.readFile('input.txt', (e, data) => {
  // console.log(getSignalStrengthsSum(data.toString(), [20, 60, 100, 140, 180, 220]));
  console.log(renderImage(data.toString(), 40, 6));
})