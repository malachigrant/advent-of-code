import { readInput } from '../helpers/index.js';

function parseInput(fileName) {
  const map = {};
  readInput(fileName).forEach(line => {
    let [first, second] = line.split('-');
    if (!map[first]) {
      map[first] = [];
    }
    if (!map[second]) {
      map[second] = [];
    }
    map[second].push(first);
    map[first].push(second);
  });
  return map;
}

function isSmall(name) {
  return name.toLowerCase() === name;
}

function recursiveCheck(map, pos, searched, allowSmallCaveTwice = false) {
  let numPaths = 0;
  map[pos].forEach(newPos => {
    const newSearched = [...searched];
    if (searched.indexOf(newPos) > -1) {
      if (!allowSmallCaveTwice || searched.indexOf('__twice') !== -1 || newPos === 'start' || newPos === 'end') {
        return;
      }
      newSearched.push('__twice');
    } else if (isSmall(newPos)) {
      newSearched.push(newPos);
    }
    if (newPos === 'end') {
      numPaths++;
      return;
    }
    numPaths += recursiveCheck(map, newPos, newSearched, allowSmallCaveTwice);
  });
  return numPaths;
}

export function part1(fileName) {
  const map = parseInput(fileName);
  return recursiveCheck(map, 'start', ['start']);
}

export function part2(fileName) {
  const map = parseInput(fileName);
  return recursiveCheck(map, 'start', ['start'], true);
}