import { readNumberInput, readInput } from '../helpers/index.js';

export function part1(fileName) {
  const arr = readInput(fileName);
  let sum = 0;
  arr.forEach(line => {
    const [_, output] = line.split(' | ');
    const outputValues = output.split(' ');
    const lengthMap = { 2: true, 3: true, 4: true, 7: true };
    sum += outputValues.reduce((acc, curr) => {
      return acc + ((!!lengthMap[curr.length]) ? 1 : 0);
    }, 0);
  });
  return sum;
}

function filterPossibilities(possibilities, letterString, outputMappings) {
  const letters = letterString.split('');
  Object.keys(possibilities).forEach(key => {
    possibilities[key] = possibilities[key].filter(letter => {
      return outputMappings.indexOf(key) === -1 ? letters.indexOf(letter) === -1
        : letters.indexOf(letter) !== -1;
    });
  });
}

const allowedConfigs = {
  2: [ ['c', 'f'] ],
  3: [ ['a', 'c', 'f'] ],
  4: [ ['b', 'c', 'd', 'f'] ],
  5: [ ['a', 'c', 'd', 'e', 'g'], ['a', 'c', 'd', 'f', 'g'], ['a', 'b', 'd', 'f', 'g']],
  6: [ ['a', 'b', 'c', 'e', 'f', 'g'], ['a', 'b', 'd', 'e', 'f', 'g'], ['a', 'b', 'c', 'd', 'f', 'g'] ],
  7: [ ['a', 'b', 'c', 'd', 'e', 'f', 'g'] ]
}
function testValid(possibilityMap, signals) {
  if (Object.keys(possibilityMap).sort().join('') !== 'abcdefg') {
    return false;
  }
  for (let i = 0; i < signals.length; i++) {
    const signal = signals[i].split('').map(c => possibilityMap[c]).join('');
    const allowed = allowedConfigs[signal.length];
    if (!allowed) {
      return false;
    }
    let hasAllowed = false;
    for (let allowedCurr = 0; allowedCurr < allowed.length; allowedCurr++) {
      if (signal.split('').sort().join('') !== allowed[allowedCurr].sort().join('')) {
      } else {
        hasAllowed = true;
      }
    }
    if (!hasAllowed) {
      return false;
    }
  }
  return true;
}

const numMappings = {
  'abcefg': 0,
  'cf': 1,
  'acdeg': 2,
  'acdfg': 3,
  'bcdf': 4,
  'abdfg': 5,
  'abdefg': 6,
  'acf': 7,
  'abcdefg': 8,
  'abcdfg': 9
}
function calculateNum(mapping, output) {
  const newOutput = output.split('').map(c => mapping[c]).sort().join('');
  return numMappings[newOutput];
}

export function part2(fileName) {
  const arr = readInput(fileName);
  let sum = 0;
  arr.forEach((line, i) => {
    const [signal, output] = line.split(' | ');
    const signalValues = signal.split(' ');
    const outputValues = output.split(' ');
    const letterSet = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    const possibilities = { a: [...letterSet], b: [...letterSet], c: [...letterSet], d: [...letterSet], e: [...letterSet], f: [...letterSet], g: [...letterSet] };
    const oneSignal = signalValues.findIndex(x => x.length === 2);
    if (oneSignal !== -1) {
      filterPossibilities(possibilities, signalValues[oneSignal], ['c', 'f']);
    }
    const sevenSignal = signalValues.findIndex(x => x.length === 3);
    if (sevenSignal !== -1) {
      filterPossibilities(possibilities, signalValues[sevenSignal], ['a', 'c', 'f']);
    }
    const fourSignal = signalValues.findIndex(x => x.length === 4);
    if (fourSignal !== -1) {
      filterPossibilities(possibilities, signalValues[fourSignal], ['b', 'c', 'd', 'f']);
    }
    let finalMapping;
    for (let aMapping = 0; aMapping < possibilities['a'].length && !finalMapping; aMapping++) {
      for (let bMapping = 0; bMapping < possibilities['b'].length && !finalMapping; bMapping++) {
        for (let cMapping = 0; cMapping < possibilities['c'].length && !finalMapping; cMapping++) {
          for (let dMapping = 0; dMapping < possibilities['d'].length && !finalMapping; dMapping++) {
            for (let eMapping = 0; eMapping < possibilities['e'].length && !finalMapping; eMapping++) {
              for (let fMapping = 0; fMapping < possibilities['f'].length && !finalMapping; fMapping++) {
                for (let gMapping = 0; gMapping < possibilities['g'].length && !finalMapping; gMapping++) {
                  finalMapping = {[possibilities.a[aMapping]]: 'a', [possibilities.b[bMapping]]: 'b', [possibilities.c[cMapping]]: 'c', [possibilities.d[dMapping]]: 'd', [possibilities.e[eMapping]]: 'e', [possibilities.f[fMapping]]: 'f', [possibilities.g[gMapping]]: 'g'};
                  if (testValid(finalMapping, signalValues)) {
                  } else {
                    finalMapping = null;
                  }
                }
              }
            }
          }
        }
      }
    }
    let code = '';
    outputValues.forEach(outputValue => {
      code += calculateNum(finalMapping, outputValue);
    });
    sum += Number(code);
  });
  return sum;
}