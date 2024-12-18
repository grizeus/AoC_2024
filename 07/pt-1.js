import fs from "node:fs/promises";
import path from "node:path";

const fileInput = (
  await fs.readFile(path.join(process.cwd(), "input.txt"), "utf8")
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

const generateBinaryCombinations = (size, totalCombinations) => {
  const combinations = [];

  for (let i = 0; i < totalCombinations; i++) {
    const combination = [];
    for (let j = 0; j < size; j++) {
      // Use bitwise AND to check if the jth bit is set
      combination.push((i & (1 << j)) !== 0 ? 1 : 0);
    }
    combinations.push(combination);
  }

  return combinations;
};

const aggregate = (desire, input) => {
  let possibleCombinationsCount = 1 << (input.length - 1);
  const possibleCombinations = generateBinaryCombinations(
    input.length - 1,
    possibleCombinationsCount
  );
  let buff = input[0];

  while (possibleCombinationsCount > 0) {
    for (const combination of possibleCombinations) {
      for (let i = 0; i < input.length - 1; i++) {
        if (combination[i] === 1) {
          buff += input[i + 1];
          if (buff === desire && i === input.length - 2) return desire;
          else if (buff > desire) break;
        } else if (combination[i] === 0) {
          buff *= input[i + 1];
          if (buff === desire && i === input.length - 2) return desire;
          else if (buff > desire) break;
        }
      }
      buff = input[0];
    }
    possibleCombinationsCount--;
  }
  return 0;
};

console.log(
  fileInput
    .map((arr) => {
      return aggregate(arr[0], arr[1]);
    })
    .reduce((val, acc) => acc + val, 0)
);

