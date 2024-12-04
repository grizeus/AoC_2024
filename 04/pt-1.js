import fs from "node:fs/promises";
import path from "node:path";

const fileContent = (
  await fs.readFile(path.join(process.cwd(), "test.txt"))
).toString("utf8");

const getUnique = (arr)=> {
  return arr.filter((v, i, array) => array.indexOf(v) === i);
};

const grid = fileContent.split("\r\n").map((line) => line.split(""));
grid.pop();
const linesLen = grid.length;
const lineLen = grid[0].length;
const x = "X";
const m = "M";
const a = "A";
const s = "S";
const indicesX = [];
const indicesM = [];
const indicesA = [];
const indicesS = [];
for (let i = 0; i < linesLen; ++i) {
  for (let j = 0; j < lineLen; ++j) {
    if (grid[i][j] === x) indicesX.push([i, j]);
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

for (const i of indicesX) {
  for (const d of directions) {
    const c = [d[0] + i[0], d[1] + i[1]];
    if (
      c[0] > 0 &&
      c[0] < lineLen &&
      c[1] > 0 &&
      c[1] < linesLen &&
      grid[c[0]][c[1]] === m
    )
      indicesM.push(`${c[0]} ${c[1]}`);
  }
}
let uniqueM = getUnique(indicesM);
// for (const i of indicesM) {
//   for (const d of directions) {
//     const c = [d[0] + i[0], d[1] + i[1]];
//     if (
//       c[0] > 0 &&
//       c[0] < lineLen &&
//       c[1] > 0 &&
//       c[1] < linesLen &&
//       grid[c[0]][c[1]] === a
//     ) {
//       indicesA.push([c[0], c[1]]);
//     }
//   }
// }
// for (const i of indicesA) {
//   for (const d of directions) {
//     const c = [d[0] + i[0], d[1] + i[1]];
//     if (
//       c[0] > 0 &&
//       c[0] < lineLen &&
//       c[1] > 0 &&
//       c[1] < linesLen &&
//       grid[c[0]][c[1]] === s
//     ) {
//       indicesS.push([c[0], c[1]]);
//     }
//   }
// }

console.table(uniqueM);
