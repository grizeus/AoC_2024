import { pathBuilder, parseInput } from "../utils/utils.js";

const path = pathBuilder("input.txt");
let inputFile;
try {
  inputFile = await parseInput(path);
} catch (error) {
  console.error(error.message);
}

const preparedData = inputFile
  .split("\r\n\r\n")
  .map((section) => section.split("\r\n"))
  .map((lines) =>
    lines.map((line) => {
      const dataPart = line.substring(line.indexOf(":") + 2);
      const entries = dataPart.split(", ");
      return entries.map((entry) => entry.substring(2));
    })
  )
  .map((section) => section.map((entries) => entries.map(Number)));
const results = [];
for (const [a, b, res] of preparedData) {
  /*
   * entry[0][0] * x + entry[1][0] * y == entry[2][0]);
   * entry[0][1] * x + entry[1][1] * y == entry[2][1]);
   * at the same time
   * x=y V x!=y V {x, y} <= 100
   */
  for (let i = 0; i <= 100; i++) {
    for (let j = 0; j <= 100; j++) {
      const productX = a[0] * i + b[0] * j;
      const productY = a[1] * i + b[1] * j;
      if (productX > res[0] || productY > res[1]) {
        break;
      }
      if (productX === res[0] && productY === res[1]) {
        results.push([i, j]);
      }
    }
  }
}

console.log(results.reduce((acc, [a, b]) => acc + a * 3 + b, 0));
