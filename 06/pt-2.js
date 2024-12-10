import fs from "node:fs/promises";
import path from "node:path";

const grid = (await fs.readFile(path.join(process.cwd(), "test.txt"), "utf8"))
  .split("\r\n")
  .map((line) => line.split(""));

const rows = grid.length;
const cols = grid[0].length;

const directions = {
  up: 0,
  right: 1,
  down: 2,
  left: 3,
};

const isValidPosition = (row, col) => {
  return row >= 0 && row < rows && col >= 0 && col < cols;
};

class Guard {
  direction = directions.up;
  position = { x: 0, y: 0 };
  seenObstacle = new Set();
  isCycled = false;
  loops = 0;
  grid = [];
  steps = 0;

  constructor(x, y, grid) {
    this.position = { x: x, y: y };
    this.grid = grid;
  }

  reset(position, newGrid) {
    const { x, y } = position;
    this.position = { x: x, y: y };
    this.grid = newGrid;
  }

  turnRight() {
    if (this.direction === directions.left) {
      this.direction = directions.up;
    } else {
      this.direction++;
    }
  }

  setPosition(row, col) {
    this.position = { x: col, y: row };
  }

  #handlecycle(maim) {
    if (!this.seenObstacle.has(maim)) {
      this.seenObstacle.add(maim);
    } else {
      this.loops++;
      this.isCycled = true;
      console.log(this.seenObstacle);
      this.seenObstacle.clear();
    }
  }

  move() {
    this.steps++;
    switch (this.direction) {
      case directions.up: {
        const { y, x } = this.position;
        if (isValidPosition(x, y - 1) && this.grid[y - 1][x] === "#") {
          const maim = `${x}|${y - 1}|${directions.up}`;
          this.#handlecycle(maim);
          if (this.isCycled) {
            break;
          }
          this.turnRight();
          break;
        }
        this.position.y--;
        break;
      }
      case directions.left: {
        const { x, y } = this.position;
        if (isValidPosition(x - 1, y) && this.grid[y][x - 1] === "#") {
          const maim = `${x - 1}|${y}|${directions.left}`;
          this.#handlecycle(maim);
          if (this.isCycled) {
            break;
          }
          this.turnRight();
          break;
        }
        this.position.x--;
        break;
      }

      case directions.right: {
        const { x, y } = this.position;
        if (isValidPosition(x + 1, y) && this.grid[y][x + 1] === "#") {
          const maim = `${x + 1}|${y}|${directions.right}`;
          this.#handlecycle(maim);
          if (this.isCycled) {
            break;
          }
          this.turnRight();
          break;
        }
        this.position.x++;
        break;
      }

      case directions.down: {
        const { x, y } = this.position;
        if (isValidPosition(x, y + 1) && this.grid[y + 1][x] === "#") {
          const maim = `${x}|${y + 1}|${directions.down}`;
          this.#handlecycle(maim);
          if (this.isCycled) {
            break;
          }
          this.turnRight();
          break;
        }
        this.position.y++;
        break;
      }
      default:
        break;
    }
  }
}

const guard = new Guard(0, 0, grid);
const initialPosition = { x: 0, y: 0 };
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    if (grid[row][col] === "^") {
      guard.setPosition(row, col);
      initialPosition.x = col;
      initialPosition.y = row;
    }
  }
}

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    let newGrid = grid.map((arr) => [...arr]);
    if (newGrid[row][col] === "#" || newGrid[row][col] === "^") {
      continue;
    }
    newGrid[row][col] = "#";
    // console.log(newGrid.map((m) => m.join("")).join("\n"));
    // console.log();
    guard.reset(initialPosition, newGrid);
    let position = guard.position;
    guard.isCycled = false;
    while (
      position.y >= 0 &&
      position.y < rows &&
      position.x >= 0 &&
      position.x < cols &&
      !guard.isCycled
    ) {
      guard.move();
      position = guard.position;
    }
  }
}

console.log(guard.loops);
