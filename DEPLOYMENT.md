# Deployment Guide - Captain Candy Manager

## 🚀 Deploy to Netlify (Complete Guide)

### Step 1: Prepare Your Repository

```bash
cd instagram-planner

# Make sure all dependencies are installed
npm install

# Test build locally
npm run build

# If build succeeds, you're ready!
```

### Step 2: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Instagram Planner MVP"

# Add remote repository
git remote add origin https://github.com/napobuilder/instagram-planner.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Connect to Netlify

1. **Go to Netlify**: https://app.netlify.com
2. **Sign in** with GitHub account
3. **Click "Add new site"** → "Import an existing project"
4. **Select "Deploy with GitHub"**
5. **Authorize Netlify** to access your repositories
6. **Select** `napobuilder/instagram-planner`

### Step 4: Configure Build Settings

Netlify will auto-detect the settings from `netlify.toml`, but verify:

```
Build command: npm run build
Publish directory: dist
Functions directory: netlify/functions
```

### Step 5: Deploy!

Click **"Deploy site"**

Netlify will:
- Install dependencies
- Run build command
- Deploy to a temporary URL (e.g., `random-name-123.netlify.app`)

### Step 6: Configure Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow DNS instructions

---

## 🔄 Continuous Deployment

Once connected, every push to `main` branch will automatically:
1. Trigger a new build
2. Run tests (if configured)
3. Deploy to production

---

## 📦 Build Optimization

### Included Optimizations:

✅ **Code splitting** - Automatic by Vite
✅ **Tree shaking** - Removes unused code
✅ **Minification** - Compressed JS/CSS
✅ **Image optimization** - External URLs (Catbox/Drive)
✅ **Lazy loading** - Components load on demand

### Performance Tips:

1. **Use CDN URLs** - Catbox.moe for fast delivery
2. **Compress images** - Before uploading
3. **Limit carousel items** - Max 10 (Instagram limit)
4. **Export regularly** - Keep localStorage light

---

## 🔧 Environment Variables (If Needed)

On Netlify dashboard:
1. Go to **Site settings** → **Environment variables**
2. Add variables:
   ```
   VITE_API_URL=your-api-url
   ```
3. Redeploy to apply changes

---

## 🧪 Testing Before Deploy

```bash
# Build locally
npm run build

# Preview build
npm run preview

# Open http://localhost:4173
```

---

## 📊 Netlify Features Included

### Functions
- ✅ Upload proxy at `/.netlify/functions/upload`
- ✅ Serverless, scales automatically
- ✅ No backend server needed

### Redirects
- ✅ SPA routing configured
- ✅ All routes redirect to `index.html`

### Performance
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ HTTP/2 enabled

---

## 🎯 Post-Deploy Checklist

- [ ] Test editor mode
- [ ] Test view mode
- [ ] Create a test post
- [ ] Test carousel with 3+ items
- [ ] Export JSON
- [ ] Test client URL with `?mode=view&feed=URL`
- [ ] Test on mobile device
- [ ] Share with a test client

---

## 🐛 Common Issues

### Build Fails

**Error: "Command failed with exit code 1"**

Solution:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Functions Not Working

**Error: "Function not found"**

Solution:
1. Check `netlify.toml` has correct path
2. Verify `netlify/functions/` directory exists
3. Check function file is `.js` not `.ts`

### Site Shows Blank Page

**Error: White screen / no content**

Solution:
1. Check browser console (F12)
2. Verify build completed successfully
3. Check `dist/` folder was created
4. Hard refresh (Ctrl+Shift+R)

---

## 📈 Monitoring

### Netlify Analytics

Enable in dashboard:
- Page views
- Unique visitors
- Top pages
- Bandwidth usage

### Performance

Check with:
- Lighthouse (Chrome DevTools)
- PageSpeed Insights
- WebPageTest.org

---

## 🔐 Security

### Best Practices:

✅ HTTPS enabled by default
✅ No API keys in frontend code
✅ LocalStorage for client-side only
✅ Serverless functions for uploads

### Recommendations:

- Don't store sensitive data in localStorage
- Use environment variables for API keys
- Enable Netlify's security headers

---

## 🚦 Deployment Status

After deployment, you'll get:

- **Site URL**: `your-site.netlify.app`
- **Deploy log**: Full build output
- **Functions**: Listed in dashboard
- **Analytics**: Real-time stats

---

## 🎉 Success!

Your Instagram Planner is now live!

Share these URLs:

- **Editor**: `https://your-site.netlify.app`
- **Client View**: `https://your-site.netlify.app/?mode=view`
- **With Feed**: `https://your-site.netlify.app/?mode=view&feed=JSON_URL`

---

## 🔄 Updating Your Site

```bash
# Make changes
git add .
git commit -m "Update: description of changes"
git push

# Netlify automatically deploys!
```

---

## 💡 Pro Tips

1. **Branch Previews**: Create PR for preview deploy
2. **Rollback**: One-click rollback in Netlify
3. **Split Testing**: A/B test different versions
4. **Form Handling**: Netlify Forms for contact forms

---

Need help? Check:
- [Netlify Docs](https://docs.netlify.com)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Issues](https://github.com/napobuilder/instagram-planner/issues)

