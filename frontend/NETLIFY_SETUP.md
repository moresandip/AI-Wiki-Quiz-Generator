# Netlify Deployment Setup

## Setting Environment Variables in Netlify

To make your frontend work on Netlify, you need to set the `REACT_APP_API_URL` environment variable with your backend URL.

### Steps:

1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Click **Add variable**
5. Add the following:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: Your backend deployment URL (e.g., `https://your-backend.herokuapp.com` or `https://your-backend.railway.app`)
6. Click **Save**
7. **Redeploy** your site for the changes to take effect

### Example:
If your backend is deployed at `https://ai-wiki-quiz-backend.herokuapp.com`, set:
- Key: `REACT_APP_API_URL`
- Value: `https://ai-wiki-quiz-backend.herokuapp.com`

### Important Notes:
- The environment variable must start with `REACT_APP_` to be accessible in React
- After adding/updating environment variables, you must redeploy your site
- Make sure your backend CORS settings allow requests from your Netlify domain

