# .NET + React Agentic Engineering Factory

Reusable starter repository for production-minded, AI-assisted engineering on **Windows 11 + VS Code**, using **Kilo Code + OpenRouter + GLM-5.3**.

Adapted from the supplied Python factory. It preserves discovery, specifications, architecture records, guardrails, agent roles, commands, token policy, observability and eval scaffolding, with a .NET/React implementation and deterministic quality controls.

## Stack

| Area | Default |
|---|---|
| Backend | .NET 10 LTS, C#, ASP.NET Core minimal API |
| Frontend | React, strict TypeScript, Vite |
| Packages | NuGet + npm, committed lockfiles |
| Backend tests | xUnit + WebApplicationFactory + Coverlet |
| Frontend tests | Vitest + Testing Library + V8 coverage |
| Checks | .NET analyzers, dotnet format, TypeScript, ESLint, Prettier |
| Dependency security | NuGet audit (including transitive packages), npm audit |
| Coverage | 80% backend lines; 80% frontend lines/statements/functions/branches |
| Persistence | SQLite or PostgreSQL when required; no database dependency installed initially |
| CI | GitHub Actions Windows verification workflow |
| Agent harness | Kilo Code + OpenRouter + `z-ai/glm-5.3` |

Installed frontend versions are pinned in `src/web/package.json` and `package-lock.json`; .NET versions are in the project files and `packages.lock.json`. .NET SDK roll-forward stays within version 10. Use current stable servicing patches.

## One-time Windows setup

Install **Git for Windows**, the **.NET 10 SDK** (not only the runtime), **Node.js 24 LTS**, **VS Code** and **Kilo Code**. Optional: PowerShell 7, Docker Desktop and DBeaver for database work. Install recommended VS Code extensions when prompted. C# Dev Kit is optional; check its licensing for your organization, or use the C# extension alone.

Check a new PowerShell terminal:

```powershell
git --version
dotnet --version
node --version
npm --version
```

If local PowerShell script execution is blocked, use `Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned` in that terminal. Review downloaded files and use `Unblock-File` for this folder's scripts if required by the download mark. Do not change machine-wide execution policy.

## Create a new project

Extract this folder to, for example, `C:\code\my-project`. Open **that folder** in VS Code and run from its root:

```powershell
./scripts/bootstrap.ps1
./scripts/verify.ps1
```

Bootstrap restores locked dependencies, creates a local `.env` reference file and configures a Git pre-commit verification hook. It initializes a new local repository if needed; no upstream remote is configured. Native command failures stop the scripts immediately. Commit the template files and dependency locks to your new repo. The ZIP contains no inherited Git history, caches or installed dependencies.

## Configure Kilo + OpenRouter

Select **OpenRouter** in Kilo provider settings and enter the API key there. Choose **`z-ai/glm-5.3`** as in the original factory; confirm availability under your OpenRouter account/provider/privacy settings. No model calls are made by bootstrap or verification.

`kilo.jsonc` retains automatic compaction at 60%, conservative tool permissions and the intended model. `.kilo/agents/`, `.kilo/commands/`, `.kilo/rules/`, `.kilo/skills/` and `.kilo/plugin/` hold project behavior. Use a current Kilo version supporting this configuration layout. Language support comes from C#/TypeScript tooling; configure Kilo indexing only when useful and review the embedding provider/data flow.

Before substantial implementation, fill in:

1. `DISCOVERY.md` — facts, unknowns, assumptions and open decisions.
2. `CONTEXT.md` — project purpose, users and boundaries.
3. `docs/specs/PRODUCT_SPEC.md` — scope, behavior and measurable acceptance criteria.
4. `docs/architecture/ARCHITECTURE.md` — components, contracts and constraints.
5. `GUARDRAILS.md` — hard project limits and approval boundaries.
6. `EVALS.md` — applicable AI/agentic outcome criteria.
7. `.env.example` — configuration names only; no secret values.

Then invoke **`/project-start`**. `PLAN.md` and `PROJECT_STATUS.md` are working documents updated during planning/implementation. `KILO-START.md` contains a copy/paste prompt if you prefer that entry point.

## Run

Open two PowerShell terminals at the repo root:

```powershell
# Terminal 1: API
./scripts/run-api.ps1
# Equivalent: dotnet run --project src/Starter.Api --launch-profile http
```

```powershell
# Terminal 2: UI
./scripts/run-web.ps1
# Equivalent: npm --prefix src/web run dev
```

Open **http://localhost:5173**. The page should show **Starter API: ready**. API endpoints: **http://localhost:5080/api/status** and **http://localhost:5080/health**. Stop servers with **Ctrl+C**.

Vite forwards `/api` and `/health` to the local API. No CORS wildcard is needed. The included development endpoint returns public status data; add authentication and authorization according to the product requirements before exposing protected features. Deployment, production TLS and secrets management remain project decisions.

## Quality gate

```powershell
./scripts/verify.ps1
```

The gate runs:

1. Locked .NET restore and all-severity transitive NuGet vulnerability audit.
2. `dotnet format` verification and Release build with warnings as errors.
3. xUnit unit/API integration tests and backend coverage enforcement.
4. Explicit NuGet vulnerability report validation.
5. Frontend format, lint, strict types, tests with coverage and production build.
6. All-severity `npm audit` including development dependencies.
7. Harness validation tests and eval case validation.

Coverage floors are in **`quality-gates.json`**. `Program.cs` transport wiring is excluded from line coverage and exercised by integration tests; React `main.tsx` mounting is excluded. Expand coverage with real domain features. No external-service, production or model credentials are required, but registry access is needed for restore/auditing. No Bandit, Ruff, mypy, Python or Python-based pre-commit dependency remains.

**Eval limitation:** `scripts/run-evals.mjs` validates dataset shape and unique IDs. It does not score model behavior. Build feature-specific execution/scorers and blocking thresholds before using it as evidence of AI quality.

The full gate also runs before a commit and in `.github/workflows/verify.yml`. It performs CI verification only; no deployment is configured.

## Databases and secrets

Default to SQLite for simple/local persistence; use PostgreSQL for justified concurrency/durability needs. Add EF Core SQLite or Npgsql/EF Core, migrations, tests and a recovery plan when required. Optional development PostgreSQL compose remains in `infra/`.

ASP.NET Core reads environment variables and development user secrets. **It does not automatically read `.env`.** See `docs/runbooks/DEVELOPMENT.md` for commands. Browser code and `VITE_*` values are public; never put API keys, database credentials or authorization decisions there.

## Factory workflow

Discover → Specify → Design → Plan → Implement → Test/Eval → Review → Verify → Ship → Learn.

Use `/implement`, `/verify`, `/review` and `/harness-audit` as needed. Keep changes in small vertical slices tied to acceptance criteria. Independent agent roles remain available, with approval boundaries for destructive operations and production actions.

## Repo map

| Purpose | Location |
|---|---|
| Operating contract and context | `AGENTS.md`, `CONTEXT.md` |
| Discovery, plan and handoff | `DISCOVERY.md`, `PLAN.md`, `PROJECT_STATUS.md` |
| Specs, architecture, ADRs and runbooks | `docs/` |
| Guardrails and evaluation contract | `GUARDRAILS.md`, `EVALS.md`, `SECURITY.md` |
| Agent roles, rules, commands and skills | `.kilo/` |
| Model, compaction and tool permissions | `kilo.jsonc` |
| Backend API | `src/Starter.Api/` |
| Backend tests | `tests/Starter.Api.Tests/` |
| React UI and its tests/tooling | `src/web/` |
| SDK, compiler/analyzers and coverage floors | `global.json`, `Directory.Build.props`, `quality-gates.json` |
| Bootstrap, run and verify scripts | `scripts/` |
| Commit hook and CI | `.githooks/`, `.github/workflows/` |
| Tool, plugin, orchestration and token policy | `TOOLS.md`, `MCP.md`, `PLUGINS.md`, `ORCHESTRATION.md`, `TOKEN_POLICY.md` |

Official references: [.NET support](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core), [Vite](https://vite.dev/guide/), [Kilo configuration](https://kilo.ai/docs/getting-started/settings), [Kilo plugins](https://kilo.ai/docs/automate/extending/plugins).
