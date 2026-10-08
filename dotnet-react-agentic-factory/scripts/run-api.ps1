. "$PSScriptRoot/common.ps1"
Push-Location (Split-Path $PSScriptRoot -Parent)
try { Invoke-Checked dotnet @('run', '--project', 'src/Starter.Api', '--launch-profile', 'http') }
finally { Pop-Location }
