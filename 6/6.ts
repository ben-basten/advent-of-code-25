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

const marshalPart2 = (input: string) => {
  const lines = input.split('\n');
  const result: Operation[] = [];
  for (let col = 0; col < lines[0].length; col++) {
    let rowString = '';
    for (let row = 0; row < lines.length; row++) {
      rowString += lines[row][col];
    }
    rowString = rowString.replaceAll(' ', '');
    if (!rowString) {
      continue;
    }
    const lastChar = rowString[rowString.length - 1];
    if (lastChar === '*' || lastChar === '+') {
      result.push({
        op: lastChar,
        data: [rowString.substring(0, rowString.length - 1)],
      });
    } else {
      result[result.length - 1].data.push(rowString);
    }
  }
  return result;
};

function part2(input: string): number {
  const operations = marshalPart2(input);
  return calc(operations);
}

export { marshalInput, part1, part2 };
