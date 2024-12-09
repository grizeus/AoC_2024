import fs from "node:fs/promises";
import path from "node:path";

const [order, updates] = (
  await fs.readFile(path.join(process.cwd(), "input.txt"), "utf8")
)
  .split("\r\n\r\n")
  .map((m) => m.split("\r\n"));

const befores = {};
const afters = {};

for (const rule of order) {
  const [x, y] = rule.split("|");
  if (!befores[y]) befores[y] = new Set();
  if (!afters[x]) afters[x] = new Set();
  befores[y].add(x);
  afters[x].add(y);
}

console.log(
  updates
    .map((m) => {
      let isValid = true;
      const pageList = m.split(",");
      for (let i = 0; i < pageList.length - 1; i++) {
        for (let j = i + 1; j < pageList.length; j++) {
          const pair = pageList[i] + "|" + pageList[j];
          isValid = isValid && order.indexOf(pair) !== -1;
          if (!isValid) return pageList;
        }
      }
      return isValid ? null : pageList;
    })
    .filter((m) => m !== null)
    .map((m) => {
      const sortedUpdate = [];
      const remainingPages = new Set(m);

      while (remainingPages.size > 0) {
        for (const page of remainingPages) {
          if (![...remainingPages].some((p) => afters[p]?.has(page))) {
            sortedUpdate.push(page);
            remainingPages.delete(page);
            break;
          }
        }
      }
      return +sortedUpdate[Math.floor(sortedUpdate.length / 2)];
    })
    .reduce((acc, curr) => acc + curr, 0)
);
