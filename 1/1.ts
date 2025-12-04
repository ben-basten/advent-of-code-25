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
  let total = 0;
  input.reduce((position, cur) => {
    const rotation = getIncrement(cur);
    if (rotation > 0) {
      total +=
        Math.floor((position + rotation) / 100) - Math.floor(position / 100);
    } else {
      total +=
        Math.floor((position - 1) / 100) -
        Math.floor((position - 1 + rotation) / 100);
    }
    return (position + rotation + 100) % 100;
  }, 50);
  return total;
}

const getIncrement = (instruction: ['L' | 'R', number]) => {
  const [dir, count] = instruction;
  return dir === 'L' ? count * -1 : count;
};

const getFullTurns = (inc: number) => {
  return Math.abs(Math.trunc(inc / 100));
};

const getMinuteTurns = (current: number, increment: number) => {
  const modCurrent = current % 100;
  const isPositive = modCurrent > 0;
  const modIncrement = increment % 100;
  if (modIncrement === 0 || modCurrent === 0) {
    return 0;
  }
  const sum = modCurrent + modIncrement;
  if (isPositive && (sum >= 100 || sum < 0)) {
    return 1;
  } else if (!isPositive && (sum > 0 || sum <= -100)) {
    return 1;
  }
  return 0;
};

export { marshalInput, part1, part2, getMinuteTurns, getFullTurns };
