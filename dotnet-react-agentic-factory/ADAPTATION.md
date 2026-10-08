# Adaptation from the Python factory

Preserved: discovery/specification/architecture templates, approval boundaries, guardrails, context discipline, eval rubric, agent roles and commands, observability, orchestration, token policy, MCP inventory and optional development PostgreSQL.

Replaced: Python source and pyproject/uv with a .NET solution, ASP.NET Core API and React/TypeScript UI. Ruff/mypy/pytest/Bandit/pip-audit became dotnet format/compiler analyzers/xUnit/Coverlet and ESLint/TypeScript/Vitest/Prettier plus NuGet/npm auditing. PowerShell bootstrap/run/verification scripts fail immediately on native nonzero exit codes. Git hooks no longer require Python pre-commit.

Added: a working API/UI slice, integration/acceptance tests, UI error/malformed-response tests, dependency lockfiles, coverage settings, GitHub Actions verification, C#/React skills and VS Code tooling.

Corrected: planner permissions allow PLAN.md and PROJECT_STATUS.md updates; tester permissions allow colocated React tests; the secret-read plugin allows safe .env.example documentation. Its pattern checks remain advisory defense in depth and do not sandbox arbitrary shell code.

No inherited .git history, notes from prior sessions, installed dependencies, caches, secrets or production configuration are shipped. New projects are initialized locally by bootstrap. Persistence packages, auth/provider choice, deployment, cloud and model-based eval execution are selected per project.
