import React, { useState } from 'react';
import { generateQuiz } from '../services/api';
import QuizDisplay from '../components/QuizDisplay';

const GenerateQuizTab = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setQuizData(null);

    try {
      const data = await generateQuiz(url);
      setQuizData(data);
    } catch (err) {
      // Check if the error has a detailed response from the backend
      const errorMessage = err.response && err.response.data 
        ? JSON.stringify(err.response.data, null, 2) 
        : err.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4 animate-bounce">
          🎯 Create Your Quiz
        </h2>
        <p className="text-lg text-gray-700">Enter a Wikipedia URL and let AI generate an interactive quiz for you!</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="🔗 Enter Wikipedia URL (e.g., https://en.wikipedia.org/wiki/Alan_Turing)"
            className="flex-1 px-6 py-4 border-2 border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-400 focus:border-purple-500 text-lg transition-all duration-300 hover:shadow-lg"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Generating...</span>
              </div>
            ) : (
              '🚀 Generate Quiz'
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-red-400 to-pink-400 border-2 border-red-500 text-white rounded-xl shadow-lg">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-2xl">⚠️</span>
            <span className="font-semibold text-xl">Error:</span>
          </div>
          <p className="mt-2 text-lg">{error}</p>
          {error.includes('REACT_APP_API_URL') && (
            <div className="mt-4 p-4 bg-white/20 rounded-lg">
              <p className="font-semibold mb-2">Quick Fix:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Deploy your backend to Railway/Render/Heroku</li>
                <li>Go to Netlify → Site settings → Environment variables</li>
                <li>Add: <code className="bg-black/30 px-2 py-1 rounded">REACT_APP_API_URL</code> = your backend URL</li>
                <li>Redeploy your Netlify site</li>
              </ol>
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"></div>
          <p className="mt-6 text-xl text-gray-700 font-semibold animate-pulse">🧠 AI is crafting your quiz...</p>
          <p className="mt-2 text-gray-600">This may take a few moments</p>
        </div>
      )}

      {quizData && <QuizDisplay quizData={quizData} />}
    </div>
  );
};

export default GenerateQuizTab;
