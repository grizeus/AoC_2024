import {
  pathBuilder,
  parseInput,
  print,
  RECT_DIRECTIONS,
} from "../utils/utils.js";

const path = pathBuilder("input.txt");
let inputFile;
try {
  inputFile = await parseInput(path);
} catch (error) {
  console.error(error.message);
}

const [map, stepsLine] = inputFile.split("\r\n\r\n");
let grid = map.split("\r\n").map((line) => line.split(""));
const stepsList = stepsLine.split("\r\n").join("").split("");

const [right, left, down, up] = RECT_DIRECTIONS;
const ROWS = grid.length;
const COLS = grid[0].length;

const addPos = ([a, b], [c, d]) => [a + c, b + d];
const isSameCoord = ([a, b], [c, d]) => a === c && b === d;

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

const isMovable = (positon, dir) => {
  const nextPos = addPos(positon, dir);
  const [ny, nx] = nextPos;
  if (grid[ny][nx] === "#") {
    return false;
  }
  return true;
};

const isNextEmpty = (positon, dir) => {
  const nextPos = addPos(positon, dir);
  const [ny, nx] = nextPos;
  if (grid[ny][nx] === ".") {
    return true;
  }
  return false;
};

const swapPos = (firstPos, dir) => {
  // create position from direction
  let secondPos = addPos(firstPos, dir);
  const [fy, fx] = firstPos;
  const [sy, sx] = secondPos;

  const firstVal = grid[fy][fx];
  const secondVal = grid[sy][sx];

  grid[fy][fx] = secondVal;
  grid[sy][sx] = firstVal;

  return [sy, sx];
};

const moveBackwards = (pos, dir) => {
  switch (dir) {
    case up: {
      return addPos(pos, down);
    }
    case down: {
      return addPos(pos, up);
    }
    case right: {
      return addPos(pos, left);
    }
    case left: {
      return addPos(pos, right);
    }
    default:
      break;
  }
};

const findLastBox = (pos, dir) => {
  let nextPos = addPos(pos, dir);

  while (!isNextEmpty(nextPos, dir) && isMovable(nextPos, dir)) {
    nextPos = addPos(nextPos, dir);
  }

  return nextPos;
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
    fish = swapPos(fish, dir);
    continue;
  }
  if (isMovable(fish, dir)) {
    let lastBox = findLastBox(fish, dir);
    if (isMovable(lastBox, dir)) {
      while (!isSameCoord(lastBox, fish)) {
        swapPos(lastBox, dir);
        lastBox = moveBackwards(lastBox, dir);
      }
      fish = swapPos(fish, dir);
    } else {
      continue;
    }
  }
}
print(grid.map((col) => col.join("")).join("\n"));

let sum = 0;
for (let row = 1; row < ROWS - 1; row++) {
  for (let col = 1; col < COLS - 1; col++) {
    if (grid[row][col] === "O") {
      sum += row * 100 + col;
    }
  }
}

print(sum);
