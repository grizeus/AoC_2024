import { pathBuilder, parseInput } from "../utils/utils.js";

const path = pathBuilder("input.txt");
let inputFile;
try {
  inputFile = await parseInput(path);
} catch (error) {
  console.error(error.message);
}

let data = inputFile.split(" ");

const ruleSet = (num) => {
  const digCount = num.length;
  if (num === "0") {
    return "1";
  }
  if (digCount % 2 === 0) {
    const left = num.substr(0, digCount / 2);
    let right = num.substr(digCount / 2);

    if (Number(right) === 0) return [left, "0"];

    right = right.replace(/^0+/, "");

    return [left, right];
  }
  return String(+num * 2024);
};

for (let i = 0; i < 25; i++) {
  const bufArr = [];
  for (let j = 0; j < data.length; j++) {
    const res = ruleSet(data[j]);
    bufArr.push(...[res].flat());
  }
  data = [...bufArr];
}

console.log(data.length);
