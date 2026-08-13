import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { scenariosForCorpus, launchDate } from "../lib/scenarios.mjs";
import { renderEml } from "../lib/email.mjs";
import { args } from "../lib/cli.mjs";

const options = args();
const recipient = options.recipient || process.env.SIGNALBOARD_DEMO_RECIPIENT || "demo@clawwatch.example";
const date = options["launch-date"] || process.env.SIGNALBOARD_LAUNCH_DATE || launchDate;
const root = path.resolve("corpora");

await mkdir(root, { recursive: true });

for (const corpus of ["starter", "workshop", "full"]) {
  const directory = path.join(root, corpus);
  await rm(directory, { recursive: true, force: true });
  await mkdir(directory, { recursive: true });
  for (const item of scenariosForCorpus(corpus)) {
    const slug = item.subject
      .replace(/^\[SignalBoard\]\s*/i, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 54);
    await writeFile(path.join(directory, `${item.id.toLowerCase()}-${slug}.eml`), renderEml(item, recipient, date));
  }
}

console.log(`Generated starter (3), workshop (12), and full (24) corpora for ${recipient}.`);
