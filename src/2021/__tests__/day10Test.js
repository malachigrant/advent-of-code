import { part1, part2 } from '../days/day10.js';

describe('day10', () => {
  it('part 1 returns correct value', () => {
    expect(part1('test/10.input')).toBe(26397);
  });

  it('part 2 returns correct value', () => {
    expect(part2('test/10.input')).toBe(288957);
  });
});