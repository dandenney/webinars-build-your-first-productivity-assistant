import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { args } from "../lib/cli.mjs";
import { parseHeaders } from "../lib/email.mjs";
import { selectFixtureRange } from "../lib/fixtures.mjs";

const options = args();
const corpus = options.corpus || "starter";
const directory = path.resolve("corpora", corpus);
const files = (await readdir(directory)).filter((file) => file.endsWith(".eml")).sort();
const messages = [];

for (const file of files) {
  const parsed = parseHeaders(await readFile(path.join(directory, file), "utf8"));
  messages.push({ file, ...parsed, fixture_id: parsed.headers["x-signalboard-fixture-id"] });
}

const selected = selectFixtureRange(messages, options.from, options.to);
const range = options.from ? ` (${options.from} through ${options.to})` : "";

console.log(`SignalBoard ${corpus} corpus${range} — ${selected.length} synthetic messages\n`);
for (const { headers, body } of selected) {
  const excerpt = body.replace(/\s+/g, " ").slice(0, 96);
  console.log(`${headers["x-signalboard-fixture-id"]}  ${headers.from}`);
  console.log(`  ${headers.subject}`);
  console.log(`  ${excerpt}${body.length > 96 ? "…" : ""}\n`);
}
