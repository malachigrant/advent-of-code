import { runALU } from '../days/day24.js';

describe('day24', () => {
  // not sure why I'm testing this even though I never actually use it...
  // I was just too lazy to create a sample output to properly test part 1 and 2.
  it('ALU works', () => {
    expect(runALU('test/24.input').x).toBe(0);
  });
});