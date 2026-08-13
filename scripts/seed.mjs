import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { args, assertDemoRecipient } from "../lib/cli.mjs";
import { digest, parseHeaders } from "../lib/email.mjs";

const options = args();
const corpus = options.corpus || "starter";
const transport = options.transport || "outbox";
const recipient = options.recipient || process.env.SIGNALBOARD_DEMO_RECIPIENT;

if (transport !== "outbox") {
  assertDemoRecipient(recipient, options["confirm-demo-account"]);
  throw new Error("This repository does not transmit credentials or email. Ask OpenClaw to deliver the generated outbox through an approved connector.");
}

const source = path.resolve("corpora", corpus);
const outbox = path.resolve("outbox", corpus);
const files = (await readdir(source)).filter((file) => file.endsWith(".eml")).sort();
await mkdir(outbox, { recursive: true });

const manifest = [];
for (const file of files) {
  const content = await readFile(path.join(source, file), "utf8");
  const { headers, body } = parseHeaders(content);
  const target = path.join(outbox, file);
  await writeFile(target, content);
  manifest.push({
    fixture_id: headers["x-signalboard-fixture-id"],
    message_id: headers["message-id"],
    from: headers.from,
    to: recipient || headers.to,
    subject: headers.subject,
    body,
    sha256: digest(content),
    file: path.relative(process.cwd(), target),
  });
}

await writeFile(path.join(outbox, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
await writeFile(".signalboard-state.json", `${JSON.stringify({ corpus, transport, count: manifest.length, created_at: new Date().toISOString() }, null, 2)}\n`);
console.log(`Prepared ${manifest.length} idempotent messages in ${path.relative(process.cwd(), outbox)}.`);
console.log("No email was sent. Review manifest.json before asking OpenClaw to deliver it to a dedicated demo inbox.");
