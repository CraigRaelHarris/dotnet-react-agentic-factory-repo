# .NET C# rules
- Target .NET 10; enable nullable reference types, implicit usings and compiler/analyzer warnings as errors.
- Use idiomatic C#, dependency injection, explicit contracts and async I/O with CancellationToken.
- Keep business logic testable and independent of ASP.NET transport and persistence.
- Validate at trust boundaries; return consistent Problem Details for errors. Do not expose stack traces in production.
- Use typed DTOs, UTC timestamps, parameterized SQL and bounded retries/timeouts.
- Use EF Core with SQLite/PostgreSQL only when persistence is needed; add migration and recovery instructions.
- Add xUnit unit/integration/acceptance tests for changed public behavior.
- Run dotnet format, build, tests with coverage and transitive NuGet auditing before completion.
- Keep NuGet package versions and packages.lock.json reviewed and committed.
