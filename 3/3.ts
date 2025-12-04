type Input = string[];

function marshalInput(input: string): Input {
  const lines = input.split('\n');
  return lines;
}

function part1(input: Input): number {
  return input.reduce((total, current) => {
    return total + getJoltage(current);
  }, 0);
}

const getJoltage = (battery: string) => {
  let tens = 0;
  let ones = 0;
  for (let i = 0; i < battery.length; i++) {
    const current = parseInt(battery[i]);
    if (current > tens && i < battery.length - 1) {
      tens = current;
      ones = 0;
    } else if (current > ones) {
      ones = current;
    }
  }
  return parseInt(`${tens}${ones}`);
};

function part2(input: Input): number {
  return -1;
}

export { marshalInput, part1, part2 };
