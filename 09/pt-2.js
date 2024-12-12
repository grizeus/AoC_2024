import { pathBuilder, parseInput } from "../utils/utils.js";

const path = pathBuilder("input.txt");
let fileInput;
try {
  fileInput = await parseInput(path);
} catch (error) {
  console.error(error.message);
}

const defragmentate = (fileInput) => {
  const freeSpaces = [...fileInput].map(Number).filter((_, i) => i % 2 !== 0);
  const files = [...fileInput].map(Number).filter((_, i) => i % 2 === 0);

  let disk = [];
  for (let i = 0; i < files.length; i++) {
    if (files[i]) disk.push(...Array(files[i]).fill(i)); // Add file blocks
    if (freeSpaces[i]) disk.push(...Array(freeSpaces[i]).fill(".")); // Add free spaces
  }

  // Process files in reverse order of ID
  let lastFreeStart = disk.indexOf(".");
  for (let fileId = files.length - 1; fileId >= 0; fileId--) {
    const fileLength = files[fileId];

    // Find the file's current position
    const currentStart = disk.indexOf(fileId);

    // Find the leftmost span of free space that can fit the file
    let targetStart = -1;
    for (let i = lastFreeStart; i <= disk.length - fileLength; i++) {
      if (disk.slice(i, i + fileLength).every((block) => block === ".")) {
        targetStart = i;
        break;
      }
    }

    // Move the file if a suitable span was found
    if (targetStart !== -1 && targetStart < currentStart) {
      // Clear the file's current position
      for (let i = currentStart; i < currentStart + fileLength; i++) {
        disk[i] = ".";
      }
      // Place the file in the target span
      for (let i = targetStart; i < targetStart + fileLength; i++) {
        disk[i] = fileId;
      }
      lastFreeStart = disk.indexOf(".");
    }
  }

  return disk;
};

const disk = defragmentate(fileInput);
let res = disk.reduce(
  (acc, curr, i) => (curr !== "." ? acc + Number(curr) * i : acc),
  0
);
console.log(res);
