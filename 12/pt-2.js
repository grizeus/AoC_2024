import {
  pathBuilder,
  createGrid,
  isValidPosition,
  RECT_DIRECTIONS,
  print,
} from "../utils/utils.js";

const path = pathBuilder("input.txt");
let grid;
try {
  grid = await createGrid(path);
} catch (error) {
  console.error(error.message);
}
const rows = grid.length;
const cols = grid[0].length;

const findAreaSides = (visited, start) => {
  const [startRow, startCol] = start.split(",").map(Number);
  const startValue = grid[startRow][startCol];
  let area = 0;
  const region = new Set();

  const stack = [start];
  const boundaryEdges = new Map();

  while (stack.length > 0) {
    const node = stack.shift();
    if (visited.has(node)) continue;

    visited.add(node);
    region.add(node);
    area++;

    const [row, col] = node.split(",").map(Number);

    for (const [dy, dx] of RECT_DIRECTIONS) {
      const [newRow, newCol] = [row + dy, col + dx];
      const neighbor = `${newRow},${newCol}`;
      if (
        isValidPosition(newRow, newCol, rows, cols) &&
        grid[newRow][newCol] === startValue
      ) {
        stack.push(neighbor);
      } else {
        const key = `${dy},${dx}`;
        if (!boundaryEdges.has(key)) {
          boundaryEdges.set(key, new Set());
        }
        boundaryEdges.get(key).add(neighbor);
      }
    }
  }
  let sides = 0;

  for (const [_, vs] of boundaryEdges) {
    const seened = new Set();

    for (const vert of vs) {
      if (seened.has(vert)) continue;
      sides++;
      const queue = [vert.split(",").map(Number)];

      while (queue.length > 0) {
        const [row, col] = queue.shift();
        if (seened.has(`${row},${col}`)) continue;

        seened.add(`${row},${col}`);

        for (const [dy, dx] of RECT_DIRECTIONS) {
          const [newRow, newCol] = [row + dy, col + dx];
          if (vs.has(`${newRow},${newCol}`)) {
            queue.push([newRow, newCol]);
          }
        }
      }
    }
  }
  return area * sides;
};

const visited = new Set();
const regions = [];
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const node = `${row},${col}`;
    if (!visited.has(node)) {
      regions.push(findAreaSides(visited, `${row},${col}`));
    }
  }
}
print(regions.reduce((acc, el) => acc + el, 0));
