import { readNumberInput, readInput } from '../helpers/index.js';

function parseBingo(arr, index) {
  const bingoGrid = [];
  for (let y = 0; y < 5; y++) {
    const line = arr[index + y];
    bingoGrid[y] = line.split(/\s+/).map(num => ({ num: parseInt(num), checked: false }));
  }
  return bingoGrid;
}

function checkBingos(bingos, num) {
  bingos.forEach(bingo => {
    bingo.forEach(line => {
      line.forEach(cell => {
        if (cell.num == num) {
          cell.checked = true;
        }
      });
    });
  });

  let bingoIndexes = [];
  for (let index = 0; index < bingos.length; index++) {
    const bingo = bingos[index];
    for (let i = 0; i < bingo.length; i++) {
      const line = bingo[i]
        if (line.every(cell => cell.checked)) {
          bingoIndexes.push(index);
      }
    }
    for (let x = 0; x < 5; x++) {
      let allChecked = true;
      for (let y = 0; y < 5; y++) {
        if (bingo[y][x].checked === false) {
          allChecked = false;
        }
      }
      if (allChecked) {
        bingoIndexes.push(index);
      }
    }
  };
  return bingoIndexes;
}

function calculateBingoUnmarkedSum(bingos, index) {
  const bingo = bingos[index];
  if (!bingo) {
    console.log(bingos.length, index);
  }
  return bingo.reduce((total, line) => {
    return total + line.reduce((acc, curr) => {
      if (!curr.checked) {
        return acc += curr.num;
      }
      return acc;
    }, 0);
  }, 0);
}

export function part1(fileName) {
  const arr = readInput(fileName);
  let bingos = [];
  const nums = arr[0].split(',');
  let bingoIndex = -1;
  let winningNum = -1;
  for (let i = 2; i < arr.length; i += 6) {
    bingos.push(parseBingo(arr, i));
  }
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const result = checkBingos(bingos, num);
    if (result.length > 0) {
      bingoIndex = result[0];
      winningNum = num;
      break;
    }
  }
  return calculateBingoUnmarkedSum(bingos, bingoIndex) * winningNum;
}

export function part2(fileName) {
  const arr = readInput(fileName);
  let bingos = [];
  const nums = arr[0].split(',');
  let winningNum = -1;
  for (let i = 2; i < arr.length; i += 6) {
    bingos.push(parseBingo(arr, i));
  }
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const result = checkBingos(bingos, num);
    if (result.length > 0) {
      if (bingos.length === 1) {
        winningNum = num;
        break;
      } else {
        bingos = bingos.filter((_, index) => !result.includes(index));
      }
    }
  }
  return calculateBingoUnmarkedSum(bingos, 0) * winningNum;
}