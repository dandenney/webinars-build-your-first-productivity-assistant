import { access, mkdir, rename } from "node:fs/promises";
import path from "node:path";
import { args } from "../lib/cli.mjs";

const options = args();
if (!options.confirm) throw new Error("Reset is recoverable but requires --confirm.");

const outbox = path.resolve("outbox");
try {
  await access(outbox);
} catch {
  console.log("Nothing to reset.");
  process.exit(0);
}

const trashRoot = path.resolve(".trash");
await mkdir(trashRoot, { recursive: true });
const destination = path.join(trashRoot, `outbox-${new Date().toISOString().replace(/[:.]/g, "-")}`);
await rename(outbox, destination);
console.log(`Moved generated outbox to ${path.relative(process.cwd(), destination)}. It can be recovered manually.`);
console.log("Remote email and Google Tasks are intentionally untouched.");
