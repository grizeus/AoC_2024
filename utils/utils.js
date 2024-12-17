import fs from "node:fs/promises";
import path from "node:path";

export const pathBuilder = (fileName) => {
  return path.join(process.cwd(), fileName);
};

export const createGrid = async (filePath) => {
  const rawData = await fs.readFile(filePath, "utf8");
  return rawData
    .split("\r\n")
    .filter(Boolean)
    .map((line) => line.split(""));
};

export const parseInput = async (filePath) => {
  if (typeof filePath !== "string") throw new Error("Not a string");
  const rawData = await fs.readFile(filePath, "utf8");
  return rawData;
};

export const print = (value) => {
  console.log(value);
};

export const mod = (x, y) => {
  return ((x % y) + y) % y;
};

export const DIRECTIONS = [
  [0, 1], // Right
  [0, -1], // Left
  [1, 0], // Down
  [-1, 0], // Up
  [1, 1], // Diagonal down-right
  [1, -1], // Diagonal down-left
  [-1, 1], // Diagonal up-right
  [-1, -1], // Diagonal up-left
];

export const RECT_DIRECTIONS = [
  [0, 1], // Right
  [0, -1], // Left
  [1, 0], // Down
  [-1, 0], // Up
];

export const DIAG_DIRECTIONS = [
  [1, 1], // Diagonal down-right
  [1, -1], // Diagonal down-left
  [-1, 1], // Diagonal up-right
  [-1, -1], // Diagonal up-left
];

export const createGraphFromMatrix = (matrix, isDiagonal = false) => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const graph = new Map(); // Adjacency list

  // Directions for 4-connected adjacency
  const directions = RECT_DIRECTIONS;

  // Add diagonal directions if required
  if (isDiagonal) {
    directions.push(...DIAG_DIRECTIONS);
  }

  // Helper function to get unique node identifier
  const getNodeId = (row, col) => `${row},${col}`;

  // Build the graph
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const nodeId = getNodeId(row, col);
      graph.set(nodeId, []); // Initialize adjacency list for this node

      // Check neighbors
      for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;

        // Ensure neighbor is within bounds
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          const neighborId = getNodeId(newRow, newCol);
          graph.get(nodeId).push(neighborId);
        }
      }
    }
  }

  return graph;
};

export const isValidPosition = (row, col, rows, cols) => {
  return row >= 0 && row < rows && col >= 0 && col < cols;
};

/**
 * The function generates unique combinations of a specified size from a sequence of numbers.
 * @param seqSize - The `seqSize` parameter represents the total number of elements in the sequence
 * from which you want to generate unique combinations.
 * @param groupSize - The `groupSize` parameter in the `generateUniqueCombinations` function represents
 * the size of each combination that you want to generate. It determines how many elements will be in
 * each unique combination.
 * @returns The function `generateUniqueCombinations` returns an array containing all unique
 * combinations of numbers from 1 to `seqSize` with a size of `groupSize`.
 */
export const generateUniqueCombinations = (seqSize, groupSize) => {
  const combinations = [];

  const generator = (start, currentCombination) => {
    // Base case: If the current combination has the required size
    if (currentCombination.length === groupSize) {
      combinations.push([...currentCombination]);
      return;
    }

    // Recursive case: Generate combinations
    for (let i = start; i <= seqSize; i++) {
      currentCombination.push(i); // Add the current number
      generator(i + 1, currentCombination); // Recurse with the next number
      currentCombination.pop(); // Backtrack to explore other possibilities
    }
  };

  generator(0, []); // Start from 1 with an empty combination
  return combinations;
};

/**
 * The function `generateCombinations` generates all possible combinations of numbers of a specified
 * size and base.
 * @param size - The `size` parameter in the `generateCombinations` function represents the number of
 * elements in each combination. It determines how many elements will be in each combination generated
 * by the function.
 * @param base - The `base` parameter in the `generateCombinations` function represents the number of
 * possible values that each position in a combination can take. For example, if `base` is 2, each
 * position can have values 0 or 1.
 * @returns The function `generateCombinations` returns an array of arrays, where each inner array
 * represents a combination of numbers based on the specified size and base.
 */
export const generateCombinations = (size, base) => {
  const combinations = [];
  const totalCombinations = Math.pow(base, size);
  for (let i = 0; i < totalCombinations; i++) {
    const combination = Array.from({ length: size }, (_, index) => {
      return Math.floor(i / Math.pow(base, index)) % base;
    });
    combinations.push(combination);
  }
  return combinations;
};

/* The `MultiMap` class is a data structure that allows for storing multiple values for a single key
and provides methods for insertion, retrieval, removal, and manipulation of key-value pairs. */
export class MultiMap {
  constructor() {
    this.map = new Map();
  }

  // Add a value to a key
  insert(key, value) {
    if (!this.map.has(key)) {
      this.map.set(key, []);
    }
    this.map.get(key).push(value);
  }

  // Get all values for a key
  get(key) {
    return this.map.get(key) || [];
  }

  // Check if a key exists
  has(key) {
    return this.map.has(key);
  }

  // Remove a specific value for a key
  remove(key, value) {
    if (this.map.has(key)) {
      const values = this.map.get(key).filter((v) => v !== value);
      if (values.length > 0) {
        this.map.set(key, values);
      } else {
        this.map.delete(key);
      }
    }
  }

  // Remove all values for a key
  removeAll(key) {
    this.map.delete(key);
  }

  // Get all keys
  keys() {
    return Array.from(this.map.keys());
  }

  // Get all values
  values() {
    return Array.from(this.map.values()).flat();
  }

  // Clear the map
  clear() {
    this.map.clear();
  }
}
