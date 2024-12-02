import fs from "node:fs/promises";
import path from "node:path";

const fileContent = (
  await fs.readFile(path.join(process.cwd(), "input.txt"))
).toString("utf8");

const reports = fileContent
  .split("\r\n")
  .map((line) => line.split(" ").map((val) => +val));

let safeReports = 0;

for (let report of reports) {
  const diff = report.slice(1).map((num, i) => num - report[i]);
  const isSafeAscending = diff.every((diff) => diff >= 1 && diff <= 3);
  if (isSafeAscending) {
    safeReports++;
    continue;
  }
  const isSafeDescending = diff.every((diff) => diff <= -1 && diff >= -3);
  if (isSafeDescending) {
    safeReports++;
    continue;
  }
}

console.log(safeReports);
