import fs from "node:fs/promises";
import path from "node:path";

const parseFileInput = async (filePath) => {
  const rawData = await fs.readFile(filePath, "utf8");
  return rawData
    .split("\r\n")
    .map((line) => line.split(":"))
    .map(([target, values]) => [
      Number(target),
      values
        .split(" ")
        .filter(Boolean)
        .map(Number),
    ]);
};

const generateCombinations = (size, base) => {
  const combinations = [];
  const totalCombinations = Math.pow(base, size);
  for (let i = 0; i < totalCombinations; i++) {
    const combination = Array.from({ length: size }, (_, index) => {
      return Math.floor(i / Math.pow(base, index)) % base;
    });
    combinations.push(combination);
  }
  return combinations;
};

const aggregate = (desiredValue, inputValues) => {
  const operationsCount = inputValues.length - 1;
  const combinations = generateCombinations(operationsCount, 3);

  for (const combination of combinations) {
    let result = inputValues[0];
    let valid = true;

    for (let i = 0; i < operationsCount; i++) {
      const currentValue = inputValues[i + 1];
      if (combination[i] === 0) result *= currentValue;
      else if (combination[i] === 1) result += currentValue;
      else if (combination[i] === 2) {
        result = Number(`${result}${currentValue}`);
        if (Number.isNaN(result)) throw new Error("Invalid number formed");
      }

      if (result > desiredValue) {
        valid = false;
        break;
      }
    }

    if (valid && result === desiredValue) return desiredValue;
  }

  return 0;
};

try {
  const filePath = path.join(process.cwd(), "input.txt");
  const fileInput = await parseFileInput(filePath);

  const result = fileInput
    .map(([desiredValue, inputValues]) => aggregate(desiredValue, inputValues))
    .reduce((acc, value) => acc + value, 0);

  console.log(result);
} catch (error) {
  console.error("Error:", error.message);
}


