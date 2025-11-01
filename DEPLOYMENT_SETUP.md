# Automatic Deployment Setup Guide

This guide will help you set up automatic deployment to Netlify using GitHub Actions.

## Step 1: Create Netlify Site

You have two options:

### Option A: Using Netlify Dashboard (Recommended)
1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Select your repository: `frees11/mapa-usa-progress`
5. Configure build settings:
   - **Build command:** (leave empty - it's a static site)
   - **Publish directory:** `.` (root directory)
6. Click "Deploy site"

### Option B: Using Netlify CLI
Run in your project directory:
```bash
netlify init
```
Then follow the interactive prompts:
- Choose "Create & configure a new project"
- Select "rmajster's team"
- Site name: `mapa-usa-progress` (or choose your own)
- Build command: (leave empty)
- Publish directory: `.`

## Step 2: Get Your Netlify Credentials

### Get Site ID
After creating the site, run:
```bash
netlify status
```
Look for the line that says `Site Id: [your-site-id]`

Or find it in Netlify Dashboard:
- Go to your site settings
- Look under "Site details" → "Site information" → "Site ID"

### Get Auth Token
1. Go to https://app.netlify.com/user/applications
2. Click "New access token"
3. Name it "GitHub Actions"
4. Click "Generate token"
5. **Copy the token immediately** (you won't be able to see it again!)

## Step 3: Add Secrets to GitHub

1. Go to your repository settings: https://github.com/frees11/mapa-usa-progress/settings/secrets/actions
2. Click "New repository secret"
3. Add the first secret:
   - **Name:** `NETLIFY_AUTH_TOKEN`
   - **Value:** [paste your auth token from Step 2]
4. Click "Add secret"
5. Add the second secret:
   - **Name:** `NETLIFY_SITE_ID`
   - **Value:** [paste your site ID from Step 2]
6. Click "Add secret"

## Step 4: Test the Deployment

Once the secrets are configured, the automatic deployment is ready!

To test it:
1. Make any change to your project (e.g., update index.html)
2. Commit and push to the `main` branch:
   ```bash
   git add .
   git commit -m "Test automatic deployment"
   git push
   ```
3. Go to your repository's Actions tab: https://github.com/frees11/mapa-usa-progress/actions
4. You should see the "Deploy to Netlify" workflow running
5. Once complete, check your Netlify site to see the changes live!

## How It Works

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
- Triggers on every push to the `main` branch
- Checks out your code
- Deploys it to Netlify using your credentials
- Shows deployment status in the Actions tab

## Troubleshooting

### Workflow fails with "Unauthorized"
- Check that your `NETLIFY_AUTH_TOKEN` is correct
- Make sure the token hasn't expired

### Workflow fails with "Site not found"
- Verify your `NETLIFY_SITE_ID` is correct
- Run `netlify status` to get the correct Site ID

### Changes not deploying
- Check the Actions tab for error messages
- Ensure you're pushing to the `main` branch
- Verify the workflow file exists at `.github/workflows/deploy.yml`

## Manual Deployment (Alternative)

If you need to deploy manually at any time:
```bash
netlify deploy --prod
```

## Site URLs

After setup, your site will be available at:
- Production: `https://[your-site-name].netlify.app`
- Custom domain: (configure in Netlify Dashboard if needed)
