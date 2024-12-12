import { pathBuilder, parseInput } from "../utils/utils.js";

const path = pathBuilder("input.txt");
let fileInput;
try {
  fileInput = await parseInput(path);
} catch (error) {
  console.error(error.message);
}

const fragmentate = (fileInput) => {
  const freeSpaces = [...fileInput].map(Number).filter((_, i) => i % 2 !== 0);
  const files = [...fileInput].map(Number).filter((_, i) => i % 2 === 0);
  const limit = Math.ceil(fileInput.length / 2);

  let disk = [];
  for (let i = 0; i < limit; i++) {
    if (i < files.length) disk.push(...Array(files[i]).fill(i));
    if (i < freeSpaces.length) disk.push(...Array(freeSpaces[i]).fill("."));
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
  return disk;
};
const disk = fragmentate(fileInput);
let res = disk
  .filter((a) => a !== ".")
  .reduce((acc, curr, i) => acc + Number(curr) * i, 0);
console.log(res);
