import { parseInput, pathBuilder, mod, print } from "../utils/utils.js";

const rawData = await parseInput(pathBuilder("input.txt"));
const robots = rawData
  .split("\r\n")
  .filter(Boolean)
  .map((line) =>
    line.split(" ").map((subline) => {
      const l = subline.substring(subline.indexOf("=") + 1);
      return l.split(",").map(Number);
    })
  );
const ROWS = 103;
const COLS = 101;
const TICKS = 9999;
const slides = [];

for (let t = 100; t <= TICKS; t++) {
  const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  for (const robot of robots) {
    const [coord, velocity] = robot;
    const [x, y] = coord;
    const [dx, dy] = velocity;
    const nx = mod(x + dx * t, COLS);
    const ny = mod(y + dy * t, ROWS);
    grid[ny][nx]++;
  }
  slides.push({ grid, t });
}
const divideMatrix = (matrix, rowSplit, colSplit) => {
  const quadrant1 = matrix
    .slice(0, rowSplit)
    .map((row) => row.slice(0, colSplit));
  const quadrant2 = matrix
    .slice(0, rowSplit)
    .map((row) => row.slice(colSplit + 1));
  const quadrant3 = matrix
    .slice(rowSplit + 1)
    .map((row) => row.slice(0, colSplit));
  const quadrant4 = matrix
    .slice(rowSplit + 1)
    .map((row) => row.slice(colSplit + 1));

  return { quadrant1, quadrant2, quadrant3, quadrant4 };
};

const rowSplit = Math.trunc(ROWS / 2);
const colSplit = Math.trunc(COLS / 2);

const dividedSlides = [];
for (const slide of slides) {
  const { grid, t } = slide;
  const dividedGrid = divideMatrix(grid, rowSplit, colSplit);
  dividedSlides.push({ dividedGrid, t });
}

let minSafety = Infinity;
let minTime = 0;
for (const dividedslide of dividedSlides) {
  let safetyFactor = 1;
  const { dividedGrid, t } = dividedslide;
  for (const key in dividedGrid) {
    const buf = dividedGrid[key].flat(2).reduce((acc, a) => acc + a, 0);
    safetyFactor *= buf;
  }
  if (minSafety > safetyFactor) {
    minSafety = safetyFactor;
    minTime = t;
  }
}

console.log(minTime);

// final visualization
const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
for (const robot of robots) {
  const [coord, velocity] = robot;
  const [x, y] = coord;
  const [dx, dy] = velocity;
  const nx = mod(x + dx * minTime, COLS);
  const ny = mod(y + dy * minTime, ROWS);
  grid[ny][nx]++;
}
print(
  grid
    .map((col) => {
      return col.map((a) => (a == 0 ? "." : a));
    })
    .map((col) => col.join(""))
    .join("\n")
);
