import { pathBuilder, parseInput } from "../utils/utils.js";

const path = pathBuilder("test.txt");
let inputFile;
try {
  inputFile = await parseInput(path);
} catch (error) {
  console.error(error.message);
}

const chunks = inputFile.split("\r\n\r\n");

console.log(chunks);