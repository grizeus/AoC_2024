import { parseInput, pathBuilder, mod, print } from "../utils/utils.js";

const rawData = await parseInput(pathBuilder("test.txt"));
const robots = rawData
  .split("\r\n")
  .filter(Boolean)
  .map((line) =>
    line.split(" ").map((subline) => {
      const l = subline.substring(subline.indexOf("=") + 1);
      return l.split(",").map(Number);
    }),
  );
const ROWS = 7;
const COLS = 11;
const TICKS = 100;
const grid = new Map();
const incrementKey = (map, key) => {
  if (map.has(key)) {
    map.set(key, map.get(key) + 1);
  } else {
    map.set(key, 1);
  }
};
for (const robot of robots) {
  const [coord, velocity] = robot;
  const [x, y] = coord;
  const [dx, dy] = velocity;
  const nx = mod(x + dx * TICKS, COLS);
  const ny = mod(y + dy * TICKS, ROWS);
  incrementKey(grid, `${nx},${ny}`);
}
print(grid);
