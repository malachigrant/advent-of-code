import { readNumberInput, readInput, binaryToDecimal } from '../helpers/index.js';

export function part1(fileName) {
  const arr = readInput(fileName);
  let strGamma = '';
  for (let pos = 0; pos < arr[0].length; pos++) {
    let count0 = 0;
    for (let i = 0; i < arr.length; i++) {
      const num = arr[i].charAt(pos);
      if (num === '0') {
        count0++;
      }
    }
    if (count0 > (arr.length / 2)) {
      strGamma += '0';
    } else {
      strGamma += '1';
    }
  }
  let strEpsilon = strGamma.split('').reduce((acc, curr) => acc += (curr === '0' ? '1' : '0'), '');
  const gamma = binaryToDecimal(strGamma);
  const epsilon = binaryToDecimal(strEpsilon);
  return gamma * epsilon;
}

function splitByIndex(arr, index) {
  const ones = arr.filter(str => str.charAt(index) === '1');
  const zeros = arr.filter(str => str.charAt(index) === '0');
  return ones.length >= zeros.length ? [ones, zeros] : [zeros, ones];
}

export function part2(fileName) {
  const originalArr = readInput(fileName);
  let arr = originalArr.slice(0);
  const length = arr[0].length;
  // calculate ogr
  for (let i = 0; i < length; i++) {
    const [most, least] = splitByIndex(arr, i);
    arr = most;
  }
  const ogr = binaryToDecimal(arr[0]);
  arr = originalArr.slice(0);
  // calculate csr
  for (let i = 0; i < length; i++) {
    const [most, least] = splitByIndex(arr, i);
    arr = least;
    if (arr.length === 1) {
      break;
    }
  }
  const csr = binaryToDecimal(arr[0]);
  return ogr * csr;
}