#!/bin/bash

# Instagram Planner - Quick Deploy Script
# This script helps you deploy to GitHub and Netlify

echo "🍬 Captain Candy Manager - Deployment Script"
echo "=============================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git branch -M main
else
    echo "✓ Git repository already initialized"
fi

# Check if remote exists
if ! git remote | grep -q 'origin'; then
    echo "🔗 Adding remote origin..."
    git remote add origin https://github.com/napobuilder/instagram-planner.git
else
    echo "✓ Remote origin already configured"
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✓ Dependencies already installed"
fi

# Run build test
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✓ Build successful!"
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

# Stage all changes
echo "📝 Staging changes..."
git add .

# Commit
echo "💾 Creating commit..."
read -p "Enter commit message (or press Enter for default): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Update: $(date '+%Y-%m-%d %H:%M:%S')"
fi
git commit -m "$commit_msg"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully deployed to GitHub!"
    echo ""
    echo "Next steps:"
    echo "1. Go to https://app.netlify.com"
    echo "2. Click 'Add new site' → 'Import an existing project'"
    echo "3. Connect to GitHub and select 'instagram-planner'"
    echo "4. Netlify will auto-detect settings from netlify.toml"
    echo "5. Click 'Deploy site'"
    echo ""
    echo "Your site will be live at: https://your-site.netlify.app"
else
    echo "❌ Push failed. Please check your credentials and try again."
    exit 1
fi

