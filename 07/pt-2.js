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

const generateCombinations = (size, base) => {
  const combinations = [];
  const totalCombinations = Math.pow(base, size);
  for (let i = 0; i < totalCombinations; i++) {
    const combination = [];
    let num = i;

    for (let j = 0; j < size; j++) {
      combination.push(num % base);
      num = Math.floor(num / base);
    }
    combinations.push(combination);
  }

  return combinations;
};

const aggregate = (desire, input) => {
  let possibleCombinationsCount = Math.pow(3, input.length - 1);
  const possibleCombinations = generateCombinations(
    input.length - 1,
    3
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

console.log(generateCombinations(3, 3));
