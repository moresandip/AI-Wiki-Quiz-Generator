import React, { useState } from 'react';

const BackendConfigChecker = () => {
  const [showDebug, setShowDebug] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  const hasEnvVar = !!process.env.REACT_APP_API_URL;
  const isProduction = window.location.hostname !== 'localhost' && 
                       window.location.hostname !== '127.0.0.1';

  if (!isProduction) return null; // Only show in production

  return (
    <div className="max-w-4xl mx-auto mb-6 p-6 bg-gray-50 border-2 border-gray-300 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">🔧 Configuration Debug Info</h3>
        <button
          onClick={() => setShowDebug(!showDebug)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-colors"
        >
          {showDebug ? 'Hide' : 'Show'} Debug Info
        </button>
      </div>

      {showDebug && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="font-semibold text-sm text-gray-700 mb-2">Environment Variable Status:</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className={hasEnvVar ? 'text-green-600' : 'text-red-600'}>
                  {hasEnvVar ? '✅' : '❌'}
                </span>
                <span>
                  <code className="bg-gray-100 px-2 py-1 rounded">REACT_APP_API_URL</code> is 
                  {hasEnvVar ? ' SET' : ' NOT SET'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Current Value:</span>
                <code className="bg-gray-100 px-2 py-1 rounded break-all">{apiUrl}</code>
              </div>
              <div className="flex items-center space-x-2">
                <span>Is Production:</span>
                <code className="bg-gray-100 px-2 py-1 rounded">{isProduction ? 'Yes' : 'No'}</code>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="font-semibold text-sm text-yellow-800 mb-2">⚠️ Troubleshooting Steps:</p>
            <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-700">
              <li>
                <strong>Verify in Netlify:</strong>
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>Go to Netlify → Site settings → Environment variables</li>
                  <li>Check if <code className="bg-yellow-100 px-1 rounded">REACT_APP_API_URL</code> exists</li>
                  <li>Verify the value is your backend URL (not localhost)</li>
                  <li>Make sure there are no extra spaces</li>
                </ul>
              </li>
              <li>
                <strong>Check Build Logs:</strong>
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>Go to Netlify → Deploys → Click on latest deploy</li>
                  <li>Check "Build log" tab</li>
                  <li>Look for environment variables being loaded</li>
                  <li>Verify the build completed successfully</li>
                </ul>
              </li>
              <li>
                <strong>Redeploy Required:</strong>
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>If you just added the variable, you MUST redeploy</li>
                  <li>Go to Deploys → Trigger deploy → Clear cache and deploy</li>
                  <li>Wait for build to complete (2-3 minutes)</li>
                </ul>
              </li>
              <li>
                <strong>Verify Variable Name:</strong>
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>Must be exactly: <code className="bg-yellow-100 px-1 rounded">REACT_APP_API_URL</code></li>
                  <li>Case-sensitive: All uppercase</li>
                  <li>Must start with <code className="bg-yellow-100 px-1 rounded">REACT_APP_</code></li>
                </ul>
              </li>
            </ol>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="font-semibold text-sm text-blue-800 mb-2">💡 Quick Verification:</p>
            <div className="text-sm text-blue-700 space-y-1">
              <p>1. Open browser console (F12) and run:</p>
              <code className="block bg-blue-100 px-3 py-2 rounded mt-1 font-mono text-xs">
                console.log('API URL:', process.env.REACT_APP_API_URL)
              </code>
              <p className="mt-2">2. If it shows <code className="bg-blue-100 px-1 rounded">undefined</code>, the variable is not set in the build.</p>
              <p>3. If it shows your backend URL, the variable is set correctly.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackendConfigChecker;

