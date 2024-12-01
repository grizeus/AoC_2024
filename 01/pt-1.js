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

left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

const sorted = left.map((val, index) => [val, right[index]]);
const sum = sorted.reduce((sum, [a, b]) => sum + Math.abs(a - b), 0);

console.log(sum);
