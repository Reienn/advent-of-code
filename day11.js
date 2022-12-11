const fs = require('fs');

function doOperation(item, operation) {
  const add = operation.match(/old \+ (\d+)/)?.[1];
  if (add) {
    return item + +add;
  }
  const addSelf = operation.match(/old \+ old/);
  if (addSelf) {
    return item + item;
  }
  const multiply = operation.match(/old \* (\d+)/)?.[1];
  if (multiply) {
    return item * +multiply;
  }
  const multiplySelf = operation.match(/old \* old/);
  if (multiplySelf) {
    return item * item;
  }
}

function countMonkeyBusiness(input, roundsNumber) {
  const monkeys = {};
  let multipliedDividers = 1;
  input.split('\n\n').map(round => {
    let monkeyNr, items, operation, testDivisibleBy, ifTrueThrowTo, ifFalseThrowTo;
    round.split('\n').map((line, i) => {
      switch (i % 6) {
        case 0:
          monkeyNr = line.match(/Monkey (\d+)/)?.[1];
          break;
        case 1:
          items = line.match(/Starting items: (.+)/)?.[1]?.split(', ').map(el => +el);
          break;
        case 2:
          operation = line.match(/Operation: new = (.+)/)?.[1];
          break;
        case 3:
          testDivisibleBy = +line.match(/Test: divisible by (\d+)/)?.[1];
          break;
        case 4:
          ifTrueThrowTo = line.match(/If true: throw to monkey (\d+)/)?.[1];
          break;
        case 5:
          ifFalseThrowTo = line.match(/If false: throw to monkey (\d+)/)?.[1];
          break;
      }
    });
    multipliedDividers *= testDivisibleBy;
    monkeys[monkeyNr] = {items, operation, testDivisibleBy, ifTrueThrowTo, ifFalseThrowTo, inspected: 0};
  });
  for (let i = 0; i < roundsNumber; i++) {
    Object.keys(monkeys).forEach(key => {
      const currentMonkey = monkeys[key];
      const indexesToRemove = [];
      currentMonkey.items.forEach((item, itemIndex) => {
        const newValue = doOperation(item, currentMonkey.operation) % multipliedDividers;
        const test = !(newValue % currentMonkey.testDivisibleBy);
        monkeys[test ? currentMonkey.ifTrueThrowTo : currentMonkey.ifFalseThrowTo].items.push(newValue);
        indexesToRemove.push(itemIndex);
        currentMonkey.inspected++;
      });
      indexesToRemove.reverse().forEach(indexToRemove => {
        currentMonkey.items.splice(indexToRemove, 1);
      });
    });
  }
  const sorted = Object.values(monkeys).map(el => el.inspected).sort((a, b) => b - a);
  return sorted[0] * sorted[1];
}

fs.readFile('input.txt', (e, data) => {
  console.log(countMonkeyBusiness(data.toString(), 10000));
})