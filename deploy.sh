#!/bin/bash

# CultureHub GitHub Deployment Script
# This script will help you deploy your app to GitHub

echo "🚀 CultureHub GitHub Deployment"
echo "================================"
echo ""

# Check if repository exists on GitHub
echo "📋 Step 1: Create GitHub Repository"
echo "   Go to: https://github.com/new"
echo "   Repository name: cultural-events-app"
echo "   Description: A React application for booking tickets to college cultural events"
echo "   Visibility: Public"
echo "   ❌ Do NOT initialize with README, .gitignore, or license"
echo ""
read -p "Press Enter once you've created the repository on GitHub..."

# Add remote origin
echo ""
echo "🔗 Step 2: Connecting to GitHub..."
git remote add origin https://github.com/Dharunmd/cultural-events-app.git
echo "✅ Remote origin added"

# Push to GitHub
echo ""
echo "📤 Step 3: Pushing to GitHub..."
git push -u origin main
echo "✅ Code pushed to GitHub"

# Deploy to GitHub Pages
echo ""
echo "🌐 Step 4: Deploying to GitHub Pages..."
npm run deploy
echo "✅ Deployed to GitHub Pages"

echo ""
echo "🎉 Deployment Complete!"
echo "================================"
echo ""
echo "Your app is now available at:"
echo "🔗 https://dharunmd.github.io/cultural-events-app/"
echo ""
echo "Repository:"
echo "🔗 https://github.com/Dharunmd/cultural-events-app"
echo ""
echo "Next steps:"
echo "1. Go to https://github.com/Dharunmd/cultural-events-app/settings/pages"
echo "2. Verify GitHub Pages is set to deploy from 'gh-pages' branch"
echo "3. Wait 1-2 minutes for deployment to complete"
echo "4. Visit your live site!"
echo ""
