Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$script:NpmCommand = if ($env:OS -eq 'Windows_NT') { 'npm.cmd' } else { 'npm' }

function Invoke-Checked {
    param([string]$Command, [string[]]$Arguments = @())
    Write-Host ("Running: " + $Command + " " + ($Arguments -join " "))
    & $Command @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "$Command failed with exit code $LASTEXITCODE."
    }
}

function Assert-Toolchain {
    foreach ($tool in @('dotnet', 'node', $script:NpmCommand)) {
        if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) {
            throw "Missing $tool. Install .NET 10 SDK and Node.js 24 LTS, then reopen the terminal."
        }
    }
    Invoke-Checked node @('-e', 'if (Number(process.versions.node.split(".")[0]) !== 24) throw new Error("Use Node.js 24 LTS")')
    Invoke-Checked dotnet @('--version')
}
