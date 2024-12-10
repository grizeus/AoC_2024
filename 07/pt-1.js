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

const toPower = (value, power) => {
  if (power < 0) return;
  if (power === 0) return 1;
  if (power === 1) return value;
  return value * toPower(value, power - 1);
};

const aggregate = (desire, input) => {
  const possibleCombinations = Array(input.length - 1).fill(2);
  console.log(possibleCombinations.toString());
  let possibleCombinationsCount = toPower(2, input.length - 1);
  let buff = input[0];
  while (possibleCombinationsCount > 0) {
    for (let k = 0; k < possibleCombinations.length; k++) {
      for (let i = 0; i < input.length - 1; i++) {
        if (possibleCombinations[i] === 2) {
          buff += input[i + 1];
          console.log(`${buff} = ${input[i]} + ${input[i + 1]} i = ${i}`);
          if (buff === desire && i === input.length - 2) return desire;
          else if (buff > desire) break;
        } else if (possibleCombinations[i] === 1) {
          console.log(`${buff} = ${input[i]} * ${input[i + 1]} i = ${i}`);
          buff *= input[i + 1];
          if (buff === desire && i === input.length - 2) return desire;
          else if (buff > desire) break;
        }
      }
      console.log();
      buff = input[0];
      if (possibleCombinations[k] === 2) possibleCombinations[k]--;
      else if (possibleCombinations[k] === 1) possibleCombinations[k]++;
    }
    possibleCombinationsCount--;
  }
  return 0;
};

for (let i = 8; i < fileInput.length; i++) {
  console.log(aggregate(fileInput[i][0], fileInput[i][1]), fileInput[i]);
}
