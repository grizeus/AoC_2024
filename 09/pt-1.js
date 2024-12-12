import { pathBuilder, parseInput } from "../utils/utils.js";

const path = pathBuilder("input.txt");
let fileInput;
try {
  fileInput = await parseInput(path);
} catch (error) {
  console.error(error.message);
}
const freeSpace = [...fileInput].map(Number).filter((_, i) => i % 2 !== 0);
const files = [...fileInput].map(Number).filter((_, i) => i % 2 === 0);
const limit = Math.ceil(fileInput.length / 2);

let disk = [];
for (let i = 0; i < limit; i++) {
  if (i < files.length && files[i]) {
    for (let j = 0; j < files[i]; j++) {
      disk.push(i);
    }
  }
  if (i < freeSpace.length && freeSpace[i]) {
    for (let j = 0; j < freeSpace[i]; j++) {
      disk.push(".");
    }
  }
}

let i = disk.length - 1;
let j = 0;
while (i > j) {
  if (disk[i] !== ".") {
    let buffer = disk[i];
    disk[i] = ".";

    for (; j < i + 1; j++)
      if (disk[j] === ".") {
        disk[j] = buffer;
        break;
      }
  }
  i--;
}

let res = disk
  .filter((a) => a !== ".")
  .reduce((acc, curr, i) => acc + Number(curr) * i, 0);
console.log(res);
