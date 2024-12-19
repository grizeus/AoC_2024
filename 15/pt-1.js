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

const [map, stepsLine] = inputFile.split("\r\n\r\n");
let grid = map.split("\r\n").map((line) => line.split(""));
const stepsList = stepsLine.split("");

const [right, left, down, up] = RECT_DIRECTIONS;
const ROWS = grid.length;
const COLS = grid[0].length;

const getDirection = (step) => {
  switch (step) {
    case "^": {
      return up;
    }
    case "v": {
      return down;
    }
    case ">": {
      return right;
    }
    case "<": {
      return left;
    }
    default:
      break;
  }
};

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

const isNextEmpty = (positon, dir) => {
  const [cy, cx] = positon;
  const [dy, dx] = dir;
  const [ny, nx] = [cy + dy, cx + dx];
  if (grid[ny][nx] === ".") {
    return true;
  }
  return false;
};

const swapPos = (firstPos, dir) => {
  // create position from direction

  const [y, x] = firstPos;
  const [dy, dx] = dir;
  let secondPos = [y + dy, x + dx];
  const [ny, nx] = secondPos;

  const firstVal = grid[y][x];
  const secondVal = grid[ny][nx];

  const buff = firstPos;
  firstPos = secondPos;
  secondPos = buff;

  
};

let fish = null;
for (let row = 0; row < ROWS; row++) {
  if (fish) break;
  for (let col = 0; col < COLS; col++) {
    if (grid[row][col] === "@") {
      fish = [row, col];
      break;
    }
  }
}

for (const step of stepsList) {
  const dir = getDirection(step);
  if (isNextEmpty(fish, dir)) {
  }
}

print(map);
print(fish);
