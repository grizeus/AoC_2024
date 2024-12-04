import fs from "node:fs/promises";
import path from "node:path";

const fileContent = (
  await fs.readFile(path.join(process.cwd(), "test.txt"))
).toString("utf8");

let count = 0;

for (let i = 0; i < fileContent.length; ++i)
  if (fileContent[i] === "S") count++;

console.log(count);
