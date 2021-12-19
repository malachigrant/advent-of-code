import { readNumberInput, readInput } from '../helpers/index.js';

function getBlockDistance([x, y, z], [x2, y2, z2]) {
  return Math.abs(x - x2) + Math.abs(y - y2) + Math.abs(z - z2);
}

function getDistance([x,y,z], [x2,y2,z2]) {
  return Math.pow(x - x2, 2) + Math.pow(y - y2, 2) + Math.pow(z - z2, 2);
}

function getMinMax([x, y, z], [x2, y2, z2]) {
  return `${Math.min(Math.abs(x - x2), Math.abs(y - y2), Math.abs(z - z2))},${Math.max(Math.abs(x - x2), Math.abs(y - y2), Math.abs(z - z2))}`;
}

function getInfo(a, b) {
  return `${getBlockDistance(a, b)},${getDistance(a, b)},${getMinMax(a, b)}`;
}

export function part1(fileName) {
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

  const scannerDistancesMap = [];
  scanners.forEach((scanner, i) => {
    const currentScannerDistMap = [];
    scannerDistancesMap[i] = currentScannerDistMap;
    for (let first = 0; first < scanner.length - 1; first++) {
      const firstBeaconCoords = scanner[first];
      currentScannerDistMap[first] = currentScannerDistMap[first] || [];
      for (let other = first + 1; other < scanner.length; other++) {
        const otherBeaconCoords = scanner[other];
        currentScannerDistMap[other] = currentScannerDistMap[other] || [];
        currentScannerDistMap[first][other] = getInfo(firstBeaconCoords, otherBeaconCoords);
        //currentScannerDistMap[other][first] = currentScannerDistMap[first][other];
      }
    }
  });

  const betweenScannerMappings = {};
  // check how many beacons are same distance between s1 and s2
  for (let i = 0; i < scanners.length - 1; i++) {
    for (let j = i + 1; j < scanners.length; j++) {
      const similarMap = {};
      const distMap1 = scannerDistancesMap[i];
      const distMap2 = scannerDistancesMap[j];
      // console.log(i, j, distMap1);
      for (let firstScannerFirstBeaconIndex = 0; firstScannerFirstBeaconIndex < distMap1.length; firstScannerFirstBeaconIndex++) {
        if (distMap1[firstScannerFirstBeaconIndex] === undefined) {
          continue;
        }
        for (let firstScannerSecondBeaconIndex = 0; firstScannerSecondBeaconIndex < distMap1[firstScannerFirstBeaconIndex].length; firstScannerSecondBeaconIndex++) {
          if (distMap1[firstScannerFirstBeaconIndex][firstScannerSecondBeaconIndex] === undefined) {
            continue;
          }
          for (let secondScannerFirstBeaconIndex = 0; secondScannerFirstBeaconIndex < distMap2.length; secondScannerFirstBeaconIndex++) {
            if (distMap2[secondScannerFirstBeaconIndex] === undefined) {
              continue;
            }
            for (let secondScannerSecondBeaconIndex = 0; secondScannerSecondBeaconIndex < distMap2[secondScannerFirstBeaconIndex].length; secondScannerSecondBeaconIndex++) {
              if (distMap2[secondScannerFirstBeaconIndex][secondScannerSecondBeaconIndex] === undefined) {
                continue;
              }
              const dist1 = distMap1[firstScannerFirstBeaconIndex][firstScannerSecondBeaconIndex];
              const dist2 = distMap2[secondScannerFirstBeaconIndex][secondScannerSecondBeaconIndex];
              if (dist1 === dist2) {
                // console.log('same dist', dist1);
                similarMap[`${firstScannerFirstBeaconIndex},${firstScannerSecondBeaconIndex}`] = `${secondScannerFirstBeaconIndex},${secondScannerSecondBeaconIndex},${dist1}`;
              }
            }
          }
        }
      }
      const beaconMappings = {};
      Object.keys(similarMap).forEach(key => {
        const [left1, left2] = key.split(',').map(Number);
        const [right1, right2] = similarMap[key].split(',').map(Number);
        beaconMappings[left1] = beaconMappings[left1] || {};
        beaconMappings[left2] = beaconMappings[left2] || {};
        beaconMappings[left1][right1] = (beaconMappings[left1][right1] || 0) + 1;
        beaconMappings[left2][right2] = (beaconMappings[left2][right2] || 0) + 1;
      });
      const finalMapping = {};
      Object.keys(beaconMappings).forEach(key => {
        const mapping = Object.keys(beaconMappings[key]).sort((a, b) => beaconMappings[key][b] - beaconMappings[key][a]);
        finalMapping[key] = mapping[0];
        if (i === 1 && j === 4) {
          console.log(beaconMappings);
        }
      });
      betweenScannerMappings[`${i},${j}`] = finalMapping;
      // console.log(i, j, finalMapping);
    }
  }
  // console.log(betweenScannerMappings);
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
  const finalSolutionMap = {};
  const scannerPositions = [[0,0,0]];
  scanners[0].forEach(val => {
    finalSolutionMap[`${val[0]},${val[1]},${val[2]}`] = true;
  });
  for (let i = 0; i < scanners.length - 1; i++) {
    for (let j = i + 1; j < scanners.length; j++) {
      if (betweenScannerMappings[`${i},${j}`] === undefined || Object.keys(betweenScannerMappings[`${i},${j}`]).length < 12) {
        continue;
      }
      const debugMap = betweenScannerMappings[`${i},${j}`];
      const coordMap = {};
      Object.keys(debugMap).forEach(key => {
        const tempBeaconIndex = debugMap[key];
        coordMap[scanners[i][key]] = scanners[j][tempBeaconIndex];
      });
      let finalDiff;
      let correctTransformFormat;
      let correctMultiplierFormat;
      transformFormats.some(transform => {
        return transformMultipliers.some(multiplier => {
          let diff;
          if (Object.keys(coordMap).every(key => {
            const coords1 = key.split(',').map(Number);
            const coords2 = transform.map((val, i) => coordMap[key][val] * multiplier[i]);
            const currentDiff = `${coords1[0] - coords2[0]},${coords1[1] - coords2[1]},${coords1[2] - coords2[2]}`;
            if (!diff) {
              diff = currentDiff;
              return true;
            } else {
              return diff === currentDiff;
            }
          })) {
            console.log('found', i, j);
            finalDiff = diff;
            console.log(scannerPositions[i]);
            scannerPositions[j] = finalDiff.split(',').map(Number).map((num, index) => num - (scannerPositions[i] ? scannerPositions[i][index] : 0));
            correctMultiplierFormat = multiplier;
            correctTransformFormat = transform;
            return true;
          } else {
            // console.log('failed', i, j);
          }
        });
      });
      if (i === 0 && j === 1) {
        scanners[j].map(val => {
          const transformedCoords = correctTransformFormat.map((tVal, i) => val[tVal] * correctMultiplierFormat[i]);
          finalSolutionMap[`${transformedCoords[0] + scannerPositions[j][0]},${transformedCoords[1] + scannerPositions[j][1]},${transformedCoords[2] + scannerPositions[j][2]}`] = true;
          return transformedCoords;
        });
      }
    }
  }

  console.log(scannerPositions);
  

  console.log(Object.keys(finalSolutionMap).length);
}

export function part2(fileName) {
  const arr = readInput(fileName);

}