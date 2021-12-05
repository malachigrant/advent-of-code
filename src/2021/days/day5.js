import { readInput } from '../helpers/index.js';

function addGridCell(grid, x, y) {
  if (!grid[y]) {
    grid[y] = [];
  }
  if (!grid[y][x]) {
    grid[y][x] = 0;
  }
  grid[y][x]++;
  if (grid[y][x] === 2) {
    return 1;
  }
  return 0;
}

function addGridLine(grid, x1, y1, x2, y2) {
  let countGreater = 0;
  if (x1 === x2) {
    for (let y = Math.min(y1,y2); y <= Math.max(y1, y2); y++) {
      addGridCell(grid, x1, y);
      if (grid[y][x1] === 2) {
        countGreater++;
      }
    }
  } else if (y1 === y2) {
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      addGridCell(grid, x, y1);
      if (grid[y1][x] === 2) {
        countGreater++;
      }
    }
  } else {
    for (let i = 0; i <= Math.abs(x1 - x2); i++) {
      let x,y;
      if (x1 < x2) {
        x = x1 + i;
      } else {
        x = x1 - i;
      }
      if (y1 < y2) {
        y = y1 + i;
      } else {
        y = y1 - i;
      }
      addGridCell(grid, x, y);
      if (grid[y][x] === 2) {
        countGreater++;
      }
    }
  }
  return countGreater;
}

export function part1(fileName) {
  const arr = readInput(fileName);
  let grid = [];
  let countGreater = 0;
  arr.forEach((item) => {
    const [lineStart, lineEnd] = item.split(' -> ');
    const [x1, y1] = lineStart.split(',');
    const [x2, y2] = lineEnd.split(',');
    if (x1 === x2 || y1 === y2) {
      countGreater += addGridLine(grid, x1, y1, x2, y2);
    }
  });
  return countGreater;
}

export function part2(fileName) {
  const arr = readInput(fileName);
  let grid = [];
  let countGreater = 0;
  arr.forEach((item) => {
    const [lineStart, lineEnd] = item.split(' -> ');
    const [x1, y1] = lineStart.split(',').map(Number);
    const [x2, y2] = lineEnd.split(',').map(Number);
    countGreater += addGridLine(grid, x1, y1, x2, y2);
  });
  return countGreater;
}