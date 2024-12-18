import {
  pathBuilder,
  parseInput,
  print,
  RECT_DIRECTIONS,
} from "../utils/utils.js";

const path = pathBuilder("test.txt");
let inputFile;
try {
  inputFile = await parseInput(path);
} catch (error) {
  console.error(error.message);
}

const [map, movesLine] = inputFile.split("\r\n\r\n");
const grid = map.split("\r\n").map((line) => line.split(""));
const movesList = movesLine.split("");

const [right, left, down, up] = RECT_DIRECTIONS;
const ROWS = grid.length;
const COLS = grid[0].length;

const move = (coord, symb) => {
  const [y, x] = coord;
  switch (symb) {
    case "^": {
      const ny = y + up[0];
      const nx = x + up[1];
      return [ny, nx];
    }
    case "v": {
      const ny = y + down[0];
      const nx = x + down[1];
      return [ny, nx];
    }
    case ">": {
      const ny = y + right[0];
      const nx = x + right[1];
      return [ny, nx];
    }
    case "<": {
      const ny = y + left[0];
      const nx = x + left[1];
      return [ny, nx];
    }
    default:
      break;
  }
};

const isMovable = (positon, dir) => {
  const [cy, cx] = positon;
  const [dy, dx] = dir;
  const [ny, nx] = [cy + dy, cx + dx];
  if (grid[ny][nx] === "#") {
    return false;
  }
  return true;
};

const isEmpty = (positon, dir) => {
  const [cy, cx] = positon;
  const [dy, dx] = dir;
  const [ny, nx] = [cy + dy, cx + dx];
  if (grid[ny][nx] === ".") {
    return true;
  }
  return false;
};

print(map);
print(movesList);
