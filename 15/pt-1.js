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
const moveList = movesLine.split("");

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

print(map);
print(movesList);
