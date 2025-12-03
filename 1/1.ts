type Input = ['L' | 'R', number][];

function marshalInput(input: string): Input {
  const lines = input.split('\n');
  return lines.map((line) => [
    line.substring(0, 1) as 'L' | 'R',
    parseInt(line.substring(1)),
  ]);
}

function part1(input: Input): number {
  let total = 0;
  input.reduce((acc, cur) => {
    const next = acc + getIncrement(cur);
    if (next % 100 === 0) {
      total += 1;
    }
    return next;
  }, 50);
  return total;
}

function part2(input: Input): number {
  return -1;
}

const getIncrement = (instruction: ['L' | 'R', number]) => {
  const [dir, count] = instruction;
  return dir === 'L' ? count * -1 : count;
};

export { marshalInput, part1, part2 };
