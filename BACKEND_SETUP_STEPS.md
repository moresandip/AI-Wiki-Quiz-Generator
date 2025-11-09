# Step-by-Step: Fix Backend Configuration Error

## Current Error
```
Backend server is not configured. Please set REACT_APP_API_URL environment variable in Netlify
```

## Complete Fix (Follow These Steps Exactly)

### Step 1: Deploy Backend to Railway (5 minutes)

1. **Go to Railway:**
   - Visit: https://railway.app/
   - Click "Start a New Project"
   - Sign up/Login with GitHub

2. **Deploy Your Backend:**
   - Click "Deploy from GitHub repo"
   - Select: `moresandip/AI-Wiki-Quiz-Generator`
   - Railway will auto-detect Python

3. **Configure Settings:**
   - Click on the service that was created
   - Go to **Settings** tab
   - Scroll to **Root Directory**
   - Set to: `backend`
   - Click **Save**

4. **Add Environment Variable:**
   - Go to **Variables** tab
   - Click **+ New Variable**
   - Key: `GOOGLE_API_KEY`
   - Value: Your Google Gemini API key (get from https://makersuite.google.com/app/apikey)
   - Click **Add**

5. **Get Your Backend URL:**
   - Go to **Settings** tab
   - Scroll to **Domains**
   - Copy the URL (e.g., `https://your-app.up.railway.app`)
   - **IMPORTANT:** Copy this URL - you'll need it in Step 2

### Step 2: Configure Netlify (2 minutes)

1. **Go to Netlify:**
   - Visit: https://app.netlify.com/
   - Login to your account

2. **Select Your Site:**
   - Click on: `ai-wiki-quiz-generatorr`

3. **Add Environment Variable:**
   - Click **Site settings** (gear icon)
   - Click **Environment variables** (in left sidebar)
   - Click **Add variable** button
   - **Key:** `REACT_APP_API_URL`
   - **Value:** Paste your Railway backend URL from Step 1
   - Click **Save**

4. **Redeploy Site:**
   - Go to **Deploys** tab
   - Click **Trigger deploy** dropdown
   - Click **Clear cache and deploy site**
   - Wait 2-3 minutes for deployment

### Step 3: Test (1 minute)

1. **Open Your Site:**
   - Go to: `https://ai-wiki-quiz-generatorr.netlify.app`
   - Or refresh if already open

2. **Verify:**
   - You should see the full UI (pink/purple gradient)
   - No error messages
   - Can enter Wikipedia URL and generate quiz

## Alternative: Deploy to Render

If Railway doesn't work, use Render:

1. **Go to Render:**
   - Visit: https://render.com/
   - Sign up/Login with GitHub

2. **Create Web Service:**
   - Click **New** → **Web Service**
   - Connect your GitHub repo: `moresandip/AI-Wiki-Quiz-Generator`

3. **Configure:**
   - **Name:** `ai-wiki-quiz-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`

4. **Add Environment Variable:**
   - Scroll to **Environment Variables**
   - Click **Add Environment Variable**
   - Key: `GOOGLE_API_KEY`
   - Value: Your API key

5. **Deploy:**
   - Click **Create Web Service**
   - Wait for deployment
   - Copy the URL (e.g., `https://ai-wiki-quiz-backend.onrender.com`)

6. **Use this URL in Netlify** (follow Step 2 above)

## Troubleshooting

### Error Still Shows After Redeploy?
- ✅ Make sure you redeployed AFTER setting the environment variable
- ✅ Check that `REACT_APP_API_URL` value doesn't have spaces
- ✅ Verify backend URL is accessible (try opening it in browser)
- ✅ Clear browser cache completely

### Backend Not Working?
- ✅ Check Railway/Render logs for errors
- ✅ Verify `GOOGLE_API_KEY` is set correctly
- ✅ Test backend health: `curl https://your-backend-url.com/health`
- ✅ Should return: `{"status":"healthy"}`

### Still Having Issues?
1. Check `UI_NOT_SHOWING_FIX.md` for UI issues
2. Check `backend/DEPLOYMENT.md` for detailed backend setup
3. Verify all steps were completed in order

## Quick Checklist

- [ ] Backend deployed to Railway/Render
- [ ] Backend URL copied
- [ ] `REACT_APP_API_URL` set in Netlify
- [ ] Netlify site redeployed
- [ ] Browser cache cleared
- [ ] Site tested and working

## Expected Result

✅ Full UI visible with gradient background
✅ No error messages
✅ Can generate quizzes from Wikipedia URLs
✅ Works on both mobile and laptop

