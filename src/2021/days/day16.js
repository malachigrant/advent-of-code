import { readNumberInput, readInput, readLine } from '../helpers/index.js';

function hexToBin(hex) {
  return hex.split('').map(hexChar => parseInt(hexChar, 16)).map(dec => dec.toString(2).padStart(4, '0')).join('');
}

function binToDec(binStr) {
  return parseInt(binStr, 2);
}

function parseLiteral(binStr) {
  let firstChar;
  let i = 0;
  let finalBinStr = '';
  do {
    firstChar = binStr.substring(i*5, i*5+1);
    finalBinStr += binStr.substring(i*5+1, i*5+5);
    i++;
  } while (firstChar === '1');
  return { value: binToDec(finalBinStr), length: i*5 };
}

function parseBITS(binStr, subsLeft = 0, subParent) {
  let version = binToDec(binStr.substring(0, 3));
  const packetType = binToDec(binStr.substring(3, 6));
  let bitsParsed = 6;
  let result = { packetType, values: [] };
  if (packetType === 4) {
    const { value, length } = parseLiteral(binStr.substring(6));
    result = value;
    bitsParsed += length;
  }
  else {
    const lengthType = Number(binStr.substring(6,7));
    bitsParsed++;
    if (lengthType === 1) {
      const countSubPackets = binToDec(binStr.substring(7, 18));
      bitsParsed += 11;
      const [innerVersion, parsedLength, innerResult] = parseBITS(binStr.substring(18), countSubPackets - 1, result);
      result.values.unshift(innerResult);
      version += innerVersion;
      bitsParsed += parsedLength;
    } else {
      const subPacketLength = binToDec(binStr.substring(7, 22));
      bitsParsed += 15;
      let lengthSoFar = 0;
      while (lengthSoFar < subPacketLength) {
        const [innerVersion, parsedLength, innerResult] = parseBITS(binStr.substring(22+lengthSoFar, 22+subPacketLength));
        result.values.push(innerResult);
        version += innerVersion;
        bitsParsed += parsedLength;
        lengthSoFar += parsedLength;
      }
    }
  }
  if (subsLeft > 0) {
    const [innerVersion, parsedLength, innerResult] = parseBITS(binStr.substring(bitsParsed), subsLeft - 1, subParent);
    subParent.values.unshift(innerResult);
    version += innerVersion;
    bitsParsed += parsedLength;
  }
  return [ version, bitsParsed, result ];
}

export function part1(fileName) {
  const line = readLine(fileName);
  const binString = hexToBin(line);
  const [versionSum, _] = parseBITS(binString);
  return versionSum;
}

function interpret(obj) {
  if (typeof obj !== 'object') {
    return obj;
  }
  switch (obj.packetType) {
    case 0: return obj.values.reduce((acc, val) => acc + interpret(val), 0);
    case 1: return obj.values.reduce((acc, val) => acc * interpret(val), 1);
    case 2: return Math.min(...obj.values.map(interpret));
    case 3: return Math.max(...obj.values.map(interpret));
    case 5: return interpret(obj.values[0]) > interpret(obj.values[1]) ? 1 : 0;
    case 6: return interpret(obj.values[0]) < interpret(obj.values[1]) ? 1 : 0;
    case 7: return interpret(obj.values[0]) === interpret(obj.values[1]) ? 1 : 0;
  }
}

export function part2(fileName) {
  const line = readLine(fileName);
  const binString = hexToBin(line);
  const [v, _, result] = parseBITS(binString);
  return interpret(result);
}