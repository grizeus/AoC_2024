import fs from "node:fs/promises";
import path from "node:path";

const fileContent = (
  await fs.readFile(path.join(process.cwd(), "input.txt"))
).toString("utf8");

const re = /mul\((\d{1,3}),\s*(\d{1,3})\)/g;
const does = /do\(\)/g;
const dont = /don't\(\)/g;

const matches = [];
const matchesDo = [];
const matchesDont = [];
let match;

while ((match = does.exec(fileContent)) !== null) {
  matchesDo.push(match.index);
}

while ((match = dont.exec(fileContent)) !== null) {
  matchesDont.push(match.index);
}

console.log(matchesDo.length, matchesDont.length);

while ((match = re.exec(fileContent)) !== null) {
  const adjDo = matchesDo
    .slice()
    .filter((x) => x < match.index)
    .pop();
  const adjDont = matchesDont
    .slice()
    .filter((x) => x < match.index)
    .pop();
  console.log(adjDo, adjDont, match.index);
  if (adjDo > adjDont || !adjDont) {
    matches.push([Number(match[1]), Number(match[2])]);
  }
}

const sum = matches.reduce((sum, [x, y]) => sum + x * y, 0);
console.log(sum);
