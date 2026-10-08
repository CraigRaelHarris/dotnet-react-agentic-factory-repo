# Initial prompt for Kilo

Read AGENTS.md, CONTEXT.md, DISCOVERY.md, GUARDRAILS.md, EVALS.md, docs/specs/PRODUCT_SPEC.md and docs/architecture/ARCHITECTURE.md.
Inspect the .NET API, React UI, tests and existing quality gates before proposing changes.
Identify missing decisions, observable acceptance criteria and the smallest useful vertical slice.
Write an implementation plan in PLAN.md with exact verification commands. Update PROJECT_STATUS.md with facts and open issues.
Do not begin substantial implementation until the plan is clear and accepted.
Keep README's Run section current, including commands, ports, environment variables, dependencies and how to stop each process.
Use /implement for the agreed slice, /verify for the full gate and /review for independent review when warranted.
Never claim a check passed unless actually run; do not weaken gates to obtain a pass.
