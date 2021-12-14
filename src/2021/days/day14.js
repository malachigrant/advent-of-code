import { readInput } from '../helpers/index.js';

function parseInput(fileName) {
  const arr = readInput(fileName);
  const start = arr[0];
  const rulesMap = {};
  arr.slice(2).forEach(rule => {
    const [from, to] = rule.split(' -> ');
    rulesMap[from] = to;
  });

  return { start, rulesMap};
}

function simulateConversion(start, rulesMap, iterations) {
  let pairCountMap = {};
  const newPairsMap = {};
  Object.keys(rulesMap).forEach(key => {
    const middleLetter = rulesMap[key];
    const [ leftLetter, rightLetter ] = key.split('');
    newPairsMap[key] = { added: middleLetter, newPairs: [leftLetter + middleLetter, middleLetter + rightLetter] };
  });
  let current = start.split('');
  for (let strIndex = 0; strIndex < current.length - 1; strIndex++) {
    const pair = current[strIndex] + current[strIndex + 1];
    pairCountMap[pair] = (pairCountMap[pair] || 0) + 1;
  }
  const letterSumMap = {};
  current.forEach(letter => {
    letterSumMap[letter] = (letterSumMap[letter] || 0) + 1;
  });
  for (let i = 0; i < iterations; i++) {
    const newAdditionsMap = {};
    Object.keys(pairCountMap).forEach(key => {
      const count = pairCountMap[key];
      const pairMapping = newPairsMap[key];
      if (pairMapping) {
        letterSumMap[pairMapping.added] = (letterSumMap[pairMapping.added] || 0) + count;
        for (let j = 0; j < pairMapping.newPairs.length; j++) {
          newAdditionsMap[newPairsMap[key].newPairs[j]] = (newAdditionsMap[newPairsMap[key].newPairs[j]] || 0) + count;
        }
      }
    });
    pairCountMap = newAdditionsMap;
  }

  let max = current[0];
  let min = current[0];
  Object.keys(letterSumMap).forEach(key => {
    if (letterSumMap[key] > letterSumMap[max]) {
      max = key;
    }
    if (letterSumMap[key] < letterSumMap[min]) {
      min = key;
    }
  });
  return letterSumMap[max] - letterSumMap[min];
}

export function part1(fileName) {
  const { start, rulesMap } = parseInput(fileName);
  return simulateConversion(start, rulesMap, 10);
}

export function part2(fileName) {
  const { start, rulesMap } = parseInput(fileName);
  return simulateConversion(start, rulesMap, 40);
}