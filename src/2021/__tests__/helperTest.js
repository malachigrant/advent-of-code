import { readInput, readNumberInput } from '../helpers';

test('readInput returns an array of strings', () => {
  const numArray = readInput('test/helpers.input');
  expect(numArray.length).toBe(3);
  expect(typeof numArray[0]).toBe('string');
});

test('readNumberInput returns an array of numbers', () => {
  const numArray = readNumberInput('test/helpers.input');
  expect(numArray.length).toBe(3);
  expect(typeof numArray[0]).toBe('number');
})