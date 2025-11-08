# Quick Fix: Mobile Error - Backend Not Configured

## The Problem
When accessing your Netlify site on mobile, you see:
```
Cannot connect to backend server at http://localhost:8000
```

This happens because mobile devices can't access `localhost` - you need a deployed backend.

## The Solution (3 Steps)

### Step 1: Deploy Backend to Railway (5 minutes)

1. Go to https://railway.app/
2. Sign up/login with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select: `moresandip/AI-Wiki-Quiz-Generator`
5. Railway auto-detects Python
6. **Important:** Click on the service → Settings → Set **Root Directory** to `backend`
7. Go to **Variables** tab → Add:
   - Key: `GOOGLE_API_KEY`
   - Value: Your Google Gemini API key
8. Railway will deploy automatically
9. Copy the URL (e.g., `https://your-app.up.railway.app`)

### Step 2: Configure Netlify (2 minutes)

1. Go to https://app.netlify.com/
2. Select your site: `ai-wiki-quiz-generatorr`
3. Go to **Site settings** → **Environment variables**
4. Click **Add variable**
5. Add:
   - **Key:** `REACT_APP_API_URL`
   - **Value:** Your Railway backend URL (from Step 1)
6. Click **Save**

### Step 3: Redeploy Netlify

1. In Netlify dashboard, go to **Deploys**
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Wait for deployment to complete

## Test It!

1. Open your Netlify site on mobile: `https://ai-wiki-quiz-generatorr.netlify.app`
2. Try generating a quiz
3. Should work perfectly! ✅

## Alternative: Render.com

If Railway doesn't work, use Render:

1. Go to https://render.com/
2. Sign up with GitHub
3. **New** → **Web Service**
4. Connect your GitHub repo
5. Configure:
   - **Name:** `ai-wiki-quiz-backend`
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add environment variable: `GOOGLE_API_KEY`
7. Deploy and copy the URL

## Need Help?

- Check `backend/DEPLOYMENT.md` for detailed instructions
- Check `FIXES_SUMMARY.md` for all fixes applied

