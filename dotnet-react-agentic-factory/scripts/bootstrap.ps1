[CmdletBinding()]
param()
. "$PSScriptRoot/common.ps1"
Push-Location (Split-Path $PSScriptRoot -Parent)
try {
    Assert-Toolchain
    # Generate dependency locks on first use; subsequent runs respect the locks.
    $locks = @(Get-ChildItem src, tests -Filter packages.lock.json -Recurse)
    if ($locks.Count -ge 2) {
        Invoke-Checked dotnet @('restore', 'Starter.sln', '-m:1', '--locked-mode')
    } else {
        Invoke-Checked dotnet @('restore', 'Starter.sln', '-m:1')
    }
    Invoke-Checked $script:NpmCommand @('--prefix', 'src/web', 'ci')
    if (-not (Test-Path .env)) { Copy-Item .env.example .env }
    if (Get-Command git -ErrorAction SilentlyContinue) {
        if (-not (Test-Path .git)) { Invoke-Checked git @('init', '--initial-branch=main') }
        Invoke-Checked git @('config', '--local', 'core.hooksPath', '.githooks')
    }
    Write-Host 'Ready. Fill in the project docs, then run ./scripts/verify.ps1 and /project-start in Kilo.'
} finally { Pop-Location }
