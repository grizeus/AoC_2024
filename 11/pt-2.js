import { pathBuilder, parseInput } from "../utils/utils.js";

const path = pathBuilder("input.txt");
let inputFile;
try {
  inputFile = await parseInput(path);
} catch (error) {
  console.error(error.message);
}

const data = inputFile.split(" ").map(Number);
// map to optimize lookup frequently computable values
const memo = new Map();
const stones = new Map();
// transform input array into a map
for (const stone of data) {
  if (!stones.has(stone)) {
    stones.set(stone, 1);
  }
}

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

const updatePairMap = (stone, results, ammount) => {
  for (const result of results) {
    if (!stones.has(result)) {
      stones.set(result, ammount);
    } else {
      const lastAmmount = stones.get(result);
      stones.set(result, ammount + lastAmmount);
    }
  }
  const lastStoneAmmount = stones.get(stone);
  stones.set(stone, lastStoneAmmount - ammount);
};

const updateMap = (stone, result, ammount) => {
  const lastStoneAmmount = stones.get(stone);
  if (!stones.has(result)) {
    stones.set(result, ammount);
    stones.set(stone, lastStoneAmmount - ammount);
  } else {
    const lastResAmmount = stones.get(result);
    stones.set(result, ammount + lastResAmmount);
    stones.set(stone, lastStoneAmmount - ammount);
  }
};

for (let i = 0; i < 75; i++) {
  const resultIter = [];
  for (const stone of stones) {
    const results = transform(stone[0]);
    resultIter.push({ results: results, stone: stone });
  }
  for (const result of resultIter) {
    if (Array.isArray(result.results)) {
      updatePairMap(result.stone[0], result.results, result.stone[1]);
    } else {
      updateMap(result.stone[0], result.results, result.stone[1]);
    }
  }
}

console.log(stones.values().reduce((acc, val) => acc + val, 0));
