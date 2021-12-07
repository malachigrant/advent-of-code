import { part1, part2 } from '../days/day7.js';

describe('day7', () => {
  it('part 1 returns correct value', () => {
    expect(part1('test/7.input')).toBe(37);
  });

  it('part 2 returns correct value', () => {
    expect(part2('test/7.input')).toBe(168);
  })
});