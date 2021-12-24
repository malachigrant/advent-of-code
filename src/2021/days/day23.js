import { readNumberInput, readInput } from '../helpers/index.js';

const letterToHallMap = {
  A: 0,
  B: 1,
  C: 2,
  D: 3
}

function getCost(dist, letter) {
  return Math.pow(10, letterToHallMap[letter]) * dist;
}

export function part1(fileName) {
  return part2(fileName, 2);
}

export function part2(fileName, depth = 4) {
  const arr = readInput(fileName);
  const hall = arr[1].replaceAll('#', '').split('');
  const sideRooms = arr[3].replaceAll('#', '').replaceAll(' ', '').split('').map(x => [x]);
  if (depth === 4) {
    sideRooms[0].push('D');
    sideRooms[0].push('D');
    sideRooms[1].push('B');
    sideRooms[1].push('C');
    sideRooms[2].push('A');
    sideRooms[2].push('B');
    sideRooms[3].push('C');
    sideRooms[3].push('A');
  }
  const sideRoomsLocations = [2, 4, 6, 8];
  arr[2].replaceAll('#', '').replaceAll(' ', '').split('').forEach((letter, i) => sideRooms[i].push(letter));
  function hash(hall, sideRooms) {
    return hall.join(',') + sideRooms.map(x => x.join(',')).join(';');
  }
  
  // "try things" lol
  function tryThings(_hall, _sideRooms, currentScore = 0) {
    const hall = _hall.slice();
    const sideRooms = _sideRooms.map(x => [...x]);
    let minCost = Infinity;

    let hasMoved = true;
    while (hasMoved) {
      hasMoved = false;
      hall.forEach((letter, i) => {
        if (letter === '.') {
          return;
        }
        const room = sideRooms[letterToHallMap[letter]];
        if (room.every(x => x === letter)) {
          let interval;
          if (sideRoomsLocations[letterToHallMap[letter]] > i) {
            interval = [i + 1, sideRoomsLocations[letterToHallMap[letter]]];
          } else {
            interval = [sideRoomsLocations[letterToHallMap[letter]], i - 1];
          }
          if (hall.slice(...interval).some(x => x !== '.')) {
            return;
          }
          const dist = Math.abs(sideRoomsLocations[letterToHallMap[letter]] - i) + (depth - room.length);
          currentScore += getCost(dist, letter);
          sideRooms[letterToHallMap[letter]].push(letter);
          hall[i] = '.';
          hasMoved = true;        
        }
      });
    }
    if (sideRooms.every((x, i) => x.length === depth && x.every(y => letterToHallMap[y] === i))) {
      return currentScore;
    }

    for (let i = 0; i < sideRooms.length; i++) {
      const room = sideRooms[i];
      if (room.length && (letterToHallMap[room[room.length-1]] !== i || room.some(letter => letterToHallMap[letter] !== i))) {
        const distToHall = (depth + 1) - room.length;
        for (let j = 0; j < hall.length; j++) {
          if (sideRoomsLocations.includes(j)) {
            continue;
          }
          if (hall.some((pos, k) => {

            if (k < Math.min(j, sideRoomsLocations[i]) || k > Math.max(sideRoomsLocations[i], j)) {
              return false;
            }
            if (pos !== '.') {
              return true;
            }
          })) {
            continue;
          }
          const costToHall = getCost(distToHall + Math.abs(sideRoomsLocations[i] - j), room[room.length-1]);
          const newHall = [...hall];
          const newSideRooms = sideRooms.map(x => [...x]);
          const letter = newSideRooms[i].pop();
          newHall[j] = letter;
          minCost = Math.min(minCost, tryThings(newHall, newSideRooms, currentScore + costToHall));
        }
      }
    };
    return minCost;
  }
  return tryThings(hall, sideRooms);
}