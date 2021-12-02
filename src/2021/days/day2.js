import { readInput } from "../helpers/index.js";

export function part1(fileName) {
  const arr = readInput(fileName);
  let depth = 0, pos = 0;
  arr.forEach(line => {
    let [command, value] = line.split(' ');
    value = parseInt(value);
    if (command === 'forward') {
      pos += value;
    } else if (command === 'down') {
      depth += value;
    } else if (command === 'up') {
      depth -= value;
    }
  });
  return depth * pos;
}

export function part2(fileName) {
  const arr = readInput(fileName);
  let depth = 0, pos = 0, aim = 0;
  arr.forEach(line => {
    let [command, value] = line.split(' ');
    value = parseInt(value);
    if (command === 'forward') {
      pos += value;
      depth += aim*value;
    } else if (command === 'down') {
      aim += value;
    } else if (command === 'up') {
      aim -= value;
    }
  });
  return depth * pos;
}