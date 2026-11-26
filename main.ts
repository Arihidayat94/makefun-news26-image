// make.fun entry — news-image-20261126.
//
// The entry is one picture: entry.png, a newspaper front page summing up
// 26 November 2026 world news (Cairo tanker fire, Trump tariffs, the
// Netanyahu case, Poland's no-fly zone, the Swiss diplomat expelled from
// North Korea, the Cartagena hostage rescue). This program has a single job:
// hand that picture to the grader, byte for byte, in the output folder.
//
// It runs on Node 22 using only the standard library. Nothing is fetched
// over the network, nothing is drawn at run time, and the clock is never
// read, so every run produces exactly the same file.
//
// The grader sets MAKEFUN_OUTPUT_DIR (inside its container that is /output).
// To try it by hand:
//   MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// The picture sits next to this file, wherever the repo is checked out.
const repoFolder = dirname(fileURLToPath(import.meta.url));
const picturePath = join(repoFolder, 'entry.png');

// The grader tells us where to put the result; /output is the fallback.
const outputFolder = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

let pictureBytes;
try {
  pictureBytes = readFileSync(picturePath);
} catch {
  console.error(`Missing picture: ${picturePath} was not found next to main.ts`);
  process.exit(1);
}

mkdirSync(outputFolder, { recursive: true });
const deliveredPath = join(outputFolder, 'entry.png');
writeFileSync(deliveredPath, pictureBytes);

// Self-check: read the delivered file back and make sure it matches the
// source byte for byte. A silent partial copy would fail the entry, so
// fail loudly here instead of printing success.
const deliveredBytes = readFileSync(deliveredPath);
if (!deliveredBytes.equals(pictureBytes)) {
  console.error(`Delivered file ${deliveredPath} does not match ${picturePath}`);
  process.exit(1);
}

console.log(`Delivered entry.png (${pictureBytes.length} bytes) to ${deliveredPath}`);
