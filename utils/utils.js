import fs from "node:fs/promises";
import path from "node:path";

export const pathBuilder = (fileName) => {
  return path.join(process.cwd(), fileName);
};

export const createGrid = async (filePath) => {
  const rawData = await fs.readFile(filePath, "utf8");
  return rawData
    .split("\r\n").filter(Boolean).map(line => line.split(""));
};

export const DIRECTIONS = [
  [0, 1], // Right
  [0, -1], // Left
  [1, 0], // Down
  [-1, 0], // Up
  [1, 1], // Diagonal down-right
  [1, -1], // Diagonal down-left
  [-1, 1], // Diagonal up-right
  [-1, -1], // Diagonal up-left
];

export const isValidPosition = (row, col, rows, cols) => {
  return row >= 0 && row < rows && col >= 0 && col < cols;
};
