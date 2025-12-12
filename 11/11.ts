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
  const visited = new Map<string, number>();
  const checkNode = (key: string, target: string): number => {
    const cache = visited.get(`${key},${target}`);
    if (cache !== undefined) return cache;
    const entry = map.get(key);
    if (!entry || entry.length === 0) {
      return 0;
    }
    const retVal = entry.reduce((total, current) => {
      if (current === target) {
        return total + 1;
      } else {
        return total + checkNode(current, target);
      }
    }, 0);
    visited.set(`${key},${target}`, retVal);
    return retVal;
  };
  return (
    checkNode('svr', 'dac') * checkNode('dac', 'fft') * checkNode('fft', END) +
    checkNode('svr', 'fft') * checkNode('fft', 'dac') * checkNode('dac', END)
  );
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
