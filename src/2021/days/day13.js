import { readInput } from '../helpers/index.js';

function parseInput(inputFile) {
  const arr = readInput(inputFile);
  const grid = [];
  let lineBreak;
  let maxX = 0;
  let maxY = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '') {
      lineBreak = i;
      break;
    }
    const [x,y] = arr[i].split(',').map(Number);
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y);
    grid[y] = grid[y] || [];
    grid[y][x] = 1;
  }
  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      if (!grid[y]) {
        grid[y] = [];
      }
      if (!grid[y][x]) {
        grid[y][x] = 0;
      }
    }
  }
  return { grid, lineFolds: arr.slice(lineBreak + 1) };
}

function fold(grid, line) {
  const foldLine = line.split(' ')[2];
  const [axis, strVal] = foldLine.split('=');
  const value = Number(strVal);
  if (axis === 'y') {
    for (let i = 1; i <= value; i++) {
      if (!grid[value + i]) {
        continue;
      }
      grid[value + i].map((v, j) => {
        if (v === 1) {
          grid[value - i][j] = 1;
        }
        grid[value + i][j] = 0;
      });
    }
  } else {
    for (let i = 1; i <= value; i++) {
      grid.forEach((line, j) => {
        if (line[value + i] === 1) {
          line[value - i] = 1;
        }
        line[value + i] = 0;
      });
    }
  }
}

export function part1(fileName) {
  const { grid, lineFolds } = parseInput(fileName);
  fold(grid, lineFolds[0]);
  return grid.reduce((gridAcc, line) => {
    return gridAcc + line.reduce((acc, v) => {
      return acc + v;
    }, 0);
  }, 0);
}

export function part2(fileName) {
  const { grid, lineFolds } = parseInput(fileName);
  lineFolds.forEach(line => {
    fold(grid, line);
  });
  console.log(grid.slice(0, 6).map(v => v.slice(0, 50).map(num => num ? '#' : ' ').join('')).join('\n'));
  return 'Check console';
}