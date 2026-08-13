import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { args } from "../lib/cli.mjs";
import { parseHeaders } from "../lib/email.mjs";

const options = args();
const corpus = options.corpus || "starter";
const directory = path.resolve("corpora", corpus);
const files = (await readdir(directory)).filter((file) => file.endsWith(".eml")).sort();

console.log(`SignalBoard ${corpus} corpus — ${files.length} synthetic messages\n`);
for (const file of files) {
  const { headers, body } = parseHeaders(await readFile(path.join(directory, file), "utf8"));
  const excerpt = body.replace(/\s+/g, " ").slice(0, 96);
  console.log(`${headers["x-signalboard-fixture-id"]}  ${headers.from}`);
  console.log(`  ${headers.subject}`);
  console.log(`  ${excerpt}${body.length > 96 ? "…" : ""}\n`);
}
