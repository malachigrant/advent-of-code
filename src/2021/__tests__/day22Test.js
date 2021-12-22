import { part1, part2 } from '../days/day22.js';

describe('day22', () => {
  it('part 1 returns correct value', () => {
    expect(part1('test/22.input')).toBe(474140);
  });

  it('part 2 returns correct value', () => {
    expect(part2('test/22.input')).toBe(2758514936282235);
  });
});