import { part1, part2 } from '../days/day12.js';

describe('day12', () => {
  it('part 1 returns correct value', () => {
    expect(part1('test/12.input')).toBe(10);
  });

  it('part 2 returns correct value', () => {
    expect(part2('test/12.input')).toBe(36);
  });
});