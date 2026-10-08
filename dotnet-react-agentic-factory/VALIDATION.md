# Template validation

Validated on 2026-10-08 in Linux using .NET SDK 10.0.100, Node.js 24.19.0 and PowerShell 7.6.0. Windows/VS Code/Kilo integration was not launched here.

Passed:
- PowerShell syntax parsing and complete bootstrap (locked restore, npm ci, local Git setup).
- .NET Release build with zero warnings/errors.
- Four xUnit tests, including API/health/Problem Details contracts; Coverlet line/branch/method coverage 100% on the measured application code.
- Nine React behavior tests, including malformed responses, network failure and cancellation; frontend line/function/statement coverage 100%, branch coverage 94.44%.
- Frontend Prettier, ESLint, strict TypeScript and Vite production build.
- NuGet transitive vulnerability report and npm all-severity audit: no known vulnerable packages reported at validation time.
- Two harness regression tests and eval dataset validation.
- C# whitespace formatting check using dotnet format's folder mode.

Limitation:
The complete `scripts/verify.ps1` correctly stops when full solution `dotnet format` attempts to open an IPC named-pipe/socket blocked in this execution environment. Full semantic formatting was not verified here. That gate remains enabled for Windows and CI; run it locally before relying on the complete gate. No quality check was disabled in the shipped scripts.

Eval case validation is scaffold validation only, not a model evaluation. Production deployment, database migrations, auth and real AI features are intentionally project-specific.
