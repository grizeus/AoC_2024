import fs from "node:fs/promises";
import path from "node:path";

const fileContent = (
  await fs.readFile(path.join(process.cwd(), "input.txt"))
).toString("utf8");

const reports = fileContent
  .split("\r\n")
  .map((line) => line.split(" ").map((val) => +val));

let safeReports = 0;
let safeDamp = 0;

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

  const length = report.length;
  for (let i = 0; i < length; i++) {
    const filteredReport = report.slice().filter((_, index) => index !== i);
    const filteredDiff = filteredReport.slice(1).map((num, i) => num - filteredReport[i]);
    const isDampAscending = isSafeAscending(filteredDiff);
    if (isDampAscending) {
      safeDamp++;
      break;
    }
    const isDampDescending = isSafeDescending(filteredDiff);
    if (isDampDescending) {
      safeDamp++;
      break;
    }
  }
}

console.log(safeReports + safeDamp);
