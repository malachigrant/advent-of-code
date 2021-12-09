import { part1, part2 } from '../days/day9.js';

describe('day9', () => {
  it('part 1 returns correct value', () => {
    expect(part1('test/9.input')).toBe(15);
  });

  it('part 2 returns correct value', () => {
    expect(part2('test/9.input')).toBe(1134);
  });
});