# Instagram Planner - Quick Deploy Script (Windows)
# Run with: .\deploy.ps1

Write-Host "🍬 Captain Candy Manager - Deployment Script" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path .git)) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    git branch -M main
} else {
    Write-Host "✓ Git repository already initialized" -ForegroundColor Green
}

# Check if remote exists
$remotes = git remote
if ($remotes -notcontains "origin") {
    Write-Host "🔗 Adding remote origin..." -ForegroundColor Yellow
    git remote add origin https://github.com/napobuilder/instagram-planner.git
} else {
    Write-Host "✓ Remote origin already configured" -ForegroundColor Green
}

# Install dependencies if needed
if (-not (Test-Path node_modules)) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "✓ Dependencies already installed" -ForegroundColor Green
}

# Run build test
Write-Host "🏗️  Testing build..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed. Please fix errors before deploying." -ForegroundColor Red
    exit 1
}

# Stage all changes
Write-Host "📝 Staging changes..." -ForegroundColor Yellow
git add .

# Commit
Write-Host "💾 Creating commit..." -ForegroundColor Yellow
$commit_msg = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($commit_msg)) {
    $commit_msg = "Update: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
}
git commit -m $commit_msg

# Push to GitHub
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Successfully deployed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Go to https://app.netlify.com" -ForegroundColor White
    Write-Host "2. Click 'Add new site' → 'Import an existing project'" -ForegroundColor White
    Write-Host "3. Connect to GitHub and select 'instagram-planner'" -ForegroundColor White
    Write-Host "4. Netlify will auto-detect settings from netlify.toml" -ForegroundColor White
    Write-Host "5. Click 'Deploy site'" -ForegroundColor White
    Write-Host ""
    Write-Host "Your site will be live at: https://your-site.netlify.app" -ForegroundColor Green
} else {
    Write-Host "❌ Push failed. Please check your credentials and try again." -ForegroundColor Red
    exit 1
}

