import {
  pathBuilder,
  createGrid,
  createGraphFromMatrix,
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
const findAllTrails = (graph, start) => {
  const trails = [];

  const highestPeeks = new Set();
  const getNodeValue = (node) => {
    const [row, col] = node.split(",").map(Number);
    return parseInt(grid[row][col], 10);
  };

  const dfs = (currentNode, trail) => {
    const currentValue = getNodeValue(currentNode);
    trail.push(currentNode);

    // If we reach a node with value 9, record the trail
    if (currentValue === 9 && !highestPeeks.has(currentNode)) {
      trails.push([...trail]);
      highestPeeks.add(currentNode);
      trail.pop();
      return;
    }

    // Traverse neighbors
    for (const neighbor of graph.get(currentNode)) {
      const neighborValue = getNodeValue(neighbor);

      // Only proceed if the neighbor's value is strictly greater
      if (neighborValue - currentValue === 1) {
        dfs(neighbor, trail);
      }
    }

    // Backtrack
    trail.pop();
  };

  // Start DFS from the given starting point
  dfs(start, []);
  return trails;
};

const graph = createGraphFromMatrix(grid, false);
let results = [];
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    if (grid[row][col] === "0") {
      results.push(findAllTrails(graph, `${row},${col}`));
    }
  }
}
console.log(results.reduce((acc, el) => acc + el.length, 0));
