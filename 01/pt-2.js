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
  .map(([a, b]) => {
    left.push(a), right.push(b)
  });

const similarity = left.map(lEl => right.filter(rEl => rEl === lEl));
const sum = left.reduce((sum, elem, i) => sum + (elem * similarity[i].length), 0);

console.log(sum);
