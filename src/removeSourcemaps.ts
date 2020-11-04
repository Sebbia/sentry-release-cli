import { readDirRecursive } from "./readDirRecursive";
import { readFileSync, writeFileSync, unlinkSync, existsSync } from "fs";
import path from "path";

const jsFilesRx = /\.(js|css)$/;
const mapFilesRx = /\.(js|css)\.map$/;

function removeSourcemapComments(buildFolder: string) {
  const files = readDirRecursive(buildFolder, (fn) => jsFilesRx.test(fn));
  for (const fn of files) {
    const data = readFileSync(fn, "utf8");
    const lines = data.split("\n");
    const resultingLines = lines.filter(
      (line) => !/^.*# sourceMappingURL=(.*\.map).*/.test(line)
    );
    if (lines.length !== resultingLines.length) {
      writeFileSync(fn, resultingLines.join("\n"), "utf8");
      console.log(`Sourcemap comment removed from: ${fn}`);
    }
  }
}

function removeFiles(buildFolder: string) {
  const files = readDirRecursive(buildFolder, (fn) => mapFilesRx.test(fn));
  for (const fn of files) {
    unlinkSync(fn);
    console.log(`Sourcemap file deleted: ${fn}`);
  }
}

function removeFromWebpackManifest(buildFolder: string) {
  const manifestFile = path.join(buildFolder, "asset-manifest.json");
  if (!existsSync(manifestFile)) return;

  const manifestObj = JSON.parse(readFileSync(manifestFile, "utf8"));

  let changed = false;

  const files = manifestObj["files"] as Record<string, any>;
  for (const key in files) {
    const value = files[key];
    if (mapFilesRx.test(value)) {
      console.log(`Removed record from manifest: ${key} = ${value}`);
      delete files[key];
      changed = true;
    }
  }

  writeFileSync(manifestFile, JSON.stringify(manifestObj, undefined, 2));
}

export function removeSourcemaps(buildFolder: string) {
  removeSourcemapComments(buildFolder);
  removeFiles(buildFolder);
  removeFromWebpackManifest(buildFolder);
}
