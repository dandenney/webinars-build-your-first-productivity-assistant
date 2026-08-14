# SignalBoard: State of the Claw

A reproducible OpenClaw webinar lab about a fictional post-launch review.

SignalBoard is a fictional DataCamp Labs feature that publishes notebook outputs as live, shareable dashboards. One week after launch, feedback is scattered across customer and internal email. ClawWatch Institute—marine researchers with sensor networks and an unreasonable number of spreadsheets—uses its flagship dashboard, **The Daily Claw**, to monitor lobster populations.

The lab demonstrates an escalating agent workflow:

1. Capture `[SignalBoard]` email as useful Google Tasks.
2. Deduplicate and connect related reports.
3. Assess the first launch week across qualitative evidence.
4. Identify unreliable metrics, contradictory promises, missing ownership, and positive outcomes.
5. Create only missing follow-up work, with approval boundaries.

## Quick start: choose local or Zapier

The local path needs no Google, Zapier, or credentials. The integrated path uses Zapier MCP with a dedicated synthetic demo Google account.

Clone the repository into the default OpenClaw workspace so the chat can find it:

```sh
cd ~/.openclaw/workspace
git clone https://github.com/dandenney/webinars-build-your-first-productivity-assistant.git signalboard-demo
```

If you clone it elsewhere, tell the chat the full path before starting:

> The SignalBoard repo is at `/full/path/to/signalboard-demo`. Use that folder for this code-along.

Then, from the repository:

```sh
cd signalboard-demo
npm run generate
npm run verify
npm run preview -- --corpus starter
```

Then ask OpenClaw:

> In the signalboard-demo repo, read `DEMO.md` and prepare the SignalBoard starter demo. Run the checks, then ask whether I want local-only or Zapier before seeding. Tell me what you changed, report connector readiness, and flag anything that needs my involvement.

Move from `starter` (3 messages), to `workshop` (12), to `full` (24).

## Full integration

The full path uses Zapier MCP as authenticated plumbing. OpenClaw remains responsible for polling, interpretation, deduplication, task creation, and synthesis. It does **not** require a traditional Zap.

Use only a dedicated demo Google account. Zapier's Gmail connector may request broad OAuth permissions even when the exposed OpenClaw tools are later narrowed.

1. Prepare and preview the starter corpus locally.
2. Connect Zapier MCP to OpenClaw before seeding.
3. Connect the dedicated demo Gmail and Google Tasks accounts.
4. Restrict enabled Gmail actions to the minimum required read/list action.
5. Restrict Google Tasks to list, create, and update.
6. Run `npm run seed -- --corpus starter` to prepare a reviewed outbox.
7. Ask OpenClaw to deliver that outbox to the demo inbox. This is an external action and requires confirmation.
8. Apply the workflow in `templates/signalboard-workflow.md`.

The repository deliberately does not store OAuth tokens or send mail by itself. Provider-specific credentials do not belong in workshop fixtures.

## Suggested webinar prompts

Start small:

> Check for new SignalBoard messages and turn them into tasks. Do not create duplicates.

Reveal the corpus:

> Give me an honest first-week assessment of the SignalBoard launch. Separate evidence, inference, and unknowns.

Push beyond summarization:

> What are customers telling us that our launch dashboard isn't?

Turn insight into controlled action:

> Compare the assessment with Google Tasks. Consolidate duplicates and propose only the missing follow-up work. Ask before creating it.

Finish with judgment:

> Draft the State of the Claw executive recap. Do not send it.

## Safety and reproducibility

- Every identity, domain, message, and metric is synthetic.
- `.example` and `.invalid` domains cannot represent real organizations.
- Stable fixture and message IDs make runs auditable and deduplicable.
- External delivery always requires an explicit demo-account confirmation.
- Reset moves generated local data into `.trash/`; it never deletes remote email or tasks.
- The answer key is for facilitators. Do not give it to the agent during the initial assessment.

## Development

```sh
npm test
npm run generate -- --recipient demo@example.com --launch-date 2026-08-04
npm run verify -- --corpus full
npm run preview -- --corpus workshop
npm run seed -- --corpus starter
npm run reset -- --confirm
```

## License

MIT. The scenario and fixtures are intentionally reusable for workshops, talks, and experiments.
