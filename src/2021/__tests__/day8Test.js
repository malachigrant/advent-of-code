import { part1, part2 } from '../days/day8.js';

describe('day8', () => {
  it('part 1 returns correct value', () => {
    expect(part1('test/8.input')).toBe(26);
  });

  it('part 2 returns correct value', () => {
    expect(part2('test/8.input')).toBe(61229);
  });
});