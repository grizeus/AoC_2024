import fs from "node:fs/promises";
import path from "node:path";

const fileContent = (
  await fs.readFile(path.join(process.cwd(), "input.txt"))
).toString("utf8");
const pairs = fileContent
  .split("\r\n")
  .map((line) => line.split("   "))
  .map(([a, b]) => [parseInt(a), parseInt(b)]);
const arr1 = [];
const arr2 = [];
pairs.slice().forEach(([a, b]) => {
  arr1.push(a);
  arr2.push(b);
});

arr1.sort((a, b) => a - b);
arr2.sort((a, b) => a - b);

const sorted = arr1.map((val, index) => [val, arr2[index]]);

console.log(sorted.reduce((sum, [a, b]) => sum + Math.abs(a - b), 0));
