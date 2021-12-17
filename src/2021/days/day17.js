import { readLine } from '../helpers/index.js';

function simulateThrows(targetStr) {
  const regexResults = targetStr.match(/(-?\d+)..(-?\d+)/g);
  const [targetXMin, targetXMax] = regexResults[0].split('..').map(Number);
  const [targetYMin, targetYMax] = regexResults[1].split('..').map(Number);
  function isInTarget(x, y) {
    return x >= targetXMin && x <= targetXMax && y >= targetYMin && y <= targetYMax;
  }
  function isTravelingAway(x,y,vx,vy) {
    if ((x < targetXMin && vx < 0) || (x > targetXMax && vx > 0)) {
      return true;
    }
    if (y < targetYMin && vy < 0) {
      return true;
    }
    return false;
  }
  let overallMaxY = 0;
  let countValid = 0;
  let xFrom, xTo;
  if (targetXMin < 0 && targetXMax > 0) {
    xFrom = targetXMin;
    xTo = targetXMax;
  }
  else if (targetXMin > 0) {
    xFrom = 0;
    xTo = targetXMax;
  } else if (targetXMax < 0) {
    xFrom = -50;
    xTo = 0;
  }
  for (let xVel = xFrom; xVel <= xTo; xVel++) {
    for (let yVel = -1500; yVel <= 1500; yVel++) {
      let velocity = { x: xVel, y: yVel };
      let position = { x: 0, y: 0 };
      let maxY = 0;
      while (!isTravelingAway(position.x, position.y, velocity.x, velocity.y)) {
        position.x += velocity.x;
        position.y += velocity.y;
        maxY = Math.max(maxY, position.y);
        velocity.y--;
        if (velocity.x > 0) {
          velocity.x--;
        } else if (velocity.x < 0) {
          velocity.x++;
        }
        if (isInTarget(position.x, position.y)) {
          countValid++;
          if (maxY > overallMaxY) {
            overallMaxY = maxY;
          }
          break;
        }
      }
    }
  }
  return { countValid, yMax: overallMaxY };
}

export function part1(fileName) {
  const str = readLine(fileName);
  const { _, yMax } = simulateThrows(str);
  return yMax;
}

export function part2(fileName) {
  const str = readLine(fileName);
  const { countValid } = simulateThrows(str);
  return countValid;
}