import { readInput, binaryToDecimal } from '../helpers/index.js';

const neighbourMappings = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0], [0, 0], [1, 0],
  [-1, 1], [0, 1], [1, 1]
];
function getNeighbours(image, x, y, defaultPixel = '.') {
  return neighbourMappings.map(([dx, dy]) => (image[y + dy] || [defaultPixel, defaultPixel, defaultPixel])[x + dx] || defaultPixel);
}

function padImage(image, edgeChar) {
  const newImage = [];
  newImage.push(Array(image[0].length + 2).fill(edgeChar));
  for (let y = 0; y < image.length; y++) {
    let newLine = [edgeChar, ...image[y], edgeChar];
    newImage.push(newLine);
  }
  newImage.push(Array(image[0].length + 2).fill(edgeChar));
  return newImage;
}

function enhance(image, conversionString, edgePixel) {
  let otherPixel;
  if (edgePixel) {
    otherPixel = edgePixel === '.' ? '#' : '.';
  } else {
    otherPixel = '.';
    edgePixel = '.';
  }
  const newImage = [];
  for (let y = 0; y < image.length; y++) {
    let newLine = [];
    for (let x = 0; x < image[0].length; x++) {
      const neighbours = getNeighbours(image, x, y, edgePixel);
      const binaryStr = neighbours.map(n => n === '#' ? '1' : '0').join('');
      const index = binaryToDecimal(binaryStr);
      newLine.push(conversionString[index]);
    }
    newImage.push(newLine);
  }
  return padImage(newImage, otherPixel);
}

function enhanceTimes(fileName, n) {
  const arr = readInput(fileName);
  const conversionString = arr[0];

  const doesFlip = conversionString[0] === '#' && conversionString[conversionString.length - 1] === '.';

  let image = padImage(arr.slice(2).map(line => line.split('')), '.');
  for (let times = 0; times < n; times++) {
    const edgePixel = doesFlip && times % 2 === 1 ? '#' : '.';
    image = enhance(image, conversionString, doesFlip && edgePixel);
  }
  return image;
}

function countReducer(sum, row) {
  return sum + row.filter(pixel => pixel === '#').length;
}

export function part1(fileName) {
  return enhanceTimes(fileName, 2).reduce(countReducer, 0);
}

export function part2(fileName) {
  return enhanceTimes(fileName, 50).reduce(countReducer, 0);
}