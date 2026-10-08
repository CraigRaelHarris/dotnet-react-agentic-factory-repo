# Architecture

## Status

Draft

## Drivers

- [business/technical driver]

## Constraints

- Windows 11 development environment
- ASP.NET Core API + React/TypeScript frontend
- SQLite or PostgreSQL when persistence is required
- [project-specific constraints]

## System context

Starter baseline: browser → React/Vite → relative /api → ASP.NET Core. The development Vite proxy forwards to localhost:5080. Production requires a reverse proxy/static host, TLS and project-specific identity/authorization.

## Components

| Component | Responsibility | Interfaces | Data owned |
|---|---|---|---|
| React UI | Accessible status display | GET /api/status | UI state only |
| ASP.NET Core API | Application boundary | /api/status, /health | No persistence initially |

## Data architecture

[Data model, lifecycle, classification, source-of-truth rules]

## Key interfaces/contracts

[API schemas/events/files]

## Security / trust boundaries

[Assets, identities, trust boundaries, privileges, threat considerations]

## Reliability

[Retries, idempotency, timeouts, failure handling, recovery]

## Observability

[Logs/metrics/traces and business telemetry]

## Performance/scaling assumptions

[Expected volumes and thresholds that would trigger redesign]

## Architectural constraints for agents

- Do not introduce a new service/database/framework without documenting the need.
- Architectural changes require an ADR in `docs/decisions/`.
- Preserve clear dependency direction and testable boundaries.
