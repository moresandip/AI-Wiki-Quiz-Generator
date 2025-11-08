# Backend Deployment Guide

## Quick Deploy Options

### Option 1: Railway (Recommended - Easiest)

1. Go to [Railway](https://railway.app/)
2. Sign up/login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository: `moresandip/AI-Wiki-Quiz-Generator`
5. Railway will auto-detect it's a Python project
6. Set the root directory to `backend`
7. Add environment variable:
   - Key: `GOOGLE_API_KEY`
   - Value: Your Google Gemini API key
8. Railway will automatically deploy and give you a URL like: `https://your-app.railway.app`
9. Copy this URL and use it as `REACT_APP_API_URL` in Netlify

### Option 2: Render

1. Go to [Render](https://render.com/)
2. Sign up/login with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name:** ai-wiki-quiz-backend
   - **Root Directory:** `backend`
   - **Environment:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add environment variable:
   - Key: `GOOGLE_API_KEY`
   - Value: Your Google Gemini API key
7. Click "Create Web Service"
8. Copy the URL (e.g., `https://ai-wiki-quiz-backend.onrender.com`)

### Option 3: Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create ai-wiki-quiz-backend`
4. Set buildpack: `heroku buildpacks:set heroku/python`
5. Set root directory: `heroku config:set PROJECT_PATH=backend`
6. Add environment variable:
   - `heroku config:set GOOGLE_API_KEY=your_api_key`
7. Deploy: `git subtree push --prefix backend heroku main`
8. Get URL: `heroku info` (will show web URL)

### Option 4: PythonAnywhere

1. Sign up at [PythonAnywhere](https://www.pythonanywhere.com/)
2. Upload your backend files
3. Create a web app
4. Configure WSGI file to point to your FastAPI app
5. Set environment variables in the web app settings

## After Deployment

1. **Get your backend URL** (e.g., `https://your-backend.railway.app`)
2. **Update Netlify environment variable:**
   - Go to Netlify dashboard
   - Site settings → Environment variables
   - Set `REACT_APP_API_URL` = your backend URL
3. **Redeploy Netlify site** to pick up the new environment variable

## Testing Your Backend

Once deployed, test the health endpoint:
```bash
curl https://your-backend-url.com/health
```

Should return: `{"status":"healthy"}`

## Environment Variables Needed

- `GOOGLE_API_KEY` - Your Google Gemini API key (required for AI quiz generation)
- Optional: Database URL if using external database (defaults to SQLite)

## Notes

- The backend uses SQLite by default (database file: `quiz_history.db`)
- For production, consider using PostgreSQL or MySQL
- Make sure CORS is configured to allow your Netlify domain
- The backend will work without `GOOGLE_API_KEY` but will use mock quiz generator

