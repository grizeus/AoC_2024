import fs from "node:fs/promises";
import path from "node:path";

const fileContent = (
  await fs.readFile(path.join(process.cwd(), "test.txt"))
).toString("utf8");

const getUnique = (arr) => {
  const filtered = arr.filter((v, i, array) => array.indexOf(v) === i);
  return filtered.map((line) => line.split(" ")).map(([a, b]) => [Number(a), Number(b)]);
};

const iteration = (indices, char) => {
  const output = [];
  for (const i of indices) {
    for (const d of directions) {
      const c = [d[0] + i[0], d[1] + i[1]];
      if (
        c[0] > 0 &&
        c[0] < lineLen &&
        c[1] > 0 &&
        c[1] < linesLen &&
        grid[c[0]][c[1]] === char
      )
        output.push(`${c[0]} ${c[1]}`);
    }
  }
  return getUnique(output);
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
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

const indicesM = iteration(indicesX, "M");
const indicesA = iteration(indicesM, "A");
const indicesS = iteration(indicesA, "S");

console.table(indicesS);
