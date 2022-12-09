const fs = require('fs');

function countVisitedPositions(input) {
  const visitedPoints = ['0.0'];
  let hPosition = [0, 0];
  let tPosition = [0, 0];
  input.split('\n').forEach(line => {
      const [_, direction, steps] = line.match(/(\w) (\d+)/);
      for (let i = 0; i < +steps; i++) {
        const newX = direction === 'R' ? hPosition[0] + 1 : direction === 'L' ? hPosition[0] - 1 : hPosition[0];
        const newY = direction === 'U' ? hPosition[1] + 1 : direction === 'D' ? hPosition[1] - 1 : hPosition[1];
        hPosition = [newX, newY];
        const diffX = hPosition[0] - tPosition[0];
        const diffY = hPosition[1] - tPosition[1];
        const distanceX = Math.abs(diffX);
        const distanceY = Math.abs(diffY);
        if (!distanceY && distanceX > 1) {
          tPosition = [tPosition[0] + (diffX > 1 ? 1 : -1), tPosition[1]];
        }
        if (!distanceX && distanceY > 1) {
          tPosition = [tPosition[0], tPosition[1] + (diffY > 1 ? 1 : -1)];
        }
        if (distanceX && distanceY && (distanceX > 1 || distanceY > 1)) {
          tPosition = [tPosition[0] + (diffX > 0 ? 1 : -1), tPosition[1] + (diffY > 0 ? 1 : -1)];
        }
        const stringTPosition = `${tPosition[0]}.${tPosition[1]}`;
        if (!visitedPoints.includes(stringTPosition)) {
          visitedPoints.push(stringTPosition);
        }
      }
    });
  return visitedPoints.length;
}
function countVisitedPositionsMultiKnots(input, knots) {
  const visitedPoints = ['0.0'];
  let hPosition = [0, 0];
  // let tPosition = [0, 0];
  let knotsPositions = Array.from({length: knots}, () => [0, 0]);
  input.split('\n').forEach(line => {
      const [_, direction, steps] = line.match(/(\w) (\d+)/);
      for (let i = 0; i < +steps; i++) {
        const newX = direction === 'R' ? hPosition[0] + 1 : direction === 'L' ? hPosition[0] - 1 : hPosition[0];
        const newY = direction === 'U' ? hPosition[1] + 1 : direction === 'D' ? hPosition[1] - 1 : hPosition[1];
        hPosition = [newX, newY];
        knotsPositions.forEach((k, i) => {
          const prev = knotsPositions[i - 1] || hPosition;
          const diffX = prev[0] - k[0];
          const diffY = prev[1] - k[1];
          const distanceX = Math.abs(diffX);
          const distanceY = Math.abs(diffY);
          if (!distanceY && distanceX > 1) {
            knotsPositions[i] = [k[0] + (diffX > 1 ? 1 : -1), k[1]];
          }
          if (!distanceX && distanceY > 1) {
            knotsPositions[i] = [k[0], k[1] + (diffY > 1 ? 1 : -1)];
          }
          if (distanceX && distanceY && (distanceX > 1 || distanceY > 1)) {
            knotsPositions[i] = [k[0] + (diffX > 0 ? 1 : -1), k[1] + (diffY > 0 ? 1 : -1)];
          }
        });
        const tail = knotsPositions[knots - 1];
        const stringTPosition = `${tail[0]}.${tail[1]}`;
        if (!visitedPoints.includes(stringTPosition)) {
          visitedPoints.push(stringTPosition);
        }
      }
    });
  return visitedPoints.length;
}

fs.readFile('input.txt', (e, data) => {
  console.log(countVisitedPositionsMultiKnots(data.toString(), 9));
})