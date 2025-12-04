type Input = string[];

function marshalInput(input: string): Input {
  const lines = input.split('\n');
  return lines;
}

function part1(input: Input): number {
  return input.reduce((total, current) => {
    return total + getJoltage(current, 2);
  }, 0);
}

function part2(input: Input): number {
  return input.reduce((total, current) => {
    return total + getJoltage(current, 12);
  }, 0);
}

const getJoltage = (battery: string, digits: number) => {
  const number = new Array(digits).fill(0);
  for (let i = 0; i < battery.length; i++) {
    const current = parseInt(battery[i]);
    for (let base = 0; base < number.length; base++) {
      if (
        current > number[base] &&
        i < battery.length - (number.length - 1 - base)
      ) {
        number[base] = current;
        for (
          let cleanIndex = base + 1;
          cleanIndex < number.length;
          cleanIndex++
        ) {
          number[cleanIndex] = 0;
        }
        break;
      }
    }
  }
  return parseInt(number.join(''));
};

export { marshalInput, part1, part2 };
