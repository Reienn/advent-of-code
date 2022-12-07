const fs = require('fs');

function getDirToDelete(input, requiredSpace, totalSpace) {
  const sizeByFolder = {};
  let path = [];
  input.split('\n').forEach(line => {
    if (!line) { return; }
    const dirName = line.match(/\$ cd ([\w\/.]+)/)?.[1];
    if (dirName === '/') {
      path = [dirName];
      return;
    }
    if (dirName === '..') {
      path.pop();
      return;
    }
    if (dirName) {
      path.push(dirName);
      return;
    }
    const size = line.match(/(\d+) .+/)?.[1];
    if (size) {
      path.forEach((dir, i) => {
        const key = path.slice(0, i).join('') + dir;
        if (!sizeByFolder[key]) {
          sizeByFolder[key] = 0;
        }
        sizeByFolder[key] += +size;
      });
      return;
    }
  });
  let smallest;
  const availableSpace = totalSpace - sizeByFolder['/'];
  const spaceToFree = requiredSpace - availableSpace;
  Object.values(sizeByFolder).forEach(val => {
    if (val < spaceToFree) { return; }
    if (!smallest || val < smallest) {
      smallest = val;
    }
  });
  return smallest;
}
fs.readFile('input.txt', (e, data) => {
  console.log(getDirToDelete(data.toString(), 30000000, 70000000));
})