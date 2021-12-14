import { part1, part2 } from '../days/day14.js';

describe('day14', () => {
  it('part 1 returns correct value', () => {
    expect(part1('test/14.input')).toBe(1588);
  });

  it('part 2 returns correct value', () => {
    expect(part2('test/14.input')).toBe(2188189693529);
  });
});