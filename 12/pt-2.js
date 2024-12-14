import {
  pathBuilder,
  createGrid,
  isValidPosition,
  RECT_DIRECTIONS,
} from "../utils/utils.js";

const path = pathBuilder("test.txt");
let grid;
try {
  grid = await createGrid(path);
} catch (error) {
  console.error(error.message);
}
const rows = grid.length;
const cols = grid[0].length;

const findAreaPerimeter = (visited, start) => {
  const [startRow, startCol] = start.split(",").map(Number);
  const startValue = grid[startRow][startCol];
  let area = 0;
  let sharedEdges = 0;

  const stack = [start];

  while (stack.length > 0) {
    const node = stack.pop();
    if (visited.has(node)) continue;

    visited.add(node);
    area++;

    const [row, col] = node.split(",").map(Number);

    for (const [dy, dx] of RECT_DIRECTIONS) {
      const [newRow, newCol] = [row + dy, col + dx];
      const neighbor = `${newRow},${newCol}`;
      if (isValidPosition(newRow, newCol, rows, cols)) {
        if (grid[newRow][newCol] === startValue) {
          sharedEdges++;
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        }
      }
    }
  }
  const totalSides = area * 4 - sharedEdges;
  console.log(`Region ${startValue} Area: ${area}, Sides: ${totalSides}`);
  return area * totalSides;
};
const findAreaSides = (visited, start) => {
  const [startRow, startCol] = start.split(",").map(Number);
  const startValue = grid[startRow][startCol];

  let area = 0;
  let sharedEdges = 0;
  const stack = [start];

  while (stack.length > 0) {
    const node = stack.pop();
    if (visited.has(node)) continue;

    visited.add(node);
    area++;

    const [row, col] = node.split(",").map(Number);

    for (const [dy, dx] of RECT_DIRECTIONS) {
      const [newRow, newCol] = [row + dy, col + dx];
      const neighbor = `${newRow},${newCol}`;

      if (isValidPosition(newRow, newCol, rows, cols)) {
        if (grid[newRow][newCol] === startValue) {
          sharedEdges++; // Count shared edge
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        }
      } else {
        sharedEdges++;
      }
    }
  }

  // Calculate total sides using shared edges
  const totalSides = area * 4 - sharedEdges;
  console.log(`Region ${startValue} Area: ${area}, Sides: ${totalSides}`);
  return { area, totalSides };
};
const visited = new Set();
const trails = [];
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const node = `${row},${col}`;
    if (!visited.has(node)) {
      trails.push(findAreaSides(visited, `${row},${col}`));
    }
  }
}
console.log(trails.reduce((acc, el) => acc + el, 0));
