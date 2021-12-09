import { readInput } from '../helpers/index.js';

function arrayEqual(a, b) {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

function getNeighbours(grid, x, y) {
  const neighboursR = [];
  for (let i = x - 1; i <= x + 1; i+=2) {
    if (grid[y][i] !== undefined) {
      neighboursR.push([i, y]);
    }
  }
  for (let i = y - 1; i <= y + 1; i+=2) {
    if (grid[i] !== undefined)
      neighboursR.push([x, i]);
  }
  return neighboursR;
}

export function part1(fileName) {
  const arr = readInput(fileName);
  const grid = [];
  let sum = 0;
  arr.forEach((line, y) => {
    grid[y] = line.split('').map(Number);
  });
  grid.forEach((line, y) => {
    line.forEach((value, x) => {
      const neighbours = getNeighbours(grid, x, y);
      if (neighbours.every(([x, y]) => grid[y][x] > value)) {
        sum += value + 1;
      }
    });
  });
  return sum;
}

function findBasinSize(grid, x, y) {
  const visited = [];
  let sum = 0;
  let searchArray = Array();
  searchArray.push([x, y]);
  while (searchArray.length > 0) {
    searchArray = searchArray.sort((a, b) => grid[b[1]][b[0]] -grid[a[1]][a[0]]);
    const [searchX, searchY] = searchArray.pop();
    if (visited.find((coords => arrayEqual(coords, [searchX, searchY])))) {
      continue;
    }
    const neighbours = [...getNeighbours(grid, searchX, searchY)];
    if (neighbours.every(([neighbourX, neighbourY]) => visited.find(visitCoords => arrayEqual(visitCoords, [neighbourX, neighbourY])) || searchArray.find(visitCoords => arrayEqual(visitCoords, [neighbourX, neighbourY])) || (grid[neighbourY][neighbourX] > grid[searchY][searchX] && grid[searchY][searchX] !== 9))) {
      if (grid[searchY][searchX] !== 9) {
        sum++;
        neighbours.forEach((neighbour) => searchArray.unshift(neighbour));
      }
    }
    visited.push([searchX, searchY]);
  }
  return sum;
}

export function part2(fileName) {
  const arr = readInput(fileName);
  const grid = [];
  const basinSizes = [];
  arr.forEach((line, y) => {
    grid[y] = line.split('').map(Number);
  });
  grid.forEach((line, y) => {
    line.forEach((value, x) => {
      const neighbours = getNeighbours(grid, x, y);
      if (neighbours.every(([x, y]) => grid[y][x] > value)) {
        basinSizes.push(findBasinSize(grid, x, y));
      }
    });
  });
  return basinSizes.sort((a,b) => b - a).slice(0, 3).reduce((a, b) => a * b, 1);
}