# Fix: npm ci Error on Railway

## Problem
Railway is trying to run `npm ci` and failing because `package-lock.json` is out of sync, or Railway is detecting the frontend as a Node.js project when it should only build the backend.

## Solution

### Option 1: Configure Railway Correctly (Recommended)

1. **In Railway Dashboard:**
   - Go to your project settings
   - Set **Root Directory** to `backend`
   - This tells Railway to only look at the backend folder

2. **Verify Build Settings:**
   - Build Command: `pip install -r requirements.txt` (or leave empty, Railway will auto-detect)
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Environment Variables:**
   - Add: `GOOGLE_API_KEY` = your API key

### Option 2: Use Railway Configuration Files

I've added two configuration files to help Railway:

- `railway.json` - Railway-specific configuration
- `.nixpacks` - Nixpacks build configuration

These files tell Railway to:
- Only build the backend directory
- Use Python, not Node.js
- Install Python dependencies, not npm packages

### Option 3: Update package-lock.json (If Frontend Build Needed)

If you need to build the frontend on Railway (not recommended - use Netlify instead):

1. **Update lock file:**
   ```bash
   cd frontend
   npm install
   ```

2. **Commit the updated lock file:**
   ```bash
   git add frontend/package-lock.json
   git commit -m "Update package-lock.json"
   git push
   ```

## Recommended Setup

**Backend on Railway:**
- Root Directory: `backend`
- Build: Auto-detect Python
- Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`

**Frontend on Netlify:**
- Already configured via `netlify.toml`
- Uses `npm install` (more forgiving than `npm ci`)

## Verification

After configuring Railway:
1. Check build logs - should show Python/pip, not npm
2. Should see: "Installing Python dependencies"
3. Should NOT see: "npm ci" or "npm install" errors

## If Error Persists

1. **Delete and recreate Railway service:**
   - Delete the current service
   - Create new service from GitHub
   - Set root directory to `backend` immediately

2. **Check Railway logs:**
   - Look for what Railway is detecting
   - Should detect Python, not Node.js

3. **Manual override:**
   - In Railway settings, manually set:
     - Build Command: `cd backend && pip install -r requirements.txt`
     - Start Command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`

