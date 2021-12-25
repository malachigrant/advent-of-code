import { parseGrid } from '../helpers/index.js';

function arrayEqual(a, b) {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

function getNeighbours(grid, x, y) {
  const neighbours = [];
  for (let i = x - 1; i <= x + 1; i+=2) {
    if (grid[y][i] !== undefined) {
      neighbours.push([i, y]);
    }
  }
  for (let i = y - 1; i <= y + 1; i+=2) {
    if (grid[i] !== undefined)
      neighbours.push([x, i]);
  }
  return neighbours;
}

function findLows(grid) {
  const lows = [];
  grid.forEach((line, y) => {
    line.forEach((value, x) => {
      const neighbours = getNeighbours(grid, x, y);
      if (neighbours.every(([x, y]) => grid[y][x] > value)) {
        lows.push({x, y});
      }
    });
  });
  return lows;
}

export function part1(fileName) {
  const grid = parseGrid(fileName, { mapFn: Number});
  const lows = findLows(grid);
  return lows.reduce((acc, curr) => acc + grid[curr.y][curr.x] + 1, 0);
}

function arrIncludes(arr, itemArr) {
  return arr.find((item) => arrayEqual(item, itemArr));
}

function findBasinSize(grid, x, y) {
  const visited = [];
  function recursiveCheck(x, y) {
    if (grid[y][x] === 9 || arrIncludes(visited, [x, y])) {
      return 0;
    }
    const neighbours = getNeighbours(grid, x, y).sort((a, b) => {
      return grid[b[1]][b[0]] - grid[a[1]][a[0]];
    });
    if (neighbours.every((neighbour) => arrIncludes(visited, neighbour) || grid[neighbour[1]][neighbour[0]] >= grid[y][x])) {
      visited.push([x, y]);
      const result = neighbours.reduce((acc, curr) => acc + recursiveCheck(curr[0], curr[1]), 1);
      return result;
    } else {
      return 0;
    }
  }
  const result = recursiveCheck(x, y);
  return result;
}

export function part2(fileName) {
  const grid = parseGrid(fileName, { mapFn: Number});
  const basinSizes = [];
  const lows = findLows(grid);
  lows.forEach(({x, y}) => basinSizes.push(findBasinSize(grid, x, y)));
  return basinSizes.sort((a,b) => b - a).slice(0, 3).reduce((a, b) => a * b, 1);
}