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
const stones = new Map();
for (const stone of data) {
  if (!stones.has(stone)) {
    stones.set(stone, 1);
  }
}
console.log(stones);
const transform = (num) => {
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

const updateMap = (stone, result, ammount) => {
  if (!stones.has(result)) {
    stones.set(result, ammount);
  } else {
    const lastAmmount = stones.get(result);
    stones.set(result, ammount + lastAmmount);
    stones.set(stone, 0);
  }
};

for (let i = 0; i < 2; i++) {
  const resultIter = [];
  for (const stone of stones) {
    const ammount = stone[1];
    const results = transform(stone[0]);
    resultIter.push({ results: [...[results].flat()], stone: stone });
    if (Array.isArray(results)) {
    } else {
      updateMap(stone[0], results, ammount);
    }
  }
  for (const result of resultIter) {
    for (const res of result.results) {
      updateMap(result.stone[0], res, result.stone[1]);
    }
  }
  console.log(stones, `blink ${i}`);
}

