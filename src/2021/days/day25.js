import { parseGrid, forEachCell } from '../helpers/index.js';

export function part1(fileName) {
  let grid = parseGrid(fileName);

  let hasMoved = true;
  let i = 0;
  while (hasMoved) {
    i++;
    const newGrid = grid.map(row => [...row]);
    hasMoved = false;
    forEachCell(grid, (cell, x, y) => {
      if (cell === '>') {
        let checkCoords = [x + 1, y];
        if (x === grid[0].length - 1) {
          checkCoords[0] = 0;
        }
        if (grid[checkCoords[1]][checkCoords[0]] === '.') {
          newGrid[checkCoords[1]][checkCoords[0]] = '>';
          newGrid[y][x] = '.';
          hasMoved = true;
        }
      }
    });
    grid = newGrid;
    const newnewGrid = grid.map(row => [...row]);
    forEachCell(grid, (cell, x, y) => {
      if (cell === 'v') {
        let checkCoords = [x, y + 1];
        if (y === grid.length - 1) {
          checkCoords[1] = 0;
        }
        if (grid[checkCoords[1]][checkCoords[0]] === '.') {
          newnewGrid[checkCoords[1]][checkCoords[0]] = 'v';
          newnewGrid[y][x] = '.';
          hasMoved = true;
        }
      }
    });
    grid = newnewGrid;
  }
  return i;
  
}