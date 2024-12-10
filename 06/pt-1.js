import fs from "node:fs/promises";
import path from "node:path";

const grid = (await fs.readFile(path.join(process.cwd(), "input.txt"), "utf8"))
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
  path = new Set();
  grid = [];

  constructor(x, y, grid) {
    this.position = { x: x, y: y };
    this.grid = grid;
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
    this.addPath(this.position);
  }

  move() {
    switch (this.direction) {
      case directions.up: {
        const { y, x } = this.position;
        if (isValidPosition(x, y + 1) && this.grid[y - 1][x] === "#") {
          this.turnRight();
          break;
        }
        this.position.y--;
        this.addPath(this.position);
        break;
      }
      case directions.left: {
        const { x, y } = this.position;
        if (isValidPosition(x, y + 1) && this.grid[y][x - 1] === "#") {
          this.turnRight();
          break;
        }
        this.position.x--;
        this.addPath(this.position);
        break;
      }
      case directions.right: {
        const { x, y } = this.position;
        if (isValidPosition(x, y + 1) && this.grid[y][x + 1] === "#") {
          this.turnRight();
          break;
        }
        this.position.x++;
        this.addPath(this.position);
        break;
      }
      case directions.down: {
        const { x, y } = this.position;
        if (isValidPosition(x, y + 1) && this.grid[y + 1][x] === "#") {
          this.turnRight();
          break;
        }
        this.position.y++;
        this.addPath(this.position);
        break;
      }
      default:
        break;
    }
  }

  addPath(pos) {
    const pair = pos.x + "|" + pos.y;
    if (isValidPosition(pos.x, pos.y) && !this.path.has(pair)) {
      this.path.add(pair);
    }
  }
}

const guard = new Guard(0, 0, grid);

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    if (grid[row][col] === "^") {
      guard.setPosition(row, col);
    }
  }
}
let position = guard.position;
while (
  position.y >= 0 &&
  position.y < rows &&
  position.x >= 0 &&
  position.x < cols
) {
  guard.move();
  position = guard.position;
}

console.log(guard.path.size);
