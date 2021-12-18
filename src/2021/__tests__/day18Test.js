import { part1, part2 } from '../days/day18.js';

describe('day18', () => {
  it('part 1 returns correct value', () => {
    expect(part1('test/18.input')).toBe(4140);
  });

  it('part 2 returns correct value', () => {
    expect(part2('test/18.input')).toBe(3993);
  });
});