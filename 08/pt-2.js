import {
  pathBuilder,
  createGrid,
  isValidPosition,
  MultiMap,
  generateUniqueCombinations,
} from "../utils/utils.js";

const path = pathBuilder("input.txt");
const grid = await createGrid(path);

const rows = grid.length;
const cols = grid[0].length;

function* getAntinodes(antenaA, antenaB) {

  const [ay, ax] = antenaA;
  const [by, bx] = antenaB;


  const dx = bx - ax;
  const dy = by - ay;

  // Backward direction
  for (let i = 0; ; i++) {
    const x = ax - dx * i;
    const y = ay - dy * i;

    if (!isValidPosition(y, x, rows, cols)) break;
    yield `${y}|${x}`;
  }
  // Forward direction
  for (let i = 0; ; i++) {
    const x = bx + dx * i;
    const y = by + dy * i;

    if (!isValidPosition(y, x, rows, cols)) break;
    yield `${y}|${x}`;
  }
}
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
    for (const antinode of getAntinodes(antenas[pos[0]], antenas[pos[1]])) {
      antinodes.push(antinode);
    }
  }
}
console.log(antinodes);
const uniqueAntinodes = antinodes.flat().filter((v, i, arr) => arr.indexOf(v) === i);
console.log(uniqueAntinodes.length);
