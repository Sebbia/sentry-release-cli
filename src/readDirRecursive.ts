import { readdirSync, statSync } from "fs";
import path from "path";

function walk(
  dir: string,
  filter: (fn: string) => boolean,
  outArray: string[]
): void {
  const fileNames = readdirSync(dir);
  for (const fn of fileNames) {
    if (fn === "." || fn === "..") continue;
    const file = path.resolve(dir, fn);
    const fileStat = statSync(file);
    if (fileStat.isDirectory()) {
      walk(file, filter, outArray);
    } else {
      if (filter(fn)) outArray.push(file);
    }
  }
}

export function readDirRecursive(
  path: string,
  filter: (fn: string) => boolean
): string[] {
  const result: string[] = [];
  walk(path, filter, result);
  return result;
}
