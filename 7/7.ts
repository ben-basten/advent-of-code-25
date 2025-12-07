import { Coord, Direction, hash, nextCoord } from '../common/array';

type Input = string[][];
const SPLITTER = '^';

const directions = {
  d: { x: 0, y: 1 }, // down
  dl: { x: -1, y: 1 }, // bottom left
  dr: { x: 1, y: 1 }, // bottom right
};

function marshalInput(input: string): Input {
  const lines = input.split('\n');
  return lines.map((line) => line.split(''));
}

function part1(input: Input): number {
  const startingX = findStartingX(input);
  let coords = new Set<string>();
  coords.add(hash([startingX, 1]));
  let total = 0;
  for (let i = 1; i < input.length; i++) {
    const newCoords = new Set<string>();
    coords.forEach((item) => {
      const pos = parse(item);
      const val = input[i][pos[0]];
      if (val === SPLITTER) {
        total += 1;
        newCoords.add(hash(nextCoord(pos, directions.dl)));
        newCoords.add(hash(nextCoord(pos, directions.dr)));
      } else {
        newCoords.add(hash(nextCoord(pos, directions.d)));
      }
    });
    coords = newCoords;
  }
  return total;
}

function part2(input: Input): number {
  const startingX = findStartingX(input);
  const visited = new Map<string, number>();

  const countPaths = (current: Coord): number => {
    const [x, y] = current;
    if (y === input.length) {
      return 1;
    }
    const currentHash = hash(current);
    if (visited.has(currentHash)) {
      return visited.get(currentHash) ?? 0;
    }

    const item = input[y][x];
    let count;
    if (item === SPLITTER) {
      count =
        countPaths(nextCoord(current, directions.dl)) +
        countPaths(nextCoord(current, directions.dr));
    } else {
      count = countPaths(nextCoord(current, directions.d));
    }
    visited.set(currentHash, count);
    return count;
  };

  return countPaths([startingX, 1]);
}

const findStartingX = (input: Input) => {
  return input[0].findIndex((item) => {
    return item === 'S';
  });
};

const parse = (hash: string) => {
  return hash.split(',').map((num) => parseInt(num)) as Coord;
};

export { marshalInput, part1, part2 };
