import fs from "node:fs/promises";
import path from "node:path";

const fileContent = (
  await fs.readFile(path.join(process.cwd(), "input.txt"))
).toString("utf8");

const reports = fileContent
  .split("\r\n")
  .map((line) => line.split(" ").map((val) => +val));

let safeReports = 0;
const isSafeAscending = (array) =>
  array.every((diff) => diff >= 1 && diff <= 3);
const isSafeDescending = (array) =>
  array.every((diff) => diff <= -1 && diff >= -3);

for (let report of reports) {
  const diff = report.slice(1).map((num, i) => num - report[i]);
  const isAscending = isSafeAscending(diff);
  if (isAscending) {
    safeReports++;
    continue;
  }
  const isDescending = isSafeDescending(diff);
  if (isDescending) {
    safeReports++;
    continue;
  }

  const length = diff.length;
  for (let i = 0; i < length; i++) {
    const filtered = diff.filter((_, index) => index !== i);
    const isDampAscending = isSafeAscending(filtered);
    if (isDampAscending) {
      safeReports++;
      break;
    }
    const isDampDescending = isSafeDescending(filtered);
    if (isDampDescending) {
      safeReports++;
      break;
    }
  }
}

console.log(safeReports);
