import { readNumberInput } from "../helpers/index.js";

// sum ascending
export function part1(fileName) {
  const arr = readNumberInput(fileName);
  let sum = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i + 1] > arr[i]) {
      sum++;
    }
  }
  return sum;
}

export function part2(fileName) {
  const arr = readNumberInput(fileName);
  let sum = 0;
  for (let i = 0; i < arr.length - 3; i++) {
    if (arr[i] + arr[i + 1] + arr[i + 2] < arr[i+1] + arr[i+2] + arr[i+3]) {
      sum++;
    }
  }
  return sum;
}