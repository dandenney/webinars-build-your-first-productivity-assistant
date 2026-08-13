import { createHash } from "node:crypto";

export function fixtureDate(launchDate, day, hour) {
  const date = new Date(`${launchDate}T00:00:00-05:00`);
  date.setDate(date.getDate() + day);
  date.setHours(date.getHours() + hour);
  return date;
}

export function messageId(id) {
  return `<${id.toLowerCase()}@signalboard-demo.invalid>`;
}

export function renderEml(item, recipient, launchDate) {
  const date = fixtureDate(launchDate, item.day, item.hour);
  return [
    `From: ${item.from}`,
    `To: ${recipient}`,
    `Date: ${date.toUTCString()}`,
    `Message-ID: ${messageId(item.id)}`,
    `Subject: ${item.subject}`,
    `X-SignalBoard-Fixture-ID: ${item.id}`,
    `X-SignalBoard-Role: ${item.role}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    item.body,
    "",
  ].join("\r\n");
}

export function digest(text) {
  return createHash("sha256").update(text).digest("hex");
}

export function parseHeaders(eml) {
  const [rawHeaders, ...bodyParts] = eml.split(/\r?\n\r?\n/);
  const headers = {};
  for (const line of rawHeaders.split(/\r?\n/)) {
    const index = line.indexOf(":");
    if (index > 0) headers[line.slice(0, index).toLowerCase()] = line.slice(index + 1).trim();
  }
  return { headers, body: bodyParts.join("\n\n").trim() };
}
