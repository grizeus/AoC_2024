import fs from "node:fs/promises";
import path from "node:path";

const fileContent = (
  await fs.readFile(path.join(process.cwd(), "test.txt"))
).toString("utf8");

const getUnique = (arr) => {
  const filtered = arr.filter((v, i, array) => array.indexOf(v) === i);
  return filtered
    .map((line) => line.split(" "))
    .map(([a, b]) => [Number(a), Number(b)]);
};

const iteration = (indices, char, prev) => {
  const output = [];
  for (const [ix, iy] of indices) {
    for (const dir of directions) {
      const [dx, dy] = dir.coord;
      const [cx, cy] = [dx + ix, dy + iy];
      if (
        cx > 0 &&
        cx < lineLen &&
        cy > 0 &&
        cy < linesLen &&
        grid[cx][cy] === char
      )
        output.push([cx, cy]);
    }
  }
  return output;
};

const grid = fileContent.split("\r\n").map((line) => line.split(""));
const linesLen = grid.length;
const lineLen = grid[0].length;
const indicesX = [];
for (let i = 0; i < linesLen; ++i) {
  for (let j = 0; j < lineLen; ++j) {
    if (grid[i][j] === "X") indicesX.push([i, j]);
  }
}
const directions = [
  { name: "TL", coord: [-1, 1] },
  { name: "T", coord: [0, 1] },
  { name: "TR", coord: [1, 1] },
  { name: "L", coord: [-1, 0] },
  { name: "R", coord: [1, 0] },
  { name: "BL", coord: [-1, -1] },
  { name: "B", coord: [0, -1] },
  { name: "BR", coord: [1, -1] },
];

const indicesM = iteration(indicesX, "M", "X");
const indicesA = iteration(indicesM, "A", "M");
const indicesS = iteration(indicesA, "S", "A");

console.table(indicesS);

for (const dir of directions) {
  console.log(dir.name);
}
