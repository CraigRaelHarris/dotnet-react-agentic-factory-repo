. "$PSScriptRoot/common.ps1"
Push-Location (Split-Path $PSScriptRoot -Parent)
try { Invoke-Checked $script:NpmCommand @('--prefix', 'src/web', 'run', 'dev') }
finally { Pop-Location }
