# Netlify Deployment Guide

## Quick Setup Steps

### 1. Connect to GitHub
1. Go to [Netlify](https://www.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize Netlify
4. Select your repository: `moresandip/AI-Wiki-Quiz-Generator`

### 2. Configure Build Settings
Netlify should automatically detect the `netlify.toml` file, but verify these settings:

**Build settings:**
- **Base directory:** `frontend`
- **Build command:** `npm install && npm run build`
- **Publish directory:** `frontend/build`

Or use the `netlify.toml` file (already configured in the root):
```toml
[build]
  base = "frontend"
  command = "npm install && npm run build"
  publish = "frontend/build"
```

### 3. Set Environment Variables
**IMPORTANT:** You must set the backend API URL:

1. In Netlify dashboard, go to **Site settings** → **Environment variables**
2. Click **Add variable**
3. Add:
   - **Key:** `REACT_APP_API_URL`
   - **Value:** Your backend deployment URL (e.g., `https://your-backend.herokuapp.com`)

**Note:** If you haven't deployed your backend yet, you'll need to:
- Deploy the backend to Heroku, Railway, Render, or similar platform
- Get the backend URL
- Add it as the environment variable above

### 4. Deploy
1. Click **Deploy site**
2. Netlify will automatically build and deploy your site
3. Your site will be available at: `https://ai-wiki-quiz-generatorr.netlify.app` (or your custom domain)

### 5. Verify Deployment
After deployment:
- Check that the site shows your AI Wiki Quiz Generator interface (not the default React page)
- Test the quiz generation functionality
- Verify the API connection works

## Troubleshooting

### If you see the default React page:
1. **Clear Netlify cache:** Site settings → Build & deploy → Clear cache and retry deploy
2. **Check build logs:** Make sure the build completed successfully
3. **Verify netlify.toml:** Ensure it's in the root directory
4. **Redeploy:** Trigger a new deployment

### If API calls fail:
1. **Check environment variable:** Verify `REACT_APP_API_URL` is set correctly
2. **Backend CORS:** Ensure your backend allows requests from your Netlify domain
3. **Backend status:** Verify your backend is running and accessible

### Build Errors:
- Check that all dependencies are in `package.json`
- Ensure Node.js version is compatible (Netlify uses Node 18 by default)
- Check build logs in Netlify dashboard for specific errors

## Continuous Deployment
Once connected, Netlify will automatically deploy whenever you push to the `main` branch on GitHub.

## Custom Domain (Optional)
1. Go to **Domain settings** in Netlify
2. Click **Add custom domain**
3. Follow the instructions to configure your domain

