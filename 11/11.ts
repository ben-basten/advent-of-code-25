type Input = string[];

const END = 'out';

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
      if (current === END) {
        return total + 1;
      } else {
        return total + checkNode(current);
      }
    }, 0);
  };
  return checkNode('you');
}

function part2(input: Input): number {
  const map = generateMap(input);
  const checkNode = (
    key: string,
    dac: boolean = false,
    fft: boolean = false
  ): number => {
    const entry = map.get(key);
    if (!entry || entry.length === 0) {
      return 0;
    }
    return entry.reduce((total, current) => {
      if (current === END) {
        return dac && fft ? total + 1 : total;
      } else {
        const hasDac = dac || current === 'dac';
        const hasFft = fft || current === 'fft';
        return total + checkNode(current, hasDac, hasFft);
      }
    }, 0);
  };
  return checkNode('svr');
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
