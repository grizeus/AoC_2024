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
console.log(files, "\n", freeSpace);
