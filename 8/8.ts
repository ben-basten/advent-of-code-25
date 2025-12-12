type Input = Coord[];
type Coord = [number, number, number];
type EuclideanPair = { c1: Coord; c2: Coord; dist: number };

class Cluster {
  coords: Set<string>;
  constructor(c1: Coord, c2: Coord) {
    this.coords = new Set<string>();
    this.coords.add(this.hash(c1));
    this.coords.add(this.hash(c2));
  }

  private hash(c: Coord) {
    return `${c[0]},${c[1]},${c[2]}`;
  }

  size() {
    return this.coords.size;
  }

  has(c1: Coord, c2: Coord) {
    const hasC1 = this.coords.has(this.hash(c1));
    if (hasC1) {
      return true;
    }
    return this.coords.has(this.hash(c2));
  }

  hasBoth(c1: Coord, c2: Coord) {
    return this.coords.has(this.hash(c1)) && this.coords.has(this.hash(c2));
  }

  add(c1: Coord, c2: Coord) {
    this.coords.add(this.hash(c1));
    this.coords.add(this.hash(c2));
  }
}

function marshalInput(input: string): Input {
  const lines = input.split('\n');
  return lines.map(
    (line) => line.split(',').map((point) => parseInt(point)) as Coord
  );
}

function part1(input: Input, connections: number): number {
  const distances = calcAllDistances(input);
  const clusters = clusterCoordinates(distances, connections);
  const sorted = clusters.sort((a, b) => b.size() - a.size());
  return sorted[0].size() * sorted[1].size() * sorted[2].size();
}

function part2(input: Input): number {
  return -1;
}

const calcAllDistances = (input: Input) => {
  const arr: EuclideanPair[] = [];
  for (let c1 = 0; c1 < input.length - 1; c1++) {
    for (let c2 = c1 + 1; c2 < input.length; c2++) {
      const c1Val = input[c1];
      const c2Val = input[c2];
      arr.push({
        c1: c1Val,
        c2: c2Val,
        dist: euclideanDistance(c1Val, c2Val),
      });
    }
  }
  return arr.sort((a, b) => {
    return a.dist - b.dist;
  });
};

const clusterCoordinates = (
  input: EuclideanPair[],
  limit: number
): Cluster[] => {
  const retVal: Cluster[] = [];
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    if (count === limit) {
      return retVal;
    }
    const { c1, c2 } = input[i];
    const match = retVal.find((cluster) => {
      return cluster.has(c1, c2);
    });
    if (match?.hasBoth(c1, c2)) {
      continue;
    } else if (match) {
      count++;
      match.add(c1, c2);
    } else {
      count++;
      retVal.push(new Cluster(c1, c2));
    }
  }
  return retVal;
};

const euclideanDistance = ([x1, y1, z1]: Coord, [x2, y2, z2]: Coord) => {
  return Math.sqrt(
    Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
  );
};

export { marshalInput, part1, part2 };
