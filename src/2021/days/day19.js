import { readNumberInput, readInput } from '../helpers/index.js';

function parseInput(fileName) {
  const arr = readInput(fileName);
  const scanners = [];
  let readingScanner = -1;
  arr.forEach(line => {
    if (line.startsWith('---')) {
      const scannerNum = Number(line.split(' ')[2]);
      scanners[scannerNum] = [];
      readingScanner = scannerNum;
      return;
    }
    if (line === '') {
      return;
    }
    scanners[readingScanner].push(line.split(',').map(Number));
  });
  return scanners;
}

const transformFormats = [
  [0, 1, 2],
  [0, 2, 1],
  [1, 0, 2],
  [1, 2, 0],
  [2, 0, 1],
  [2, 1, 0],
];
const transformMultipliers = [
  [1, 1, 1],
  [1, 1, -1],
  [1, -1, 1],
  [1, -1, -1],
  [-1, 1, 1],
  [-1, 1, -1],
  [-1, -1, 1],
  [-1, -1, -1],
];

function transformCoords(coords, format, multiplier) {
  return format.map((val, i) => coords[val] * multiplier[i]);
}

function addVec(a, b) {
  return a.map((val, i) => val + b[i]);
}

function subVec(a, b) {
  return a.map((val, i) => val - b[i]);
}

function findOverlap(...scanners) {
  const found = {};
  let overlapCount = 0;
  scanners.forEach(scanner => {
    scanner.forEach(scanner1Coords => {
      const coordStr = `${scanner1Coords[0]},${scanner1Coords[1]},${scanner1Coords[2]}`;
      if (found[coordStr]) {
        overlapCount++;
      }
      found[coordStr] = true;
    });
  });
  return overlapCount;
}

function findUniqueBeacons(scanners, scannerPositions) {
  const found = {};
  let count = 0;
  scanners.forEach((scanner, i) => {
    scanner.forEach(coord => {
      const translatedCoord = addVec(coord, scannerPositions[i]);
      const coordStr = `${translatedCoord[0]},${translatedCoord[1]},${translatedCoord[2]}`;
      if (!found[coordStr]) {
        count++;
      }
      found[coordStr] = true;
    });
  });
  return count;
}

function transformAndLocateScanners(scanners) {
  const unknownScanners = [...scanners.slice(1).map((_, i) => i + 1)];
  console.log(unknownScanners);
  const knownScannerPositions = [[0,0,0]]; // scanner 0 is the center point
  const knownsChecked = [];
  while (unknownScanners.length > 0) {
    for (let j = 0; j < knownScannerPositions.length; j++) {
      if (!knownScannerPositions[j] || knownsChecked[j]) {
        continue;
      }
      knownsChecked[j] = true;
      const knownScanner = scanners[j];
      for (let i = 0; i < unknownScanners.length; i++) {
        const unknownScanner = scanners[unknownScanners[i]];
        transformFormats.some(transform => {
          return transformMultipliers.some(multiplier => {
            return knownScanner.some(knownCoords => {
              return unknownScanner.some(unknownCoords => {
                const diff = subVec(knownCoords, transformCoords(unknownCoords, transform, multiplier));
                const translatedUnknownScanner = unknownScanner.map(coords => addVec(diff, transformCoords(coords, transform, multiplier)));
                const overlap = findOverlap(knownScanner, translatedUnknownScanner);
                if (overlap >= 12) {
                  knownScannerPositions[unknownScanners[i]] = addVec(diff, knownScannerPositions[j]);
                  unknownScanner.forEach((coord, coordIndex) => {
                    unknownScanner[coordIndex] = transformCoords(coord, transform, multiplier);
                  });
                  unknownScanners.splice(i, 1);
                  i--;
                  return true;
                }
              });
            });
          });
        });
      }
    }
  }
  return knownScannerPositions;
}

export function part1(fileName) {
  const scanners = parseInput(fileName);
  const knownScannerPositions = transformAndLocateScanners(scanners);
  return findUniqueBeacons(scanners, knownScannerPositions);
}

function getManhattanDistance(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
}

export function part2(fileName) {
  const scanners = parseInput(fileName);
  const scannerPositions = transformAndLocateScanners(scanners);
  let maxManhattanDistance = 0;
  for (let i = 0; i < scannerPositions.length - 1; i++) {
    for (let j = i + 1; j < scannerPositions.length; j++) {
      maxManhattanDistance = Math.max(maxManhattanDistance, getManhattanDistance(scannerPositions[i], scannerPositions[j]));
    }
  }
  return maxManhattanDistance;
}