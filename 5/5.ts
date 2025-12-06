type Input = { ranges: string[]; ids: string[] };

type Range = [number, number];

function marshalInput(input: string): Input {
  const lines = input.split('\n\n');
  return {
    ranges: lines[0].split('\n'),
    ids: lines[1].split('\n'),
  };
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
  const ranges = stringToNum(input.ranges);
  const orderedRanges = sortRanges(ranges);
  const collapsedRanges = combineRanges(orderedRanges);
  return getTotalIds(collapsedRanges);
}

const stringToNum = (input: string[]): Range[] => {
  return input.map((range) => {
    const [low, high] = range.split('-');
    return [parseInt(low), parseInt(high)];
  });
};

const sortRanges = (input: Range[]) => {
  return input.sort(([lowA, highA], [lowB, highB]) => {
    return lowA - lowB;
  });
};

const combineRanges = (input: Range[]): Range[] => {
  return input.reduce((combined, [currentLow, currentHigh]) => {
    if (!combined.length) {
      combined.push([currentLow, currentHigh]);
      return combined;
    }
    const lastIndex = combined.length - 1;
    const [previousLow, previousHigh] = combined[lastIndex];
    if (currentLow > previousHigh + 1) {
      combined.push([currentLow, currentHigh]);
    } else {
      // the previous range can have a maximum greater than the current range
      combined[lastIndex] = [previousLow, Math.max(previousHigh, currentHigh)];
    }
    return combined;
  }, [] as Range[]);
};

const getTotalIds = (input: Range[]): number => {
  return input.reduce((total, current) => {
    const [low, high] = current;
    return total + (high - low) + 1;
  }, 0);
};

export { marshalInput, part1, part2 };
