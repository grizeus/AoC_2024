import fs from "node:fs/promises";
import path from "node:path";

const fileContent = (
  await fs.readFile(path.join(process.cwd(), "input.txt"))
).toString("utf8");

const re = /mul\((\d{1,3}),\s*(\d{1,3})\)/g;

const matches = [];
let match;

while ((match = re.exec(fileContent)) !== null) {
  matches.push([Number(match[1]), Number(match[2])]);
}

const sum = matches.reduce((sum, [x, y]) => sum + x * y, 0);

console.log(sum);
