import fs from "node:fs/promises";
import path from "node:path";

const [order, updates] = (
  await fs.readFile(path.join(process.cwd(), "input.txt"), "utf8")
)
  .split("\r\n\r\n")
  .map((m) => m.split("\r\n"));
