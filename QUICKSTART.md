# 🚀 Quick Deploy Instructions

## Step 1: Initialize & Push to GitHub

Open PowerShell in the `instagram-planner` directory and run:

```powershell
# Run the deploy script
.\deploy.ps1
```

Or manually:

```powershell
# Initialize git
git init
git branch -M main

# Add remote
git remote add origin https://github.com/napobuilder/instagram-planner.git

# Stage and commit
git add .
git commit -m "Initial commit: Instagram Planner MVP"

# Push
git push -u origin main
```

## Step 2: Deploy to Netlify

### Option A: Through Netlify Website (Recommended)

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Click "Deploy with GitHub"
4. Authorize Netlify
5. Select `napobuilder/instagram-planner`
6. Settings will auto-configure from `netlify.toml`
7. Click "Deploy site"

### Option B: Using Netlify CLI

```powershell
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## Step 3: Test Your Site

Once deployed, you'll get a URL like:
```
https://your-site-name.netlify.app
```

Test both modes:
- Editor: `https://your-site.netlify.app`
- Client: `https://your-site.netlify.app/?mode=view`

## ✅ Checklist

- [ ] Code pushed to GitHub successfully
- [ ] Netlify connected to repository
- [ ] Build completed without errors
- [ ] Site is live and accessible
- [ ] Editor mode works
- [ ] Client view mode works
- [ ] Create/Edit/Delete posts working
- [ ] Carousel with multiple items working
- [ ] Export/Import JSON working

## 🔄 Future Updates

To update your site:

```powershell
git add .
git commit -m "Update: description of changes"
git push
```

Netlify will automatically rebuild and deploy!

## 📝 Notes

- First build may take 2-3 minutes
- Subsequent builds are faster (~1 minute)
- Netlify Functions are included automatically
- HTTPS is enabled by default
- Custom domain can be added in Netlify dashboard

## 🆘 Troubleshooting

### If build fails:

```powershell
# Clear and reinstall
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json
npm install
npm run build
```

### If functions don't work:

- Check `netlify/functions/` directory exists
- Verify `netlify.toml` is in root
- Check Netlify dashboard → Functions tab

---

**Need help?** Open an issue on GitHub or check DEPLOYMENT.md for detailed guide.

