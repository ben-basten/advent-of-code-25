import { describe, test, expect } from 'vitest';
import { marshalInput, part1, part2 } from './day.js';

describe('day 0', () => {
  const example1 = ``;

  test('part 1', () => {
    const data = marshalInput(example1);
    const result = part1(data);
    expect(result).toBe(-1);
  });

  // test('part 2', () => {
  //   const data = marshalInput(example1);
  //   const result = part2(data);
  //   expect(result).toBe(-1);
  // });
});
