# Development runbook

## First use
Run `./scripts/bootstrap.ps1` from the repository root. It restores .NET packages and npm dependencies, copies `.env.example` if needed, initializes Git when absent and installs the local commit hook. No Python installation is required.

## Run
Terminal 1: `./scripts/run-api.ps1` (http://localhost:5080).
Terminal 2: `./scripts/run-web.ps1` (http://localhost:5173).
Stop each server with Ctrl+C. The UI calls relative `/api` routes through Vite's proxy.

## Check
Run `./scripts/verify.ps1`; it stops at the first failing command. Network access to NuGet/npm is needed for dependency auditing.

## Add a dependency
Use `dotnet add src/Starter.Api package <package>` for backend packages, or `npm --prefix src/web install --save-exact <package>` for UI packages. Review dependency rationale and commit both manifest and lockfile. After changing .NET packages, run `dotnet restore Starter.sln` to update locks, then run verification.

## Secrets
Use `dotnet user-secrets init --project src/Starter.Api`, then set secrets with `dotnet user-secrets set ... --project src/Starter.Api`. The template itself needs no application secrets. `.env` is not auto-loaded. Never put secrets in VITE_* variables.

## Persistence
Add EF Core SQLite or Npgsql/EF Core when the spec requires persistence. Use matching EF Core 10 packages, committed migrations and a documented recovery plan. PostgreSQL compose is optional: `docker compose -f infra/docker-compose.postgres.yml up -d` (development only).

## Production handoff
Build API with `dotnet publish src/Starter.Api -c Release`, UI with `npm --prefix src/web run build`. Host `src/web/dist` with a reverse proxy forwarding `/api` and `/health` to the API. Set AllowedHosts, TLS, identities, authorization, health/readiness checks, telemetry, configuration and deployment recovery according to the project spec. Vite preview is a local preview, not a production server. No deployment is preconfigured.
