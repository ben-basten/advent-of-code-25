import { adjacent } from '../common/array';

type Input = string[][];
const barrier = '@';

function marshalInput(input: string): Input {
  const lines = input.split('\n').map((line) => line.split(''));
  return lines;
}

function part1(input: Input): number {
  const size = input.length;
  return input.reduce((gridSum, row, rowIndex) => {
    gridSum += row.reduce((colSum, _, colIndex) => {
      const valid = checkSquare(rowIndex, colIndex, size, input);
      return valid ? ++colSum : colSum;
    }, 0);
    return gridSum;
  }, 0);
}

function part2(input: Input): number {
  let total = 0;
  let previousRun = 0;
  do {
    previousRun = countValidSquares(input);
    total += previousRun;
  } while (previousRun !== 0);
  return total;
}

const countValidSquares = (input: Input) => {
  const size = input.length;
  return input.reduce((gridSum, row, rowIndex) => {
    gridSum += row.reduce((colSum, _, colIndex) => {
      const valid = checkSquare(rowIndex, colIndex, size, input);
      if (valid) {
        colSum += 1;
        input[rowIndex][colIndex] = '.';
      }
      return colSum;
    }, 0);
    return gridSum;
  }, 0);
};

const checkSquare = (row: number, col: number, size: number, input: Input) => {
  let totalBarriers = 0;
  if (input[row][col] !== barrier) {
    return false;
  }
  for (let i = 0; i < adjacent.length; i++) {
    const dir = adjacent[i];
    const newRow = row + dir.y;
    const newCol = col + dir.x;
    if (newRow < 0 || newCol < 0 || newRow >= size || newCol >= size) {
      continue;
    }
    if (input[newRow][newCol] === barrier) {
      totalBarriers++;
      if (totalBarriers === 4) {
        return false;
      }
    }
  }
  return true;
};

export { marshalInput, part1, part2 };
