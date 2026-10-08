[CmdletBinding()]
param()
. "$PSScriptRoot/common.ps1"
Push-Location (Split-Path $PSScriptRoot -Parent)
try {
    Assert-Toolchain
    if (-not (Test-Path src/web/node_modules)) {
        throw 'Dependencies are missing. Run ./scripts/bootstrap.ps1 first.'
    }
    $gates = Get-Content quality-gates.json -Raw | ConvertFrom-Json
    Invoke-Checked dotnet @('restore', 'Starter.sln', '-m:1', '--locked-mode')
    Invoke-Checked dotnet @('format', 'Starter.sln', '--verify-no-changes', '--no-restore')
    Invoke-Checked dotnet @('build', 'Starter.sln', '-m:1', '--no-restore', '-c', 'Release')
    Invoke-Checked dotnet @('test', 'Starter.sln', '-m:1', '--no-build', '--no-restore', '-c', 'Release',
        '-p:CollectCoverage=true', '-p:CoverletOutputFormat=cobertura',
        '-p:ExcludeByFile=**/Program.cs', "-p:Threshold=$($gates.backendLineCoverage)",
        '-p:ThresholdType=line')
    # NuGet audit during restore blocks vulnerability warnings at every severity.
    # Also inspect the explicit transitive vulnerability report, failing on advisories.
    $audit = & dotnet list Starter.sln package --vulnerable --include-transitive --no-restore --format json
    if ($LASTEXITCODE -ne 0) { throw 'NuGet vulnerability reporting failed.' }
    New-Item -ItemType Directory -Force artifacts | Out-Null
    $audit | Set-Content -Encoding utf8 artifacts/nuget-audit.json
    Invoke-Checked node @('scripts/check-nuget-audit.mjs', 'artifacts/nuget-audit.json')
    foreach ($check in @('format:check', 'lint', 'typecheck', 'test:coverage', 'build')) {
        Invoke-Checked $script:NpmCommand @('--prefix', 'src/web', 'run', $check)
    }
    Invoke-Checked $script:NpmCommand @('--prefix', 'src/web', 'audit', '--audit-level=low')
    Invoke-Checked node @('--test', 'scripts/tests/harness.test.mjs')
    Invoke-Checked node @('scripts/run-evals.mjs')
    Write-Host 'Verification passed. Eval scaffolding validates cases only; add real scorers for AI features.'
} finally { Pop-Location }
