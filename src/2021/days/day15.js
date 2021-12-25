import { parseGrid } from '../helpers/index.js';

function findNeighbours(grid, x, y) {
  const neighbours = [];
  for (let i = -1; i <= 1; i+=2) {
    if (x + i >= 0 && x + i < grid[0].length) {
      neighbours.push({y, x: x + i});
    }
    if (y + i >= 0 && y + i < grid.length) {
      neighbours.push({y: y + i, x});
    }
  }
  return neighbours;
}

function findMinPath(grid, x, y) {
  const searching = [{x,y,cost: 0}];
  const visited = new Set();
  while (searching.length) {
    const { x, y, cost } = searching.shift();
    if (x === grid[0].length - 1 && y === grid.length - 1) {
      return cost;
    }
    const neighbours = findNeighbours(grid, x, y)
      .filter(({x, y}) => !visited.has(`${x},${y}`));
    neighbours.forEach(({ x, y }) => {
      visited.add(`${x},${y}`);
      searching.push({x, y, cost: cost + grid[y][x]});
    });
    searching.sort((a,b) => (a.cost - b.cost));
  }
}

export function part1(fileName) {
  const grid = parseGrid(fileName, { mapFn: Number});
  return findMinPath(grid, 0, 0);
}

export function part2(fileName) {
  const startGrid = parseGrid(fileName, { mapFn: Number});
  const grid = [];
  for (let i = 0; i < 5; i++) {
    startGrid.forEach(row => {
      grid.push(row.map(cell => ((cell + i - 1) % 9)+1));
    });
  }
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    const newRow = [];     
    for (let i = 0; i < 5; i++) {
      row.forEach(cell => {
        newRow.push(((cell + i - 1) % 9) + 1);
      });
    }
    grid[y] = newRow;
  }

  return findMinPath(grid, 0, 0);
}