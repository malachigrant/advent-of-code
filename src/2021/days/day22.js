import { readInput } from '../helpers/index.js';

export function part1(fileName) {
  const arr = readInput(fileName);
  const onArray = [];
  for (let i = 0; i < 101; i++) {
    onArray[i] = [];
    for (let j = 0; j < 101; j++) {
      onArray[i][j] = [];
      for (let k = 0; k < 101; k++) {
        onArray[i][j][k] = 0;
      }
    }
  }

  arr.forEach(line => {
    const [state, coords] = line.split(' ');
    const [xStr, yStr, zStr] = coords.split(',');
    const [xMin, xMax] = xStr.substring(2).split('..').map(Number);
    const [yMin, yMax] = yStr.substring(2).split('..').map(Number);
    const [zMin, zMax] = zStr.substring(2).split('..').map(Number);
    for (let x = xMin; x <= xMax; x++) {
      if (x < -50 || x > 50) {
        continue;
      }
      for (let y = yMin; y <= yMax; y++) {
        if (y < -50 || y > 50) {
          continue;
        }
        for (let z = zMin; z <= zMax; z++) {
          if (z < -50 || z > 50) {
            continue;
          }
          onArray[x+50][y+50][z+50] = state === 'on' ? 1 : 0;
        }
      }
    }
  });
  return onArray.reduce((acc, x) => {
    return acc + x.reduce((acc, y) => {
      return acc + y.reduce((acc, z) => {
        return acc + z;
      }, 0);
    }, 0);
  }, 0);
}

function checkOverlap([size1, position1], [size2, position2]) {
  if (position1.some((pos, i) => {
    return pos + size1[i] <= position2[i] || position2[i] + size2[i] < pos;
  })) {
    return false;
  }
  return true;
}

function subCube([size1, position1], [size2, position2]) {
  if (!checkOverlap([size1, position1], [size2, position2])) {
    return [[size1, position1]];
  }
  const newCubes = [];
  let [xPos1, yPos1, zPos1] = position1;
  let [xPos2, yPos2, zPos2] = position2;
  let [xSize1, ySize1, zSize1] = size1;
  let [xSize2, ySize2, zSize2] = size2;

  if (yPos2 > yPos1 && yPos2 < yPos1 + ySize1) {
    // chop off bottom and keep top
    newCubes.push([[xSize1, yPos2 - yPos1, zSize1], [xPos1, yPos1, zPos1]]);
    ySize1 -= (yPos2 - yPos1);
    yPos1 += (yPos2 - yPos1);
  }
  if (yPos2 + ySize2 < yPos1 + ySize1) {
    // chop off top and keep bottom
    newCubes.push([[xSize1, (yPos1 + ySize1) - (yPos2 + ySize2), zSize1], [xPos1, yPos2 + ySize2, zPos1]]);
    ySize1 -= ((yPos1 + ySize1) - (yPos2 + ySize2));
  }

  if (xPos2 > xPos1 && xPos2 < xPos1 + xSize1) {
    // chop off left and keep right
    newCubes.push([[xPos2 - xPos1, ySize1, zSize1], [xPos1, yPos1, zPos1]]);
    xSize1 -= (xPos2 - xPos1);
    xPos1 += (xPos2 - xPos1);
  }
  if (xPos2 + xSize2 < xPos1 + xSize1) {
    // chop off right and keep left
    newCubes.push([[(xPos1 + xSize1) - (xPos2 + xSize2), ySize1, zSize1], [xPos2 + xSize2, yPos1, zPos1]]);
    xSize1 -= ((xPos1 + xSize1) - (xPos2 + xSize2));
  }

  if (zPos2 > zPos1 && zPos2 < zPos1 + zSize1) {
    // chop off back and keep front
    newCubes.push([[xSize1, ySize1, zPos2 - zPos1], [xPos1, yPos1, zPos1]]);
    zSize1 -= (zPos2 - zPos1);
    zPos1 += (zPos2 - zPos1);
  }
  if (zPos2 + zSize2 < zPos1 + zSize1) {
    // chop off front and keep back
    newCubes.push([[xSize1, ySize1, (zPos1 + zSize1) - (zPos2 + zSize2)], [xPos1, yPos1, zPos2 + zSize2]]);
    zSize1 -= ((zPos1 + zSize1) - (zPos2 + zSize2));
  }
  return newCubes;
}

export function part2(fileName) {
  const arr = readInput(fileName);
  let cubes = [];
  arr.forEach(line => {
    const [state, coords] = line.split(' ');
    const [xStr, yStr, zStr] = coords.split(',');
    const [xMin, xMax] = xStr.substring(2).split('..').map(Number);
    const [yMin, yMax] = yStr.substring(2).split('..').map(Number);
    const [zMin, zMax] = zStr.substring(2).split('..').map(Number);
    const size = [xMax - xMin + 1, yMax - yMin + 1, zMax - zMin + 1];
    const position = [xMin, yMin, zMin];
    const newCubes = [];
    cubes.some((existingCube) => {
      if (!existingCube[0].some) {
        console.log(cubes);
        return true;
      }
      subCube(existingCube, [size, position]).forEach(newCube => {
        if (newCube.length !== 2) {
          console.log(newCube);
        }
        newCubes.push(newCube);
      });
    });
    cubes = newCubes;
    if (state === 'on') {
      cubes.push([size, position]);
    }
  });
  return cubes.reduce((acc, [size]) => size[0]*size[1]*size[2] + acc, 0);
}