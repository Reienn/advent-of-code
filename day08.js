const fs = require('fs');

function countVisibleTrees(input) {
  const rows = input.split('\n');
  const cols = [];
  rows.forEach(row => {
    [...row].forEach((el, i) => {
      if (!cols[i]) {
        cols[i] = []
      }
      cols[i].push(el);
    })
  });
  let visibleCount = 0;
  rows.forEach((row, rowIndex) => {
    const rowList = [...row];
    const rowVisibleCount = rowList.filter((height, colIndex) => {
      const hiddenLeft = rowList.slice(0, colIndex).some(el => +el >= +height);
      if (!hiddenLeft) {
        return true;
      }
      const hiddenRight = rowList.slice(colIndex + 1, rowList.length).some(el => +el >= +height);
      if (!hiddenRight) {
        return true;
      }
      const hiddenTop = cols[colIndex].slice(0, rowIndex).some(el => +el >= +height);
      if (!hiddenTop) {
        return true;
      }
      const hiddenBottom = cols[colIndex].slice(rowIndex + 1, cols[colIndex].length).some(el => +el >= +height);
      if (!hiddenBottom) {
        return true;
      }
    }).length;
    visibleCount += rowVisibleCount;
  });
  return visibleCount;
}

function countVisible(list, height) {
  let counter = 0;
  list.every(val => {
    counter++;
    return +val < +height;
  });
  return counter;
}

function getHighestScenicScore(input) {
  const rows = input.split('\n');
  const cols = [];
  rows.forEach(row => {
    [...row].forEach((el, i) => {
      if (!cols[i]) {
        cols[i] = []
      }
      cols[i].push(el);
    })
  });
  let highestScore = 0;
  rows.forEach((row, rowIndex) => {
    const rowList = [...row];
    rowList.filter((height, colIndex) => {
      const visibleLeft = countVisible(rowList.slice(0, colIndex).reverse(), height);
      const visibleRight = countVisible(rowList.slice(colIndex + 1, rowList.length), height);
      const visibleTop = countVisible(cols[colIndex].slice(0, rowIndex).reverse(), height);
      const visibleBottom = countVisible(cols[colIndex].slice(rowIndex + 1, cols[colIndex].length), height);
      const score = visibleLeft * visibleRight * visibleTop * visibleBottom;
      if (score > highestScore) {
        highestScore = score;
      }
    });
  });
  return highestScore;
}
fs.readFile('input.txt', (e, data) => {
  console.log(getHighestScenicScore(data.toString()));
})