import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { args } from "../lib/cli.mjs";
import { selectFixtureRange } from "../lib/fixtures.mjs";

const options = args();
if (!options.from || !options.to) throw new Error("Pass both --from and --to, for example --from SB-004 --to SB-012.");

const source = path.resolve("outbox", "full", "manifest.json");
let manifest;
try {
  manifest = JSON.parse(await readFile(source, "utf8"));
} catch (error) {
  if (error.code === "ENOENT") throw new Error("Seed the full corpus first with: npm run seed -- --corpus full");
  throw error;
}

const selected = selectFixtureRange(manifest, options.from, options.to);
const batchName = `${options.from.toLowerCase()}-${options.to.toLowerCase()}`;
const directory = path.resolve("outbox", "batches", batchName);
await mkdir(directory, { recursive: true });
const target = path.join(directory, "manifest.json");
await writeFile(target, `${JSON.stringify(selected, null, 2)}\n`);

console.log(`Prepared ${selected.length} synthetic messages (${options.from} through ${options.to}) in ${path.relative(process.cwd(), target)}.`);
console.log("No email was sent. This filtered manifest is for reviewed, deduplicated connector delivery.");
