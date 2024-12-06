import fs from "node:fs/promises";
import path from "node:path";

const [order, updates] = (
  await fs.readFile(path.join(process.cwd(), "test.txt"), "utf8")
)
  .split("\r\n\r\n")
  .map((m) => m.split("\r\n"));
console.log(
  updates
    .map((m) => {
      let isValid = true;
      const page_list = m.split(",");
      console.log(page_list);
      for (let i = 0; i < page_list.length - 1; i++) {
        for (let j = i + 1; j < page_list.length; j++) {
          const pair = page_list[i] + "|" + page_list[j];
          isValid = isValid && order.indexOf(pair) !== -1;
        }
      }
      return isValid ? +page_list[Math.floor(page_list.length / 2)] : 0;
    })
    .reduce((acc, curr) => acc + curr, 0)
);
