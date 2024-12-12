import { buffer } from "node:stream/consumers";
import { pathBuilder, parseInput } from "../utils/utils.js";

const path = pathBuilder("test.txt");
let fileInput;
try {
  fileInput = await parseInput(path);
} catch (error) {
  console.error(error.message);
}
const freeSpace = [...fileInput].map(Number).filter((_, i) => i % 2 !== 0);
const files = [...fileInput].map(Number).filter((_, i) => i % 2 === 0);
const limit = Math.ceil(fileInput.length / 2);

let disk = "";
for (let i = 0; i < limit; i++) {
  if (i < files.length && files[i]){
    for (let j = 0; j < files[i]; j++){
      disk += i;
    }
  }
  if (i < freeSpace.length && freeSpace[i]){
    for (let j = 0; j < freeSpace[i]; j++){
      disk += ".";
    }
  }
}

const diskArr = [...disk];

for (let i = diskArr.length - 1; i > -1; i--) {
  if (diskArr[i] !== ".") {
    let buffer = diskArr[i];
    diskArr[i] = ".";
    for (let j = 0; j < disk.length; j++) {
      if (diskArr[j] === ".") {
        diskArr[j] = buffer;
        break;
      }
    }
  }
}

let res = diskArr.filter(a => a !== ".").reduce((acc, curr, i) => acc + (Number(curr) * i), 0);
console.log(disk, diskArr, res);
