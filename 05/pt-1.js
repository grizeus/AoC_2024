import fs from "node:fs/promises";
import path from "node:path";

const fileContent = (
  await fs.readFile(path.join(process.cwd(), "test.txt"))
).toString("utf8");

const rawData = fileContent.split("\r\n");
const order = rawData
  .slice(0, rawData.indexOf(""))
  .map((line) => line.split("|"))
  .map(([a, b]) => [parseInt(a), parseInt(b)]);
const updates = rawData
  .slice(rawData.indexOf("") + 1)
  .map((line) => line.split(",")).map(a => a.map(b => parseInt(b)));

console.log(rawData);
console.log(order);
console.log(updates);
