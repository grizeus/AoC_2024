import {
  pathBuilder,
  parseInput
} from "../utils/utils.js";

const path = pathBuilder("test.txt");

try {
  const data = await parseInput(path);
  console.log(data);
} catch (error) {
  console.error(error.message);
}

