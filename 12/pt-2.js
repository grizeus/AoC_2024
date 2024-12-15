import {
  pathBuilder,
  createGrid,
  isValidPosition,
  MultiMap,
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

const findAreaSides = (visited, start) => {
  const [startRow, startCol] = start.split(",").map(Number);
  const startValue = grid[startRow][startCol];
  let area = 0;
  const region = new Set();

  const stack = [start];
  const boundaryEdges = new MultiMap();

  while (stack.length > 0) {
    const node = stack.pop();
    if (visited.has(node)) continue;

    visited.add(node);
    region.add(node);
    area++;

    const [row, col] = node.split(",").map(Number);

    for (const [dy, dx] of RECT_DIRECTIONS) {
      const [newRow, newCol] = [row + dy, col + dx];
      const neighbor = `${newRow},${newCol}`;
      if (isValidPosition(newRow, newCol, rows, cols)) {
        if (grid[newRow][newCol] === startValue) {
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        } else {
          // Add edge (current point and direction) to boundary
          boundaryEdges.insert(`${row},${col}`, `${dy},${dx}`);
        }
      } else {
        // Add edge for grid boundary
        boundaryEdges.insert(`${row},${col}`, `${dy},${dx}`);
      }
    }
  }

  function computeGeometricalForm(directions) {
    console.log(directions);
    return;
    const visited = new Set();
    const boundary = [];

    // Add each boundary cell based on its direction
    for (const { x, y, dx, dy } of directions) {
      const newX = x + dx;
      const newY = y + dy;

      // Track boundary points as unique coordinates
      const point1 = `${x},${y}`;
      const point2 = `${newX},${newY}`;

      if (!visited.has(point1)) {
        visited.add(point1);
        boundary.push([x, y]);
      }
      if (!visited.has(point2)) {
        visited.add(point2);
        boundary.push([newX, newY]);
      }
    }

    // Return the boundary points forming the geometric shape
    console.log(boundary);
    return boundary;
  }
  const sides = computeGeometricalForm(boundaryEdges);
  return area * sides;
};

const countUniqueSides = (boundaryEdges) => {
  const visitedEdges = new Set();
  let sides = 0;

  for (const [row, col, dy, dx] of boundaryEdges) {
    const edge = `${row},${col},${dy},${dx}`;
    if (!visitedEdges.has(edge)) {
      visitedEdges.add(edge);
      sides++;
    }
  }

  return sides;
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
