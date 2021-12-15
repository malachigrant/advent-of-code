import { part1, part2 } from '../days/day15.js';

describe('day15', () => {
  it('part 1 returns correct value', () => {
    expect(part1('test/15.input')).toBe(40);
  });

  it('part 2 returns correct value', () => {
    expect(part2('test/15.input')).toBe(315);
  });
});