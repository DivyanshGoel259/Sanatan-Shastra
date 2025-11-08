# Deployment Guide - Sanatan Shastra

## 🚀 Quick Fix for Vercel Build Error

If you're getting a webpack build error on Vercel, follow these steps:

### 1. Check the files created:
- ✅ `vercel.json` - Vercel configuration
- ✅ `.node-version` - Node version specification
- ✅ `.npmrc` - NPM configuration
- ✅ `next.config.js` - Next.js configuration
- ✅ `package.json` - Updated with engines field

### 2. Commit and Push:

```bash
git add .
git commit -m "fix: Add Vercel deployment configuration"
git push
```

### 3. Redeploy on Vercel:

Option A: **Automatic** (if connected to GitHub)
- Vercel will automatically redeploy after the push

Option B: **Manual**
- Go to your Vercel dashboard
- Click "Redeploy" on your project
- Select "Redeploy with existing Build Cache" OR "Redeploy without Cache"

### 4. Clear Vercel Cache (if still failing):

In Vercel Dashboard:
1. Go to your project
2. Settings → General
3. Scroll to "Build & Development Settings"
4. Click "Clear Build Cache"
5. Redeploy

---

## 🔧 Common Vercel Issues & Solutions

### Issue 1: Webpack Build Errors
**Solution:**
- Ensure Node.js version is specified (we added `engines` in package.json)
- Clear Vercel's build cache
- Check all imports are correct

### Issue 2: Module Not Found
**Solution:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Test build locally
npm run build
```

### Issue 3: "latest" Package Versions
**Problem:** Using "latest" can cause inconsistent builds

**Solution:** Lock versions in package.json (optional):
```json
{
  "framer-motion": "^11.0.0",  // instead of "latest"
  "@vercel/analytics": "^1.1.0", // instead of "latest"
  "three": "^0.160.0"  // instead of "latest"
}
```

---

## 📋 Pre-Deployment Checklist

Before deploying to Vercel:

- [ ] All files are committed to git
- [ ] `npm run build` works locally
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Environment variables set (if any)
- [ ] Database connection configured (if using)

---

## 🌐 Environment Variables

If you're using a database or external services, add these in Vercel:

1. Go to Vercel Dashboard
2. Your Project → Settings → Environment Variables
3. Add variables:

```env
# Database (example - Neon PostgreSQL)
DATABASE_URL=postgresql://...

# Other services (if any)
NEXT_PUBLIC_API_URL=https://...
```

---

## 🏗️ Build Settings on Vercel

**Framework Preset:** Next.js

**Build Command:**
```bash
npm run build
```

**Output Directory:**
```
.next
```

**Install Command:**
```bash
npm install
```

**Node.js Version:**
```
18.x (automatic from .node-version)
```

---

## 📊 Deployment Environments

### Development
- Automatically deployed from feature branches
- Preview URLs for testing

### Production
- Deployed from `main` or `master` branch
- Custom domain can be added

---

## 🐛 Debugging Failed Builds

### Check Build Logs:
1. Go to Vercel Dashboard
2. Click on failed deployment
3. View "Build Logs" tab
4. Look for error messages

### Common Error Patterns:

**"Cannot find module"**
```bash
# Solution: Check imports in your code
# Make sure component paths are correct
```

**"Type error"**
```bash
# Solution: Run TypeScript check locally
npx tsc --noEmit
```

**"ESLint error"**
```bash
# Solution: Fix linting issues
npm run lint
```

---

## 🔄 Continuous Deployment

Once set up, every push to your repository will:
1. Trigger a new build on Vercel
2. Run tests (if configured)
3. Deploy to preview URL (for branches)
4. Deploy to production (for main branch)

---

## 📱 Custom Domain Setup

1. Go to Vercel Dashboard
2. Your Project → Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for SSL certificate (automatic)

---

## 🚦 Post-Deployment

### Verify Deployment:
- [ ] Visit your Vercel URL
- [ ] Check all pages load correctly
- [ ] Test navigation
- [ ] Check dashboard functionality
- [ ] Test article creation
- [ ] Verify responsive design

### Monitor:
- Check Vercel Analytics
- Monitor error logs
- Watch performance metrics

---

## 💡 Tips for Smooth Deployment

1. **Test Locally First:**
   ```bash
   npm run build
   npm start
   ```

2. **Keep Dependencies Updated:**
   ```bash
   npm outdated
   npm update
   ```

3. **Use Environment-Specific Config:**
   - Development: `.env.local`
   - Production: Vercel Environment Variables

4. **Enable Vercel Analytics:**
   Already included via `@vercel/analytics` package

---

## 📞 Support

If you continue to face issues:

1. **Check Vercel Status:** https://www.vercel-status.com/
2. **Vercel Docs:** https://vercel.com/docs
3. **Vercel Community:** https://github.com/vercel/vercel/discussions
4. **Next.js Docs:** https://nextjs.org/docs

---

## 🎉 Success!

Once deployed, your application will be available at:
- **Production:** `https://your-project.vercel.app`
- **Custom Domain:** `https://your-domain.com` (if configured)

---

**Last Updated:** November 2025
**Framework:** Next.js 15
**Deployment Platform:** Vercel

