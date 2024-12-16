import { parse } from "path";
import { pathBuilder, parseInput } from "../utils/utils.js";
import { get } from "http";

const path = pathBuilder("input.txt");
let inputFile;
try {
  inputFile = await parseInput(path);
} catch (error) {
  console.error(error.message);
}

const preparedData = inputFile
  .split("\r\n\r\n")
  .map((section) => section.split("\r\n"))
  .map((lines) =>
    lines.map((line) => {
      const dataPart = line.substring(line.indexOf(":") + 2);
      const entries = dataPart.split(", ");
      return entries.map((entry) => entry.substring(2));
    })
  )
  .map((section) => section.map((entries) => entries.map(Number)));
const results = [];
const shift = 10_000_000_000_000;
const getCost = (a, b, res, maxPresses) => {
  let y = (a[0] * (res[1] + shift) - a[1] * (res[0] + shift)) / (-(a[1] * b[0]) + a[0] * b[1]);
  let x = ((res[0] + shift) - b[0] * y) / a[0];
  console.log(x, y);
  if (Math.trunc(x) !== x || Math.trunc(y) !== y) return 0;

  [x, y] = [parseInt(x), parseInt(y)];

  if (x > maxPresses || y > maxPresses) {
    return 0;
  }

  return 3 * x + y;
};
for (const [a, b, res] of preparedData) {
  /*
   * entry[0][0] * x + entry[1][0] * y == entry[2][0]);
   * entry[0][1] * x + entry[1][1] * y == entry[2][1]);
   * at the same time
   * x=y V x!=y V {x, y} <= 100
   */
  results.push(getCost(a, b, res, Math.pow(10, 15)));
}

console.log(results.reduce((acc, a) => acc + a, 0));
