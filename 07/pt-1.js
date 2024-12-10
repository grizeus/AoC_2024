import fs from "node:fs/promises";
import path from "node:path";

const fileInput = (
  await fs.readFile(path.join(process.cwd(), "test.txt"), "utf8")
)
  .split("\r\n")
  .map((m) => m.split(":"))
  .map((operands) => [
    +operands[0],
    operands[1]
      .split(" ")
      .filter((val) => val !== "")
      .map((val) => +val),
  ]);

const agregate = (desire, input) => {
  let possibleCombinationsCount = (input.length - 1) * (input.length - 1);
  const possibleCombinations = Array(possibleCombinationsCount).fill(2);
  let buff = 0;
  while (possibleCombinationsCount > 0) {
    for (let i = 0; i < input.length - 1; i++) {
      if (buff === 0) {
        buff = input[i];
      }
    }
  }
};

console.log(fileInput);
