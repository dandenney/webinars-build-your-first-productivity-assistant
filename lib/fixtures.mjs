const fixturePattern = /^SB-(\d{3})$/i;

export function fixtureNumber(value) {
  const match = fixturePattern.exec(value || "");
  if (!match) throw new Error(`Invalid fixture ID: ${value}. Expected SB-NNN.`);
  return Number(match[1]);
}

export function selectFixtureRange(items, from, to) {
  if (!from && !to) return items;
  if (!from || !to) throw new Error("Fixture ranges require both --from and --to.");

  const start = fixtureNumber(from);
  const end = fixtureNumber(to);
  if (start > end) throw new Error(`Invalid fixture range: ${from} comes after ${to}.`);

  const selected = items.filter((item) => {
    const id = typeof item === "string" ? item : item.fixture_id;
    const number = fixtureNumber(id);
    return number >= start && number <= end;
  });
  if (!selected.length) throw new Error(`No fixtures found from ${from} through ${to}.`);
  return selected;
}
