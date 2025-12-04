type Direction = { x: -1 | 0 | 1; y: -1 | 0 | 1 };

const orthogonal: Direction[] = [
  { x: 0, y: -1 }, // up
  { x: 1, y: 0 }, // right
  { x: 0, y: 1 }, // down
  { x: -1, y: 0 }, // left
];

const adjacent: Direction[] = [
  { x: 0, y: -1 }, // up
  { x: -1, y: -1 }, // top left
  { x: 1, y: -1 }, // top right
  { x: 1, y: 0 }, // right
  { x: 0, y: 1 }, // down
  { x: -1, y: 1 }, // bottom left
  { x: 1, y: 1 }, // bottom right
  { x: -1, y: 0 }, // left
];

function nextCoord(
  current: [number, number],
  direction: { x: number; y: number }
) {
  const [x, y] = current;
  const next: [number, number] = [x + direction.x, y + direction.y];
  return next;
}

function rotateDirection(
  directions: Direction[],
  currentDir: Direction,
  rotations: number = 1
) {
  const dirIndex = directions.findIndex(
    (dir) => dir.x === currentDir.x && dir.y === currentDir.y
  );
  const nextDirIndex =
    (dirIndex + rotations + directions.length) % directions.length;
  return directions[nextDirIndex];
}

function hash(coord: [number, number]) {
  const [x, y] = coord;
  return `${x},${y}`;
}

export { orthogonal, adjacent, nextCoord, hash, rotateDirection, Direction };
