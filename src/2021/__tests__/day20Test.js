import { part1, part2 } from '../days/day20.js';

describe('day20', () => {
  it('part 1 returns correct value', () => {
    expect(part1('test/20.input')).toBe(35);
  });

  it('part 2 returns correct value', () => {
    expect(part2('test/20.input')).toBe(3351);
  });
});