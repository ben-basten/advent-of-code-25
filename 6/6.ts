type Input = string[][];
type Operation = { op: '*' | '+'; data: string[] };

const ops = {
  '*': (a: number, b: number) => (a === 0 ? b : a * b),
  '+': (a: number, b: number) => a + b,
};

function marshalInput(input: string): Input {
  const lines = input.split('\n');
  return lines.map((line) => {
    return line.trim().split(/\s+/g);
  });
}

function part1(input: Input): number {
  const inverted = invert(input);
  const operations = getOperations(inverted);
  return calc(operations);
}

const invert = (input: Input): string[][] => {
  return input[0].map((_, colIndex) => {
    return input.map((row) => row[colIndex]);
  });
};

const getOperations = (input: string[][]): Operation[] => {
  return input.map((row) => {
    return {
      op: row[row.length - 1] as '*' | '+',
      data: row.slice(0, -1),
    };
  });
};

const calc = (operations: Operation[]) => {
  return operations.reduce((total, current) => {
    return (total += current.data.reduce((rowTotal, data) => {
      return ops[current.op](rowTotal, parseInt(data));
    }, 0));
  }, 0);
};

function part2(input: Input): number {
  return -1;
}

export { marshalInput, part1, part2 };
