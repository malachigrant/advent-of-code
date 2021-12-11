import { part1, part2 } from '../days/day11.js';

describe('day11', () => {
  it('part 1 returns correct value', () => {
    expect(part1('test/11.input')).toBe(1656);
  });

  it('part 2 returns correct value', () => {
    expect(part2('test/11.input')).toBe(195);
  });
});