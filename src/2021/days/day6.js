import { readLine } from '../helpers/index.js';

function simulateDays(arr, days) {
  let fishList = arr.split(',').map(Number);
  const newArr = new Array(9).fill(0);
  fishList.forEach(fish => {
    newArr[fish]++;
  });
  for (let i = 0; i < days; i++) {
    const newCount = newArr[0];
    for (let j = 0; j < 8; j++) {
      newArr[j] = newArr[j + 1];
    }
    newArr[6] += newCount;
    newArr[8] = newCount;
  }
  return newArr.reduce((acc, curr) => acc + curr);
}

export function part1(fileName) {
  const arr = readLine(fileName);
  return simulateDays(arr, 80);
}

export function part2(fileName) {
  const arr = readLine(fileName);
  return simulateDays(arr, 256);
}