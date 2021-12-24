import { part1, part2 } from '../days/day23.js';

describe('day23', () => {
  it('part 1 returns correct value', () => {
    expect(part1('test/23.input')).toBe(12521);
  });

  it('part 2 returns correct value', () => {
    expect(part2('test/23.input')).toBe(44169);
  });
});