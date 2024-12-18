import fs from "node:fs/promises";
import path from "node:path";

const fileContent = (
  await fs.readFile(path.join(process.cwd(), "input.txt"))
).toString("utf8");

// Convert grid string to 2D array
const grid = fileContent.split("\r\n").map((line) => line.split(""));
const rows = grid.length;
const cols = grid[0].length;

const directions = [
  [0, 1], // Right
  [0, -1], // Left
  [1, 0], // Down
  [-1, 0], // Up
  [1, 1], // Diagonal down-right
  [1, -1], // Diagonal down-left
  [-1, 1], // Diagonal up-right
  [-1, -1], // Diagonal up-left
];

const isValidPosition = (row, col) => {
  return row >= 0 && row < rows && col >= 0 && col < cols;
};
const checkWordInDirection = (startRow, startCol, direction) => {
  const [dx, dy] = direction;
  const positions = [];

  // Forward search
  let row = startRow;
  let col = startCol;
  for (let i = 0; i < word.length; i++) {
    if (!isValidPosition(row, col) || grid[row][col] !== word[i]) {
      break;
    }
    positions.push([row, col]);

    if (i === word.length - 1) {
      return positions;
    }
    row += dx;
    col += dy;
  }

  // Backward search
  row = startRow;
  col = startCol;
  positions.length = 0;
  for (let i = 0; i < word.length; i++) {
    if (
      !isValidPosition(row, col) ||
      grid[row][col] !== word[word.length - 1 - i]
    ) {
      break;
    }
    positions.push([row, col]);

    if (i === word.length - 1) {
      return positions;
    }
    row += dx;
    col += dy;
  }

  return null;
};


const findAllWordsInGrid = (grid, word) => {
  const validPositions = [];

  // Search for word
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // If first letter matches
      if (grid[row][col] === word[0]) {
        // Check in all directions
        for (let direction of directions) {
          const foundPositions = checkWordInDirection(row, col, direction);
          if (foundPositions) {
            validPositions.push(foundPositions);
          }
        }
      }
    }
  }

  return validPositions;
};

const word = "XMAS";

const results = findAllWordsInGrid(grid, word);
console.log(`Found ${results.length} occurrences of '${word}'`);
