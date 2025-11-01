# Deployment Guide - GitHub Pages

This project is configured to automatically deploy to GitHub Pages on every push to the `main` branch.

## Quick Setup (One-Time)

### Enable GitHub Pages

1. Go to your repository: https://github.com/frees11/mapa-usa-progress
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select: **GitHub Actions**
4. Click **Save**

**That's it!** No secrets, tokens, or configuration needed.

## Your Site URL

After enabling GitHub Pages, your site will be available at:

**https://frees11.github.io/mapa-usa-progress/**

## How It Works

Every time you push to `main`:

1. **Build Script** runs (`build.sh`):
   - Generates unique version timestamp
   - Updates `config.json` version
   - Injects version into CSS/JS URLs for cache busting

2. **GitHub Actions** workflow deploys:
   - Checks out code
   - Runs build script
   - Uploads site to GitHub Pages
   - Deploys automatically

3. **Your Site** updates:
   - Live within ~1 minute
   - Cache automatically cleared
   - Users see changes within 10 seconds

## Updating the Map

To update status counts:

1. Edit `config.json`:
   ```json
   {
     "version": "1.0.0",
     "done": 15,
     "in-progress": 10,
     "ready-to-dev": 15,
     "test": 10
   }
   ```

2. Commit and push:
   ```bash
   git add config.json
   git commit -m "Update status counts"
   git push
   ```

3. Wait ~1 minute
4. Changes are live! ✨

## Benefits of GitHub Pages

✅ **Free** - Unlimited deployments, no cost
✅ **Fast** - Deploy in ~1 minute
✅ **Automatic** - Push and forget
✅ **Reliable** - GitHub's infrastructure
✅ **SSL** - HTTPS by default
✅ **No Limits** - Deploy as much as you want (no Netlify restrictions!)

## Deployment Status

Check deployment status:
- Go to: https://github.com/frees11/mapa-usa-progress/actions
- See all deployments and their status
- Click any workflow to see details

## Troubleshooting

### Site not updating?

1. Check Actions tab: https://github.com/frees11/mapa-usa-progress/actions
2. Look for any failed workflows
3. Click on the workflow to see error details

### 404 error?

1. Make sure GitHub Pages is enabled: Settings → Pages
2. Check that source is set to "GitHub Actions"
3. Wait 2-3 minutes after first enabling

### Old content showing?

The cache buster handles this automatically:
- Checks for new version every 10 seconds
- Forces reload when version changes
- Manual hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

## Custom Domain (Optional)

To use your own domain:

1. Go to Settings → Pages
2. Enter your custom domain
3. Add DNS records (GitHub shows instructions)
4. Enable "Enforce HTTPS"

## Manual Trigger

To manually trigger deployment:

1. Go to: https://github.com/frees11/mapa-usa-progress/actions
2. Click "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select `main` branch and run

## Migration from Netlify

Netlify configuration has been removed:
- ❌ `netlify.toml` deleted
- ❌ No Netlify secrets needed
- ✅ GitHub Pages enabled
- ✅ Automatic deployments configured

## Cost

**$0** - Completely free for public repositories!

No deployment limits, no build minutes limits, no bandwidth limits.
