import { getMinMax, readLine } from '../helpers/index.js';

// fuelFn takes difference between center and current value
function calculateFuel(arr, center, fuelFn) {
  return arr.reduce((acc, curr) => {
    return acc + fuelFn(Math.abs(curr - center));
  }, 0);
}

function calculateFuel1(arr, center) {
  return calculateFuel(arr, center, (n) => n);
}

function calculateFuel2(arr, center) {
  return calculateFuel(arr, center, n => n * ( n + 1 ) / 2);
}

// probably not the most efficient way to do this
function findMinFuel(arr, fuelFn) {
  const { min, max } = getMinMax(arr);
  let minFuel;
  for (let i = min; i <= max; i++) {
    const fuel = fuelFn(arr, i);
    if (!minFuel || fuel < minFuel) {
      minFuel = fuel;
    }
  }
  return minFuel;
}

export function part1(fileName) {
  const arr = readLine(fileName).split(',').map(Number);
  return findMinFuel(arr, calculateFuel1);
}

export function part2(fileName) {
  const arr = readLine(fileName).split(',').map(Number);
  return findMinFuel(arr, calculateFuel2);
}