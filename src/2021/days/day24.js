import { readInput } from '../helpers/index.js';

function runLine(line, memory, inputValue) {
  const [instruction, a, b] = line.split(' ');
  function getB() {
    return b.match(/[wxyz]/) ? memory[b] : parseInt(b)
  }
  switch (instruction) {
    case 'inp':
      memory[a] = inputValue;
      break;
    case 'add':
      memory[a] = memory[a] + getB();
      break;
    case 'mul':
      memory[a] = memory[a] * getB();
      break;
    case 'div':
      memory[a] = Math.floor(memory[a] / getB());
      break;
    case 'mod':
      memory[a] = memory[a] % getB();
      break;
    case 'eql':
      memory[a] = memory[a] === getB() ? 1 : 0;
      break;
  }
}

export function part1(fileName) {
  const arr = readInput(fileName);

  let cache = {};
  for (let i = 0; i < 14; i++) {
    cache[i] = {};
  }

  for (let digit = 9; digit >= 1; digit--) {
    const memory = { w: 0, x: 0, y: 0, z: 0 };
    for (let i = 0; i < 18; i++) {
      const line = arr[i];
      runLine(line, memory, digit);
    }
    cache[0][memory.z] = { digit, str: digit.toString() };
  }

  const divMap = [];
  const add1Map = [];
  const add2Map = [];
  for (let i = 1; i < 14; i++) {
    divMap[i] = Number(arr[i*18+4].split(' ')[2]);
    add1Map[i] = Number(arr[i*18+5].split(' ')[2]);
    add2Map[i] = Number(arr[i*18+15].split(' ')[2]);
  }

  const numDigits = 14;
  let maxZ = 0;
  for (let digitIndex = 1; digitIndex < numDigits; digitIndex++) {
    Object.keys(cache[digitIndex-1]).forEach(key => {
      const currentZ = Number(key);
      if (currentZ > 10000000) {
        return;
      }
      const currentStr = cache[digitIndex-1][key].str;
      maxZ = Math.max(maxZ, currentZ);
      for (let digit = 9; digit >= 1; digit--) {
        const memory = { w: 0, x: 0, y: 0, z: currentZ };
        memory.x = memory.z % 26;
        const divNum = divMap[digitIndex];
        if (divNum === 26) {
          memory.z = Math.floor(memory.z / 26);
        }
        const addNum1 = add1Map[digitIndex];
        memory.x = memory.x + addNum1 === digit ? 0 : 1; // flipped because of double eql
        memory.z *= 25*memory.x + 1;
        const addNum2 = add2Map[digitIndex];
        memory.y = addNum2 + digit;
        memory.z += memory.y * memory.x;
        cache[digitIndex][memory.z] = { digit, str: currentStr + digit };
      }
    });
    cache[digitIndex-1] = undefined;
  }
  const keys = Object.keys(cache[13]);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (Number(key) === 0) {
      return cache[13][key].str; // hopefully the first one is the good one?
    }
  }
}

export function part2(fileName) {
  const arr = readInput(fileName);
  const divNums = [];
  const addNums1 = [];
  const addNums2 = [];
  for (let i = 0; i < 14; i++) {
    divNums[i] = Number(arr[i*18+4].split(' ')[2]);
    addNums1[i] = Number(arr[i*18+5].split(' ')[2]);
    addNums2[i] = Number(arr[i*18+15].split(' ')[2]);
  }

  const stack = [];
  let finalNum = [];
  for (let i = 0; i < 14; i++) {
    if (divNums[i] === 1) {
      stack.push([i, addNums2[i]]);
    } else {
      const [prevDigitIndex, prevAdd] = stack.pop();
      finalNum[prevDigitIndex] = Math.max(1, 1 - (prevAdd + addNums1[i]));
      finalNum[i] = finalNum[prevDigitIndex] + prevAdd + addNums1[i];
    }
  }
  return finalNum.join('');
}