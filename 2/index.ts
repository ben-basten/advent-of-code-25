import { getInput } from '../common/fetch.js';
import timer from '../common/timer.js';
import { marshalInput, part1, part2 } from './2.js';

async function main() {
  const rawInput = await getInput(2);
  const data = marshalInput(rawInput);

  timer.start('Part 1');
  const answer1 = part1(data);
  console.log(`Part 1: ${answer1}`);
  timer.stop();

  timer.start('Part 2');
  const answer2 = part2(data);
  console.log(`Part 2: ${answer2}`);
  timer.stop();

  timer.printAll();
}

main();
