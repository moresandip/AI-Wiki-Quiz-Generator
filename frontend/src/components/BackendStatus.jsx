import React, { useState, useEffect } from 'react';

const BackendStatus = () => {
  const [status, setStatus] = useState('checking');
  const [apiUrl, setApiUrl] = useState('');
  const [envVarSet, setEnvVarSet] = useState(false);

  useEffect(() => {
    // Get the API URL being used
    const currentApiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    setApiUrl(currentApiUrl);
    
    // Check if environment variable is actually set
    const hasEnvVar = !!process.env.REACT_APP_API_URL;
    setEnvVarSet(hasEnvVar);

    // Check if backend is configured
    const isProduction = window.location.hostname !== 'localhost' && 
                         window.location.hostname !== '127.0.0.1' &&
                         !window.location.hostname.includes('localhost');
    const isConfigured = hasEnvVar && 
                        !currentApiUrl.includes('localhost') &&
                        currentApiUrl.startsWith('http');

    if (isProduction && !isConfigured) {
      setStatus('not-configured');
    } else if (!isProduction) {
      // Local development - try to connect
      fetch(`${currentApiUrl}/health`)
        .then(res => {
          if (res.ok) {
            setStatus('connected');
          } else {
            setStatus('error');
          }
        })
        .catch(() => {
          setStatus('error');
        });
    } else {
      // Production and configured - test connection
      fetch(`${currentApiUrl}/health`)
        .then(res => {
          if (res.ok) {
            setStatus('connected');
          } else {
            setStatus('error');
          }
        })
        .catch(() => {
          setStatus('error');
        });
    }
  }, []);

  if (status === 'checking' || status === 'connected') {
    return null; // Don't show anything if connected or checking
  }

  if (status === 'not-configured') {
    return (
      <div className="max-w-4xl mx-auto mb-6 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-xl shadow-lg">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-3xl">⚠️</span>
          <span className="font-bold text-2xl text-yellow-800">Backend Not Configured</span>
        </div>
        
        <div className="bg-white p-5 rounded-lg mb-4 border border-yellow-200">
          <p className="text-sm font-semibold text-gray-700 mb-2">🔍 Current API URL (from build):</p>
          <code className="text-sm bg-gray-100 px-3 py-2 rounded block break-all">{apiUrl}</code>
          <p className="text-xs text-gray-500 mt-2">
            {envVarSet 
              ? '⚠️ Environment variable is set but contains localhost. This means the build was done before setting the variable.'
              : '❌ Environment variable REACT_APP_API_URL is not set in Netlify.'}
          </p>
        </div>

        <div className="bg-blue-50 p-5 rounded-lg mb-4 border border-blue-200">
          <p className="font-bold text-blue-900 mb-3 text-lg">📋 Step-by-Step Fix:</p>
          <ol className="list-decimal list-inside space-y-3 text-sm text-blue-800">
            <li className="font-semibold">
              Deploy Backend to Railway:
              <ul className="list-disc list-inside ml-6 mt-1 font-normal space-y-1">
                <li>Go to <a href="https://railway.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">railway.app</a></li>
                <li>Deploy from GitHub repo: <code className="bg-blue-100 px-1 rounded">moresandip/AI-Wiki-Quiz-Generator</code></li>
                <li>Set Root Directory to: <code className="bg-blue-100 px-1 rounded">backend</code></li>
                <li>Add environment variable: <code className="bg-blue-100 px-1 rounded">GOOGLE_API_KEY</code></li>
                <li>Copy your backend URL (e.g., <code className="bg-blue-100 px-1 rounded">https://xxx.up.railway.app</code>)</li>
              </ul>
            </li>
            <li className="font-semibold">
              Configure Netlify:
              <ul className="list-disc list-inside ml-6 mt-1 font-normal space-y-1">
                <li>Go to <a href="https://app.netlify.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">app.netlify.com</a></li>
                <li>Select your site: <code className="bg-blue-100 px-1 rounded">ai-wiki-quiz-generatorr</code></li>
                <li>Click <strong>Site settings</strong> → <strong>Environment variables</strong></li>
                <li>Click <strong>Add variable</strong></li>
                <li>Key: <code className="bg-blue-100 px-1 rounded">REACT_APP_API_URL</code></li>
                <li>Value: Paste your Railway backend URL</li>
                <li>Click <strong>Save</strong></li>
              </ul>
            </li>
            <li className="font-semibold">
              <strong className="text-red-600">IMPORTANT: Redeploy Netlify Site</strong>
              <ul className="list-disc list-inside ml-6 mt-1 font-normal space-y-1">
                <li>Go to <strong>Deploys</strong> tab</li>
                <li>Click <strong>Trigger deploy</strong> → <strong>Clear cache and deploy site</strong></li>
                <li>Wait 2-3 minutes for deployment to complete</li>
                <li>Environment variables are only available during build time!</li>
              </ul>
            </li>
            <li className="font-semibold">
              Clear Browser Cache:
              <ul className="list-disc list-inside ml-6 mt-1 font-normal space-y-1">
                <li>Hard refresh: <code className="bg-blue-100 px-1 rounded">Ctrl+Shift+R</code> (Windows) or <code className="bg-blue-100 px-1 rounded">Cmd+Shift+R</code> (Mac)</li>
                <li>Or clear browser cache completely</li>
              </ul>
            </li>
          </ol>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="font-semibold text-green-800 mb-2">✅ After completing these steps:</p>
          <p className="text-sm text-green-700">
            The warning will disappear and your site will work on both mobile and laptop. 
            See <code className="bg-green-100 px-1 rounded">BACKEND_SETUP_STEPS.md</code> for detailed instructions.
          </p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="max-w-2xl mx-auto mb-6 p-6 bg-red-50 border-2 border-red-400 rounded-xl shadow-lg">
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-2xl">❌</span>
          <span className="font-semibold text-xl text-red-800">Cannot Connect to Backend</span>
        </div>
        <p className="text-red-700 mb-4">
          The backend server at <code className="bg-red-100 px-2 py-1 rounded text-xs">{apiUrl}</code> is not responding.
        </p>
        <div className="space-y-2 text-sm text-red-800">
          <p className="font-semibold">Possible Issues:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Backend server is not running</li>
            <li>Backend URL is incorrect</li>
            <li>Backend is not accessible from this domain</li>
            <li>Check backend logs for errors</li>
          </ul>
        </div>
      </div>
    );
  }

  return null;
};

export default BackendStatus;

