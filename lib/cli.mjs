export function args(argv = process.argv.slice(2)) {
  const result = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[index + 1];
    result[key] = next && !next.startsWith("--") ? argv[++index] : true;
  }
  return result;
}

export function assertDemoRecipient(recipient, confirmed) {
  if (!recipient) throw new Error("A recipient is required. Pass --recipient or set SIGNALBOARD_DEMO_RECIPIENT.");
  if (!confirmed) throw new Error("External seeding requires --confirm-demo-account.");
  if (/datacamp\.com$/i.test(recipient)) throw new Error("Refusing to seed a DataCamp address. Use a dedicated synthetic demo account.");
}
