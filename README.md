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

Move from the starter batch (3 messages), through the workshop expansion (9 new; 12 cumulative), to the full expansion (12 new; 24 cumulative).

## Full integration

The full path uses Zapier MCP as authenticated plumbing. OpenClaw remains responsible for polling, interpretation, deduplication, task creation, and synthesis. It does **not** require a traditional Zap.

Use only a dedicated demo Google account. Zapier's Gmail connector may request broad OAuth permissions even when the exposed OpenClaw tools are later narrowed.

1. Prepare and preview the starter corpus locally.
2. Connect Zapier MCP to OpenClaw before seeding.
3. Connect the dedicated demo Gmail and Google Tasks accounts once.
4. Enable Gmail Find Email and Send Email for the approved lab; do not enable unrelated Gmail writes.
5. Enable Google Tasks find/list, create, and update actions.
6. Verify runtime readiness by resolving Gmail schemas, the default Tasks connection, and a writable task list.
7. Seed the full corpus once with `npm run seed -- --corpus full`.
8. Prepare the three incremental range manifests with `npm run batch`.
9. Preview and approve one exact 24-message delivery contract covering batches of 3, 9, and 12.
10. Deliver and analyze each range progressively without resending earlier fixtures.
11. Remove Gmail Send Email manually after the final batch and verify Find Email remains available.
12. Apply the workflow in `templates/signalboard-workflow.md`.

The repository deliberately does not store OAuth tokens or send mail by itself. Provider-specific credentials do not belong in workshop fixtures.

## Suggested webinar prompts

Start small:

> Check for new SignalBoard messages and turn them into tasks. Do not create duplicates.

Reveal the corpus:

> Give me an honest first-week assessment of the SignalBoard launch. Separate evidence, inference, and unknowns.

Push beyond summarization:

> What are customers telling us that our launch dashboard isn't?

Bonus 1, only if time allows:

> Compare the assessment with Google Tasks. Consolidate duplicates and propose only the missing follow-up work. Show me the plan and ask before creating or updating anything.

Bonus 2, only if time allows:

> Turn the assessment into a one-page State of the Claw leadership report using the repository template. Create a local PDF at reports/state-of-the-claw-week-1.pdf, preserve source fixture IDs, and do not send or publish it.

## After populating the demo inbox

Once all approved SignalBoard batches have been delivered and the launch assessment is complete, reconcile the assessment with the current task list. Use this prompt:

> Compare the assessment with current and completed Google Tasks. Group related evidence by root cause, update existing tasks when new messages add material context, and propose only missing follow-up work. Preserve every contributing fixture ID and message ID. Show me the consolidated plan and ask before creating or updating anything.

After approving the proposed changes, ask OpenClaw to apply them and rerun the comparison to confirm that no duplicate work was created.

Then remove **Gmail Send Email** manually in Zapier's MCP configuration UI. Do not ask OpenClaw to remove the action programmatically: Gmail Find Email and Send Email can share the same internal action key, so programmatic removal may disable both. Verify that:

- Gmail Send Email is no longer available.
- Gmail Find Email still resolves.
- Google Tasks find/list, create, and update actions remain ready.

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
npm run preview -- --corpus full --from SB-004 --to SB-012
npm run seed -- --corpus full
npm run batch -- --from SB-001 --to SB-003
npm run batch -- --from SB-004 --to SB-012
npm run batch -- --from SB-013 --to SB-024
npm run reset -- --confirm
```

## License

MIT. The scenario and fixtures are intentionally reusable for workshops, talks, and experiments.
