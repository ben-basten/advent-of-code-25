type Input = string[];

function marshalInput(input: string): Input {
  const lines = input.split('\n');
  return lines;
}

function part1(input: Input): number {
  const map = generateMap(input);
  const checkNode = (key: string): number => {
    const entry = map.get(key);
    if (!entry || entry.length === 0) {
      return 0;
    }
    return entry.reduce((total, current) => {
      if (current === 'out') {
        return total + 1;
      } else {
        return total + checkNode(current);
      }
    }, 0);
  };
  return checkNode('you');
}

function part2(input: Input): number {
  return -1;
}

const generateMap = (input: Input) => {
  const map = new Map<string, string[]>();
  input.forEach((row) => {
    const [key, value] = row.split(': ');
    const destinations = value.split(' ');
    map.set(key, destinations);
  });
  return map;
};

export { marshalInput, part1, part2 };
