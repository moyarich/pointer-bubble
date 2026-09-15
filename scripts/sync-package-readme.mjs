import { copyFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptsDir, "..");
const source = resolve(repoRoot, "README.md");
const target = resolve(repoRoot, "packages/pointer-bubble/README.md");

if (process.argv.includes("--clean")) {
  await rm(target, { force: true });
  console.log("Removed generated packages/pointer-bubble/README.md");
} else {
  await copyFile(source, target);
  console.log("Synced README.md -> packages/pointer-bubble/README.md");
}
