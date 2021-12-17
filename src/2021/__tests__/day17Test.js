import { part1, part2 } from '../days/day17.js';

describe('day17', () => {
  it('part 1 returns correct value', () => {
    expect(part1('test/17.input')).toBe(45);
  });

  it('part 2 returns correct value', () => {
    expect(part2('test/17.input')).toBe(112);
  });
});