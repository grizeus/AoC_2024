import fs from "node:fs/promises";
import path from "node:path";

const fileContent = (
  await fs.readFile(path.join(process.cwd(), "input.txt"))
).toString("utf8");

const left = [];
const right = [];

fileContent
  .split("\r\n")
  .map((line) => line.split("   "))
  .map(([a, b]) => { left.push(a), right.push(b) });

arr1.sort((a, b) => a - b);
arr2.sort((a, b) => a - b);

const sorted = arr1.map((val, index) => [val, arr2[index]]);

console.log(sorted.reduce((sum, [a, b]) => sum + Math.abs(a - b), 0));
