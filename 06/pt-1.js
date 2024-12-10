import fs from "node:fs/promises";
import path from "node:path";

const map = (await fs.readFile(path.join(process.cwd(), "test.txt"), "utf8"))
  .split("\r\n")
  .map((line) => line.split(""));

const rows = map.length;
const cols = map[0].length;

const directions = {
  up: 0,
  right: 1,
  down: 2,
  left: 3,
};

const isValidPosition = (row, col) => {
    console.log(row, col, rows, cols);
  return row >= 0 && row < rows && col >= 0 && col < cols;
};
class Guard {
  direction = directions.up;
  position = { x: 0, y: 0 };
  path = new Set();
  map = map;

  constructor(x, y) {
    this.position = { x: x, y: y };
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
    if (isValidPosition(this.position.x, this.position.y)) {
      this.addPath(this.position);
    }
  }

  move() {
    switch (this.direction) {
      case directions.up: {
        const { y, x } = this.position;
        if (isValidPosition(x, y + 1) && this.map[y - 1][x] === "#") {
          this.turnRight();
          break;
        }
        this.position.y--;
        this.addPath(this.position);
        break;
      }
      case directions.left: {
        const { x, y } = this.position;
        if (isValidPosition(x, y + 1) && this.map[y][x - 1] === "#") {
          this.turnRight();
          break;
        }
        this.position.x--;
        this.addPath(this.position);
        break;
      }
      case directions.right: {
        const { x, y } = this.position;
        if (isValidPosition(x, y + 1) && this.map[y][x + 1] === "#") {
          this.turnRight();
          break;
        }
        this.position.x++;
        this.addPath(this.position);
        break;
      }
      case directions.down: {
        const { x, y } = this.position;
        if (isValidPosition(x, y + 1) && this.map[y + 1][x] === "#") {
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
    if (!this.path.has(pair)) {
      this.path.add(pair);
    }
  }
}

const guard = new Guard();

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    if (map[row][col] === "^") {
      guard.setPosition(row, col);
    }
  }
}
// console.log(guard);
let position = guard.position;
console.log(position);
while (position.y >= 0 && position.y < rows && position.x >= 0 && position.x < cols) {
  guard.move();
  position = guard.position;
}

console.log(guard);
