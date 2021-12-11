import { forEachCell, parseGrid } from '../helpers/index.js';

function octFlash(grid, x, y) {
  const neighbours = [];
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i === x && j === y) continue;
      if (i < 0 || j < 0 || j >= grid.length || i >= grid[j].length) continue;
      neighbours.push([i, j]);
    }
  }
  let numFlashes = 1;
  neighbours.forEach(([x, y]) => {
    grid[y][x]++;
    if (grid[y][x] === 10) {
      numFlashes += octFlash(grid, x, y);
    }
  });
  return numFlashes;
}

export function part1(fileName) {
  const grid = parseGrid(fileName);
  let sum = 0;
  for (let i = 0; i < 100; i++) {
    forEachCell(grid, (value, x, y) => {
      grid[y][x]++;
      if (value === 9) {
        sum += octFlash(grid, x, y);
      }
    });
    forEachCell(grid, (cell, x, y) => {
      if (cell > 9) {
        grid[y][x] = 0;
      }
    });
  }
  return sum;
}

export function part2(fileName) {
  const grid = parseGrid(fileName);
  for (let i = 0; true; i++) {
    let cellsFlashed = 0;
    forEachCell(grid, (value, x, y) => {
      grid[y][x]++;
      if (value === 9) {
        cellsFlashed += octFlash(grid, x, y);
      }
    });
    forEachCell(grid, (cell, x, y) => {
      if (cell > 9) {
        grid[y][x] = 0;
      }
    });
    if (cellsFlashed === grid.length * grid[0].length) {
      return i + 1;
    }
  }
}