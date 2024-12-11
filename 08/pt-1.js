import { pathBuilder, createGrid, isValidPosition, DIRECTIONS } from "../utils/utils.js";

const path = pathBuilder("test.txt");
const grid = await createGrid(path);

const rows = grid.length;
const cols = grid[0].length;

const antinodes = [];
const checkInDirection = (startRow, startCol, direction, character) => {
  const [dx, dy] = direction;
  const positions = [];
  const limit = rows / 2;

  // Forward search
  let row = startRow;
  let col = startCol;
  for (let i = 0; i < limit; i++) {
    if (!isValidPosition(row, col, rows, cols) || (grid[row][col] !== '.' && grid[row][col] !== character)) {
      break;
    }
    positions.push([row, col]);

    if (grid[row][col] === character && (row !== startRow || col !== startCol)) {
      return positions;
    }
    row += dx;
    col += dy;
  }

  return null;
};

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {

    if (grid[row][col] !== '.') {
      for (const direction of DIRECTIONS) {
        const pairs = checkInDirection(row, col, direction, grid[row][col]);
        if (pairs) {
          antinodes.push(pairs);
        }
      }

    }
  }
}


console.log(antinodes);
