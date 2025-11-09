# Netlify Deployment Fix - Backend Connection Issue

## Current Status
- ✅ Frontend deployed to Netlify: https://ai-wiki-quiz-generatorr.netlify.app
- ❌ Backend not deployed or REACT_APP_API_URL not configured
- ❌ Environment variable REACT_APP_API_URL is NOT SET in Netlify

## Required Steps to Fix

### 1. Deploy Backend to Railway (Recommended)
- [ ] Go to https://railway.app/
- [ ] Sign up/login with GitHub
- [ ] Click "New Project" → "Deploy from GitHub repo"
- [ ] Select repository: `moresandip/AI-Wiki-Quiz-Generator`
- [ ] Set root directory to: `backend`
- [ ] Add environment variable: `GOOGLE_API_KEY` = your Google Gemini API key
- [ ] Wait for deployment to complete
- [ ] Copy the backend URL (e.g., `https://your-app.railway.app`)

### 2. Configure Netlify Environment Variable
- [ ] Go to https://app.netlify.com/
- [ ] Select your site: `ai-wiki-quiz-generatorr`
- [ ] Go to Site settings → Environment variables
- [ ] Click "Add variable"
- [ ] Key: `REACT_APP_API_URL`
- [ ] Value: Paste your Railway backend URL (from Step 1)
- [ ] Click "Save"

### 3. Redeploy Netlify Site
- [ ] Go to "Deploys" tab in Netlify
- [ ] Click "Trigger deploy" → "Clear cache and deploy site"
- [ ] Wait 2-3 minutes for deployment to complete
- [ ] Hard refresh browser (Ctrl+Shift+R) to clear cache

### 4. Verify Fix
- [ ] Visit https://ai-wiki-quiz-generatorr.netlify.app
- [ ] Check that backend connection error is gone
- [ ] Test quiz generation functionality

## Alternative Backend Deployment Options

### Option A: Render
- [ ] Go to https://render.com/
- [ ] New → Web Service
- [ ] Connect GitHub repo
- [ ] Root Directory: `backend`
- [ ] Build Command: `pip install -r requirements.txt`
- [ ] Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- [ ] Add env var: `GOOGLE_API_KEY`
- [ ] Deploy and copy URL

### Option B: Heroku
- [ ] Install Heroku CLI
- [ ] `heroku create ai-wiki-quiz-backend`
- [ ] `heroku config:set PROJECT_PATH=backend`
- [ ] `heroku config:set GOOGLE_API_KEY=your_key`
- [ ] Deploy: `git subtree push --prefix backend heroku main`

## Notes
- Environment variables in React are only available during build time
- You MUST redeploy Netlify after setting REACT_APP_API_URL
- Backend URL should NOT contain localhost
- Test backend health endpoint: `https://your-backend-url/health`
