import { part1, part2 } from '../days/day21.js';

describe('day21', () => {
  it('part 1 returns correct value', () => {
    expect(part1('test/21.input')).toBe(739785);
  });

  it('part 2 returns correct value', () => {
    expect(part2('test/21.input')).toBe(444356092776315);
  });
});