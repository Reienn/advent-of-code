const fs = require('fs');

const valuesMap = {
  A: 1, // Rock
  B: 2, // Paper
  C: 3, // Scissors
};
const scoreMap = {
  X: 0,
  Y: 3,
  Z: 6,
};

function getTotalScore(input) {
  const roundScores = input.split('\n').map(el => {
    const [opponent, result] = el.split(' ');
    let valueToChoose;
    switch (result) {
      case 'Y':
        valueToChoose = opponent;
        break;
      case 'X':
        valueToChoose = opponent === 'A' ? 'C' :
          opponent === 'B' ? 'A' :
          'B';
        break;
      case 'Z':
        valueToChoose = opponent === 'A' ? 'B' :
          opponent === 'B' ? 'C' :
          'A';
        break;
      default:
        break;
    }
    return scoreMap[result] + valuesMap[valueToChoose];
  });
  return roundScores.reduce((p, c) => +p + +c, 0);
}
fs.readFile('input.txt', (e, data) => {
  console.log(getTotalScore(data.toString()));
})