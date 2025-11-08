import React, { useState } from 'react';
import GenerateQuizTab from './tabs/GenerateQuizTab';
import HistoryTab from './tabs/HistoryTab';

function App() {
  const [activeTab, setActiveTab] = useState('generate');

  // Ensure UI always renders
  try {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 animate-gradient-x">
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse">
              🚀 AI Wiki Quiz Generator
            </h1>
          </div>
        </div>
      </header>

      <nav className="bg-white/80 backdrop-blur-sm shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('generate')}
              className={`py-4 px-4 border-b-4 font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'generate'
                  ? 'border-purple-500 text-purple-700 bg-purple-100 rounded-t-lg'
                  : 'border-transparent text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-t-lg'
              }`}
            >
              📝 Generate Quiz
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-4 border-b-4 font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'history'
                  ? 'border-pink-500 text-pink-700 bg-pink-100 rounded-t-lg'
                  : 'border-transparent text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-t-lg'
              }`}
            >
              📚 Past Quizzes
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 animate-fade-in">
          {activeTab === 'generate' && <GenerateQuizTab />}
          {activeTab === 'history' && <HistoryTab />}
        </div>
      </main>
    </div>
    );
  } catch (error) {
    console.error('App render error:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-purple-600 mb-4">🚀 AI Wiki Quiz Generator</h1>
          <p className="text-gray-700 mb-4">An error occurred. Please refresh the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
}

export default App;
