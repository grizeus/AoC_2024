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
  down: 3,
  left: 2,
};

class Guard {
  direction = directions.up;
  position = { x: 0, y: 0 };
  path = new Set();

  constructor(x, y) {
    this.position = { x: x, y: y };
  }
  turnRight() {
    if (this.direction === directions.left) {
      this.direction = directions.up;
    }
    this.direction++;
  }

  setPosition(x, y) {
    this.position = { x: x, y: y };
  }

  move() {
    switch (this.direction) {
      case directions.up: {
        this.position.y--;
        this.addPath(this.position.x, this.position.y);
        break;
      }
      case directions.left: {
        this.position.x--;
        this.addPath(this.position.x, this.position.y);
        break;
      }
      case directions.right: {
        this.position.x++;
        this.addPath(this.position.x, this.position.y);
        break;
      }
      case directions.down: {
        this.position.y++;
        this.addPath(this.position.x, this.position.y);
        break;
      }
      default:
        break;
    }
  }

  addPath(x, y) {
    if (!this.path.has([x, y])) {
      this.path.add([x, y]);
    }
  }
}

const guard = new Guard();

for (let row = 0; row < rows; ++row) {
  for (let col = 0; col < cols; ++col) {
    if (map[row][col] === "^") {
      guard.setPosition(row, col);
    }
  }
}
let position = guard.position;
while (position.y >= 0 && position.y <= 10) {
  guard.move();
  console.log(position);
  position = guard.position;
}

console.log(map);
console.log(guard);
