type Input = { ranges: string[]; ids: string[] };

function marshalInput(input: string): Input {
  const lines = input.split(/^\n/m);
  return { ranges: lines[0].split('\n'), ids: lines[1].split('\n') };
}

function part1(input: Input): number {
  return input.ids.reduce((sum, currentId) => {
    const valid = isValidId(currentId, input.ranges);
    return valid ? ++sum : sum;
  }, 0);
}

const isValidId = (id: string, ranges: string[]) => {
  const idInt = parseInt(id);
  return ranges.some((range) => {
    const [low, high] = range.split('-');
    return idInt >= parseInt(low) && idInt <= parseInt(high);
  });
};

function part2(input: Input): number {
  return -1;
}

export { marshalInput, part1, part2 };
