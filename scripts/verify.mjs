import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { args } from "../lib/cli.mjs";
import { parseHeaders } from "../lib/email.mjs";

const corpus = args().corpus || "full";
const directory = path.resolve("corpora", corpus);
const files = (await readdir(directory)).filter((file) => file.endsWith(".eml"));
const ids = new Set();
const messageIds = new Set();
const errors = [];

for (const file of files) {
  const { headers, body } = parseHeaders(await readFile(path.join(directory, file), "utf8"));
  for (const required of ["from", "to", "date", "message-id", "subject", "x-signalboard-fixture-id"]) {
    if (!headers[required]) errors.push(`${file}: missing ${required}`);
  }
  if (!headers.subject?.includes("[SignalBoard]")) errors.push(`${file}: missing subject marker`);
  if (!body) errors.push(`${file}: empty body`);
  if (ids.has(headers["x-signalboard-fixture-id"])) errors.push(`${file}: duplicate fixture ID`);
  if (messageIds.has(headers["message-id"])) errors.push(`${file}: duplicate message ID`);
  ids.add(headers["x-signalboard-fixture-id"]);
  messageIds.add(headers["message-id"]);
}

const expected = { starter: 3, workshop: 12, full: 24 }[corpus];
if (files.length !== expected) errors.push(`Expected ${expected} messages, found ${files.length}`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Verified ${files.length} ${corpus} messages: valid headers, bodies, markers, and unique IDs.`);
}
