import test from "node:test";
import assert from "node:assert/strict";
import { scenarios, scenariosForCorpus } from "../lib/scenarios.mjs";
import { parseHeaders, renderEml } from "../lib/email.mjs";

test("corpora have the intended cumulative sizes", () => {
  assert.equal(scenariosForCorpus("starter").length, 3);
  assert.equal(scenariosForCorpus("workshop").length, 12);
  assert.equal(scenariosForCorpus("full").length, 24);
});

test("fixture and message IDs are unique", () => {
  assert.equal(new Set(scenarios.map(({ id }) => id)).size, scenarios.length);
  for (const scenario of scenarios) assert.match(scenario.subject, /^\[SignalBoard\]/);
});

test("rendered EML is parseable and identifies its fixture", () => {
  const eml = renderEml(scenarios[0], "demo@example.com", "2026-08-04");
  const { headers, body } = parseHeaders(eml);
  assert.equal(headers["x-signalboard-fixture-id"], "SB-001");
  assert.equal(headers.to, "demo@example.com");
  assert.match(body, /field report/);
});
