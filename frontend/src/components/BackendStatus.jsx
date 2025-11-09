import React, { useState, useEffect } from 'react';

const BackendStatus = () => {
  const [status, setStatus] = useState('checking');
  const [apiUrl, setApiUrl] = useState('');

  useEffect(() => {
    // Get the API URL being used
    const currentApiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    setApiUrl(currentApiUrl);

    // Check if backend is configured
    const isProduction = window.location.hostname !== 'localhost' && 
                         window.location.hostname !== '127.0.0.1';
    const isConfigured = !!process.env.REACT_APP_API_URL && 
                        !process.env.REACT_APP_API_URL.includes('localhost');

    if (isProduction && !isConfigured) {
      setStatus('not-configured');
    } else {
      // Try to ping the backend
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
      <div className="max-w-2xl mx-auto mb-6 p-6 bg-yellow-50 border-2 border-yellow-400 rounded-xl shadow-lg">
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-2xl">⚠️</span>
          <span className="font-semibold text-xl text-yellow-800">Backend Not Configured</span>
        </div>
        <p className="text-yellow-700 mb-4">
          The backend server URL is not set. Please configure it in Netlify environment variables.
        </p>
        <div className="bg-white p-4 rounded-lg mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Current API URL:</p>
          <code className="text-xs bg-gray-100 px-2 py-1 rounded">{apiUrl}</code>
        </div>
        <div className="space-y-2 text-sm text-yellow-800">
          <p className="font-semibold">Quick Fix:</p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>Deploy backend to Railway/Render/Heroku</li>
            <li>Go to Netlify → Site settings → Environment variables</li>
            <li>Add: <code className="bg-yellow-100 px-1 rounded">REACT_APP_API_URL</code> = your backend URL</li>
            <li>Redeploy Netlify site</li>
          </ol>
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

