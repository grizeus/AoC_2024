import assert from "node:assert";
import fs from "node:fs/promises";
import path from "node:path";

const fileContent = (
  await fs.readFile(path.join(process.cwd(), "test.txt"))
).toString("utf8");

const word = "XMAS".split("");

const iteration = (indices, char) => {
  const output = [];
  for (const [ix, iy] of indices) {
    for (const [dx, dy] of directions) {
      const [cx, cy] = [dx + ix, dy + iy];
      if (
        cx > 0 &&
        cx < lineLen &&
        cy > 0 &&
        cy < linesLen &&
        grid[cx][cy] === char
      )
        if (char !== "M") {
          const coef = word.indexOf(char);
          assert(coef > 1);
          const scaledDir = directions.map(([dx, dy]) => [
            dx * coef,
            dy * coef,
          ]);
          // s for scaled
          for (const [sdx, sdy] of scaledDir) {
            const [scx, scy] = [cx + sdx, cy + sdy];
            if (
              scx > 0 &&
              scx < lineLen &&
              scy > 0 &&
              scy < linesLen &&
              grid[scx][scy] === word[0]
            ) {
              output.push([cx, cy]);
            }
          }
        } else {
          output.push([cx, cy]);
        }
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
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
];

const indicesM = iteration(indicesX, word[1]);
const indicesA = iteration(indicesM, word[2]);
const indicesS = iteration(indicesA, word[3]);

console.table(indicesX.length);
console.table(indicesM.length);
console.table(indicesA.length);
console.table(indicesS.length);