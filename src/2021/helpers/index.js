import fs from 'fs';

/**
 * Read lines from a file and convert to numbers
 */
export function readInput(filePath) {
  return fs.readFileSync(`src/2021/inputs/${filePath}`, 'utf-8')
    .split('\n')
    .map(str => str.trim());
}

export function readLine(filePath) {
  return readInput(filePath)[0];
}

export function readNumberInput(filePath) {
  return readInput(filePath)
    .map(Number);
}

export function parseGrid(filePath, { mapFn = Number, separator = '' } = {}) {
  return readInput(filePath)
    .map(str => str.split(separator).map(mapFn));
}

export function binaryToDecimal(binary) {
  return parseInt(binary, 2);
}

export function getMinMax(input) {
  return {
    min: Math.min(...input),
    max: Math.max(...input)
  };
}

export function forEachCell(grid, callback) {
  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      callback(cell, x, y);
    });
  });
}

export function logGrid(grid, separator = '') {
  let output = '';
  grid.forEach(row => {
    output += row.join(separator) + '\n';
  });
  console.log(output);
}