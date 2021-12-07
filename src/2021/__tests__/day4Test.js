import { part1, part2 } from '../days/day4.js';

describe('day4', () => {
  it('part 1 returns 1', () => {
    expect(part1('test/4.input')).toBe(4512);
  });

  it('part 2 returns 1', () => {
    expect(part2('test/4.input')).toBe(1924);
  });
});