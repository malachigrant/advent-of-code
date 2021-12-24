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
  const arr = readInput(fileName);
  const hall = arr[1].replaceAll('#', '').split('');
  const sideRooms = arr[3].replaceAll('#', '').replaceAll(' ', '').split('').map(x => [x]);
  const sideRoomsLocations = [2, 4, 6, 8];
  arr[2].replaceAll('#', '').replaceAll(' ', '').split('').forEach((letter, i) => sideRooms[i].push(letter));
  function hash(hall, sideRooms) {
    return hall.join(',') + sideRooms.map(x => x.join(',')).join(';');
  }
  const cache = {};
  function tryThings(hall, sideRooms, currentScore = 0, currentSteps = '') {
    if (cache[hash(hall, sideRooms)]) {
      return cache[hash(hall, sideRooms)];
    }
    let minCost = Infinity;
    if (sideRooms.every((x, i) => x.length === 2 && x.every(y => letterToHallMap[y] === i))) {
      // cache[hash(hall, sideRooms)] = { minCost: currentScore, currentSteps };
      if (currentScore === 12521) {
        console.log(currentSteps);
      }
      return { minCost: currentScore, currentSteps };
    }
    for (let i = 0; i < sideRooms.length; i++) {
      const room = sideRooms[i];
      // console.log(room[room.length-1], i);
      if (room.length && (letterToHallMap[room[room.length-1]] !== i || letterToHallMap[room[0]] !== i)) {
        let hmm = () => {};
        /* if (i === 1 && hall[3] === 'B' && room.join('') === 'D' && sideRooms[0].join('') === 'AB' && sideRooms[2].join('') === 'CC' && sideRooms[3].join('') === 'AD') {
          console.log(hall, sideRooms);
          hmm = console.log;
        } */
        const distToHall = 3 - room.length;
        // console.log(room[room.length-1]);
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
          // console.log(distToHall);
          const costToHall = getCost(distToHall + Math.abs(sideRoomsLocations[i] - j), room[room.length-1]);
          const newHall = [...hall];
          const newSideRooms = sideRooms.map(x => [...x]);
          const letter = newSideRooms[i].pop();
          newHall[j] = letter;
          j === 5 && hmm(newHall);
          minCost = Math.min(minCost, tryThings(newHall, newSideRooms, currentScore + costToHall, currentSteps + ` room ${i} ${letter} to hall ${j},`).minCost);
        }
      }
    };
    for (let i = 0; i < hall.length; i++) {
      let hmm = () => {};
      /* if (hall.join('') === '...B.D.....' && sideRooms[0].join('') === 'AB' && sideRooms[1].length === 0 && sideRooms[2].join('') === 'CC') {
        // console.log(hall, sideRooms, i);
        hmm = console.log;
      } */
      if (hall[i] === '.') {
        continue;
      }
      const letter = hall[i];
      if (sideRooms[letterToHallMap[letter]].length > 0 && !sideRooms[letterToHallMap[letter]].every(x => x === letter)) {
        continue;
      }
      const roomLocation = sideRoomsLocations[letterToHallMap[letter]];
      let interval;
      if (roomLocation > i) {
        interval = [i + 1, roomLocation];
      } else {
        interval = [roomLocation, i - 1];
      }
      if (hall.slice(...interval).some(x => x !== '.')) {
        continue;
      }
      // hmm(letter);
      const dist = Math.abs(roomLocation - i) + (2 - sideRooms[letterToHallMap[letter]].length);
      const newHall = [...hall];
      hall[i] = '.';
      const newSideRooms = sideRooms.map(x => [...x]);
      newSideRooms[letterToHallMap[letter]].push(letter);
      newHall[i] = '.';
      const results = tryThings(newHall, newSideRooms, currentScore + getCost(dist, letter), currentSteps + ` hall ${i} (${letter}) to room ${letterToHallMap[letter]},`);
      minCost = Math.min(minCost, results.minCost);
      if (results.minCost === 12519) {
        console.log(results.currentSteps);
      }
    }
    // console.log(hall, sideRooms);
    // cache[hash(hall, sideRooms)] = {minCost, currentSteps };
    return { minCost, currentSteps };
  }
  return tryThings(hall, sideRooms);
}

export function part2(fileName) {
  const arr = readInput(fileName);

}