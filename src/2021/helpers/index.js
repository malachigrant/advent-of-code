import fs from 'fs';

/**
 * Read lines from a file and convert to numbers
 */
export function readInput(filePath) {
  return fs.readFileSync(`src/2021/inputs/${filePath}`, 'utf-8')
    .split('\n')
    .map(str => str.trim());
}

export function readNumberInput(filePath) {
  return readInput(filePath)
    .map(Number);
}

export function binaryToDecimal(binary) {
  return parseInt(binary, 2);
}