import {
  pathBuilder,
  createGrid,
  isValidPosition,
  MultiMap,
  generateUniqueCombinations,
  print,
} from "../utils/utils.js";

const path = pathBuilder("input.txt");
const grid = await createGrid(path);

const rows = grid.length;
const cols = grid[0].length;

const getAntinodes = (antenaA, antenaB) => {
  const res = [];
  const [ay, ax] = antenaA;
  const [by, bx] = antenaB;

  const [cy, cx] = [ax - (bx - ax), ay - (by - ay)];
  const [dy, dx] = [bx - (ax - bx), by - (ay - by)];

  if (isValidPosition(cy, cx, rows, cols)) {
    res.push(`${cy}|${cx}`);
  }
  if (isValidPosition(dy, dx, rows, cols)) {
    res.push(`${dy}|${dx}`);
  }

  return res;
};

const frequency = new MultiMap();

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    if (grid[row][col] !== ".") {
      frequency.insert(grid[row][col], [row, col]);
    }
  }
}

const keys = frequency.keys();
const antinodes = [];
for (const key of keys) {
  const antenas = frequency.get(key);
  const possibilities = generateUniqueCombinations(antenas.length - 1, 2);
  for (const pos of possibilities) {
    const res = getAntinodes(antenas[pos[0]], antenas[pos[1]]);
    if (res) {
      antinodes.push(res);
    }
  }
}
const uniqueAntinodes = antinodes.flat().filter((v, i, arr) => arr.indexOf(v) === i);
print(uniqueAntinodes.length);
