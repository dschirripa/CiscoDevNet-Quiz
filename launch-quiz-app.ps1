$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$appPath = Join-Path $repoRoot 'quiz-app\index.html'

if (-not (Test-Path $appPath)) {
    Write-Error "Quiz app not found at $appPath"
}

Start-Process $appPath
Write-Host "Launched quiz app: $appPath"