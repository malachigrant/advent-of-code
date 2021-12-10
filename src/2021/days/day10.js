import { readInput } from '../helpers/index.js';

export function part1(fileName) {
  const arr = readInput(fileName);
  let sum = 0;
  arr.forEach((line) => {
    let lineLength;
    do {
      lineLength = line.length;
      line = line.replace('()','');
      line = line.replace('[]','');
      line = line.replace('{}','');
      line = line.replace('<>','');
    } while (lineLength != line.length && line.length > 0);
    const score = {
      ')': 3,
      ']': 57,
      '}': 1197,
      '>': 25137
    }
    if (line.length) {
      const firstIndex = line.match(/[\)\]\}\>]/);
      if (firstIndex) {
        sum += score[firstIndex[0]];
      }
    }
  });
  return sum;
}

export function part2(fileName) {
  const arr = readInput(fileName);
  const unfinished = arr.map((line) => {
    let lineLength;
    do {
      lineLength = line.length;
      line = line.replace('()','');
      line = line.replace('[]','');
      line = line.replace('{}','');
      line = line.replace('<>','');
    } while (lineLength != line.length && line.length > 0);
    if (line.length) {
      const firstIndex = line.match(/[\)\]\}\>]/);
      if (firstIndex) {
        return null;
      } else {
        return line;
      }
    }
  });
  const scores = [];
  unfinished.forEach((line) => {
    if (!line) {
      return;
    }
    let score = 0;
    const chars = line.split('').reverse();
    for (let i = 0; i < chars.length; i++) {
      const scoreMap = {
        '(': 1,
        '[': 2,
        '{': 3,
        '<': 4
      }
      score *= 5;
      score += scoreMap[chars[i]];
    }
    scores.push(score);
  });
  return scores.sort((a,b) => a - b)[Math.floor(scores.length/2)];
}