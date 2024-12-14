import assert from "node:assert";
import {
  pathBuilder,
  createGrid,
  createGraphFromMatrix,
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

const gardenGraph = createGraphFromMatrix(grid);

const findLongestTrail = (graph, start) => {
  let longestTrail = [];

  const getNodeValue = (node) => {
    const [row, col] = node.split(",").map(Number);
    return grid[row][col];
  };

  const dfs = (currentNode, trail) => {
    trail.push(currentNode);
    const currentValue = getNodeValue(currentNode);

    // Traverse neighbors
    for (const neighbor of graph.get(currentNode)) {
      const neighborValue = getNodeValue(neighbor);

      // Only proceed if the neighbor's value is same
      if (neighborValue === currentValue && !trail.includes(neighbor)) {
        dfs(neighbor, trail);
      }
    }

    if (trail.every((node) => getNodeValue(node) === currentValue)) {
      if (trail.length > longestTrail.length) {
        longestTrail = [...trail];
      }
    }

    // Backtrack
    trail.pop();
  };

  // Start DFS from the given starting point
  dfs(start, []);
  let fence = 0;
  for (const node of longestTrail) {
    const currentValue = getNodeValue(node);
    let neighborsCount = 0;
    for (const neighbor of graph.get(node)) {
      if (currentValue === getNodeValue(neighbor)) {
        neighborsCount++;
      }
    }
    switch (neighborsCount) {
      case 0: {
        fence += 4;
        break;
      }
      case 1: {
        fence += 3;
        break;
      }
      case 2: {
        fence += 2;
        break;
      }
      case 3: {
        fence += 1;
        break;
      }
      default: {
        break;
      }
    }
  }
  assert(fence !== 0);
  console.log(longestTrail, fence);
  return longestTrail.length * fence;
};

const isBordered = (row, col) => {
  for (const direction of RECT_DIRECTIONS) {
    const [dy, dx] = direction;
    const [cy, cx] = [row + dy, col + dx];
    if (
      isValidPosition(cy, cx, rows, cols) &&
      grid[cy][cx] === grid[row][col]
    ) {
      return true;
    }
  }
  return false;
};
const mapedSites = new Set();
const trails = [];
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    if (!mapedSites.has(grid[row][col]) || !isBordered(row, col)) {
      trails.push(findLongestTrail(gardenGraph, `${row},${col}`));
      mapedSites.add(grid[row][col]);
    }
  }
}
console.log(trails.reduce((acc, el) => acc + el, 0));
