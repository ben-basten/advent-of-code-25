type Input = string[];

function marshalInput(input: string): Input {
  const lines = input.split(',');
  return lines;
}

function part1(input: Input): number {
  const ids = getAllIds(input);
  return ids.reduce((sum, current) => {
    const isValid = isValidId(current);
    return isValid ? sum : sum + parseInt(current);
  }, 0);
}

function part2(input: Input): number {
  const ids = getAllIds(input);
  return ids.reduce((sum, current) => {
    const isValid = isValidIdPart2(current);
    return isValid ? sum : sum + parseInt(current);
  }, 0);
}

const getAllIds = (input: Input) => {
  const result: string[] = [];
  input.forEach((range) => {
    const [low, high] = range.split('-');
    for (let i = parseInt(low); i <= parseInt(high); i++) {
      result.push(String(i));
    }
  });
  return result;
};

const isValidId = (id: string) => {
  const firstHalf = id.substring(0, id.length / 2);
  const secondHalf = id.substring(id.length / 2);
  return firstHalf !== secondHalf;
};

const isValidIdPart2 = (id: string) => {
  const re = /^(\d+)\1+$/;
  const match = id.match(re);
  return match === null;
};

export { marshalInput, part1, part2, isValidId, isValidIdPart2 };
