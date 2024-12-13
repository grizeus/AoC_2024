import { pathBuilder, parseInput } from "../utils/utils.js";

const path = pathBuilder("test.txt");
let inputFile;
try {
  inputFile = await parseInput(path);
} catch (error) {
  console.error(error.message);
}

let data = inputFile.split(" ").map(Number);

const memo = new Map();
const ruleSet = (num) => {
  if (num === 0) {
    return 1;
  }
  if (memo.has(num)) {
    return memo.get(num);
  }
  const stringNum = num.toString();
  const digCount = stringNum.length;
  if (digCount % 2 === 0) {
    const left = stringNum.substr(0, digCount / 2);
    let right = stringNum.substr(digCount / 2);

    if (Number(right) === 0) {
      memo.set(num, [+left, 0]);
      return [+left, 0];
    }

    right = right.replace(/^0+/, "");
    memo.set(num, [+left, +right]);
    return [+left, +right];
  }
  memo.set(num, num * 2024);
  return num * 2024;
};

for (let i = 0; i < 75; i++) {
  const bufArr = [];
  for (let j = 0; j < data.length; j++) {
    const res = ruleSet(data[j]);
    bufArr.push(...[res].flat());
  }
  console.log(data, `blink ${i}`);
  data = [...bufArr];
}

console.log(data.length);
