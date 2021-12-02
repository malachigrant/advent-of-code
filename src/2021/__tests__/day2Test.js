import { part1, part2 } from "../days/day2.js";

// test that run returns 15
describe('day2', () => {
  it('part 1 returns 150', () => {
    expect(part1('test/2.input')).toBe(150);
  });

  it('part 2 returns 900', () => {
    expect(part2('test/2.input')).toBe(900);
  })
});