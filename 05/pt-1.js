import fs from "node:fs/promises";
import path from "node:path";

const [order, updates] = (
  await fs.readFile(path.join(process.cwd(), "input.txt"), "utf8")
)
  .split("\r\n\r\n")
  .map((m) => m.split("\r\n"));
console.log(
  updates
    .map((m) => {
      let isValid = true;
      const pageList = m.split(",");
      for (let i = 0; i < pageList.length - 1; i++) {
        for (let j = i + 1; j < pageList.length; j++) {
          const pair = pageList[i] + "|" + pageList[j];
          isValid = isValid && order.indexOf(pair) !== -1;
        }
      }
      return isValid ? +pageList[Math.floor(pageList.length / 2)] : 0;
    })
    .reduce((acc, curr) => acc + curr, 0)
);
