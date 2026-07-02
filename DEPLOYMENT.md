# 🚀 Deployment Instructions

## Quick Deploy to GitHub Pages

### Step 1: Prepare Your Repository

```bash
# Navigate to your project folder
cd /path/to/farewell-website

# Initialize git (if not already done)
git init

# Add all files
git add index.html styles.css script.js manifest.json README.md assets/ .farewell-gitignore

# Optional: Rename the gitignore file
# mv .farewell-gitignore .gitignore
# git add .gitignore

# Commit your changes
git commit -m "Add premium farewell website"
```

### Step 2: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create a new repository:
   - **Name:** `farewell-letter` (or your preferred name)
   - **Visibility:** Public (required for free GitHub Pages) or Private (requires GitHub Pro)
   - **Do NOT** initialize with README (we already have one)

### Step 3: Push to GitHub

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Rename branch to main if needed
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top navigation bar)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**:
   - Branch: Select `main`
   - Folder: Select `/ (root)`
5. Click **Save**

### Step 5: Wait for Deployment

- GitHub will build your site (takes 1-3 minutes)
- You'll see a message: "Your site is ready to be published"
- Then: "Your site is live at `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`"

### Step 6: Share Your Link

Your site will be available at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

Share this link with your friend! 💌

---

## Alternative Deployment Options

### Option 1: Netlify (Free)

1. Go to [netlify.com](https://www.netlify.com)
2. Sign up / Log in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: `.` (root)
6. Click "Deploy"
7. Your site is live! Netlify provides a custom URL

**Advantages:**
- Instant deployments
- Custom domain support (free)
- Automatic HTTPS
- Deploy previews for branches

### Option 2: Vercel (Free)

1. Go to [vercel.com](https://vercel.com)
2. Sign up / Log in with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Settings:
   - Framework Preset: "Other"
   - Build command: (leave empty)
   - Output directory: `.`
6. Click "Deploy"

**Advantages:**
- Extremely fast CDN
- Automatic HTTPS
- Custom domains
- Instant global deployment

### Option 3: Cloudflare Pages (Free)

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Sign up / Log in
3. Click "Create a project"
4. Connect your GitHub repository
5. Build settings:
   - Build command: (leave empty)
   - Build output directory: `/`
6. Click "Save and Deploy"

**Advantages:**
- Unlimited bandwidth
- Very fast global CDN
- Free custom domains
- DDoS protection

### Option 4: Local Network (Testing Only)

For testing on your local network:

```bash
# Python 3
cd /path/to/farewell-website
python3 -m http.server 8000

# Then visit: http://localhost:8000
```

To access from other devices on your network:
1. Find your local IP: `ifconfig` (Mac/Linux) or `ipconfig` (Windows)
2. Visit: `http://YOUR-LOCAL-IP:8000` on other devices

**Note:** This only works on your local network, not for sharing publicly.

---

## Custom Domain Setup

### GitHub Pages with Custom Domain

1. Buy a domain (e.g., from [Namecheap](https://namecheap.com), [Google Domains](https://domains.google))
2. In your repository settings → Pages:
   - Enter your custom domain (e.g., `farewell.yourdomain.com`)
3. In your domain provider's DNS settings:
   - Add CNAME record:
     - Name: `farewell` (or `www`)
     - Value: `YOUR-USERNAME.github.io`
4. Wait for DNS propagation (can take up to 48 hours)
5. Enable "Enforce HTTPS" in GitHub Pages settings

### Netlify with Custom Domain

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow the instructions to update your DNS records
4. Netlify automatically provisions SSL certificates

---

## Updating Your Website

After making changes to your website:

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "Update memory photos and stories"

# Push to GitHub
git push origin main
```

GitHub Pages will automatically rebuild and deploy your changes in 1-2 minutes.

---

## Troubleshooting

### Site Not Loading?

**Check 1:** Ensure GitHub Pages is enabled
- Go to Settings → Pages
- Verify Source is set to `main` branch and `/ (root)` folder

**Check 2:** Wait for build to complete
- It can take 1-3 minutes for changes to appear
- Check the Actions tab for build status

**Check 3:** Clear browser cache
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Try incognito/private browsing mode

**Check 4:** Verify file paths
- All file paths are case-sensitive
- Check `index.html` links match actual file names

### Images Not Showing?

**Fix 1:** Check file extensions
- Ensure images are actually `.jpg` or `.png`
- File names must match exactly: `01.jpg`, `02.jpg`, etc.

**Fix 2:** Verify image paths in HTML
```html
<img src="assets/memories/01.jpg" alt="...">
```

**Fix 3:** Ensure images are pushed to GitHub
```bash
git add assets/memories/*.jpg
git commit -m "Add memory photos"
git push origin main
```

### PWA Not Installing?

**Requirement 1:** Must use HTTPS
- GitHub Pages provides HTTPS automatically
- Local testing with `http://` won't allow PWA features

**Requirement 2:** Must have valid manifest
- Check browser console (F12) for manifest errors

**Requirement 3:** Must visit page at least once
- Service workers require initial page load

### Fonts Not Loading?

**Fix 1:** Check internet connection
- Google Fonts loads from CDN
- Requires internet for first load

**Fix 2:** Verify font link in HTML
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

---

## Performance Tips

### Optimize Images Before Upload

1. **Resize to appropriate dimensions:**
   - Memory images: 1200x800px (landscape) or 800x1200px (portrait)
   - Icons: Already optimized

2. **Compress images:**
   - Use [TinyPNG](https://tinypng.com) - reduces file size by 70%
   - Use [Squoosh](https://squoosh.app) - more control over compression
   - Target: Under 500KB per image

3. **Convert to modern formats (optional):**
   - WebP provides 25-35% better compression
   - Keep JPG as fallback for older browsers

### Lighthouse Score Optimization

Run Lighthouse audit in Chrome DevTools:
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Mobile" device
4. Click "Analyze page load"

Target scores:
- **Performance:** 95+ ✅
- **Accessibility:** 95+ ✅
- **Best Practices:** 95+ ✅
- **SEO:** 90+ ✅

---

## Security & Privacy

### Best Practices

1. **No personal data in code:**
   - Don't include email addresses, phone numbers, or addresses in HTML
   - Keep sensitive information out of GitHub repository

2. **Private repositories (if needed):**
   - Make repository private (requires GitHub Pro for Pages)
   - Or use Netlify/Vercel which support private repos for free

3. **Remove metadata from photos:**
   - Photos contain EXIF data (location, camera info, date)
   - Use [ExifTool](https://exiftool.org) or [ImageOptim](https://imageoptim.com) to strip metadata

4. **Short-lived links (optional):**
   - Use [bit.ly](https://bitly.com) to create short links
   - Can disable/expire links later if needed

---

## Checklist Before Sharing

- [ ] All placeholder images replaced with real photos
- [ ] All memory stories personalized
- [ ] Hero title and subtitle customized
- [ ] Final letter message written
- [ ] Spelling and grammar checked
- [ ] Tested on mobile phone (Safari and Chrome)
- [ ] Tested on desktop browser
- [ ] Images load correctly
- [ ] Smooth scrolling works
- [ ] Buttons are clickable
- [ ] Site deployed and accessible via link
- [ ] Tested link in incognito mode
- [ ] Link copied and ready to share

---

## Post-Deployment

### Analytics (Optional)

If you want to know when they opened the link:

1. **Google Analytics (Free)**
   - Create account at [analytics.google.com](https://analytics.google.com)
   - Get tracking code
   - Add to `index.html` before `</head>`

2. **Simple Analytics (Privacy-focused)**
   - Alternative to Google Analytics
   - No cookies, GDPR compliant
   - [simpleanalytics.com](https://simpleanalytics.com)

**Note:** Consider if tracking aligns with the personal nature of your letter.

### Custom Short URL

Create a memorable short link:

1. [bit.ly](https://bitly.com) - Most popular, free
2. [tinyurl.com](https://tinyurl.com) - Simple, no account needed
3. [rebrandly.com](https://rebrandly.com) - Custom domain short links

Example:
- Original: `https://username.github.io/farewell-letter/`
- Short: `https://bit.ly/farewell-mike`

---

## Support & Resources

### Helpful Links

- 📚 [GitHub Pages Docs](https://docs.github.com/en/pages)
- 🎨 [Google Fonts](https://fonts.google.com)
- 🖼️ [Image Compression](https://tinypng.com)
- 📱 [PWA Documentation](https://web.dev/progressive-web-apps/)
- 🔍 [Lighthouse Testing](https://developers.google.com/web/tools/lighthouse)

### Need Help?

1. Check the main [README.md](README.md) for common issues
2. Search existing GitHub Issues
3. Check browser console (F12 → Console tab) for errors
4. Test in different browser (Chrome recommended)

---

**Ready to deploy?** Follow the steps above and your beautiful farewell website will be live in minutes! 🚀💌
