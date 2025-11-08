import React, { useState } from 'react';

const QuizDisplay = ({ quizData }) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  if (!quizData) return null;

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    quizData.quiz.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        correct++;
      }
    });
    setScore(correct);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setScore(null);
    setShowAnswers(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Title Section */}
      <div className="text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-4 animate-pulse">📚 {quizData.title}</h1>
        <p className="text-xl opacity-90">Test your knowledge!</p>
      </div>

      {/* Summary Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl shadow-lg border border-blue-200">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
          <span className="mr-2">📖</span> Summary
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">{quizData.summary}</p>
      </div>

      {/* Key Entities Section */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl shadow-lg border border-green-200">
        <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
          <span className="mr-2">🔍</span> Key Entities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-green-700 mb-3 flex items-center">
              <span className="mr-2">👥</span> People
            </h3>
            <ul className="space-y-1">
              {quizData.key_entities.people.map((person, index) => (
                <li key={index} className="text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {person}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-green-700 mb-3 flex items-center">
              <span className="mr-2">🏢</span> Organizations
            </h3>
            <ul className="space-y-1">
              {quizData.key_entities.organizations.map((org, index) => (
                <li key={index} className="text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {org}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-green-700 mb-3 flex items-center">
              <span className="mr-2">📍</span> Locations
            </h3>
            <ul className="space-y-1">
              {quizData.key_entities.locations.map((location, index) => (
                <li key={index} className="text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {location}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-100 p-6 rounded-xl shadow-lg border border-yellow-200">
        <h2 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center">
          <span className="mr-2">📑</span> Sections
        </h2>
        <div className="flex flex-wrap gap-3">
          {quizData.sections.map((section, index) => (
            <span key={index} className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded-full font-medium shadow-md">
              {section}
            </span>
          ))}
        </div>
      </div>

      {/* Quiz Section */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-xl shadow-lg border border-purple-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-purple-800 flex items-center">
            <span className="mr-3">🎯</span> Quiz Time!
          </h2>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {showAnswers ? '🙈 Hide Answers' : '👀 Show Answers'}
            </button>
            {Object.keys(selectedAnswers).length === quizData.quiz.length && (
              <button
                onClick={calculateScore}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🏆 Check Score
              </button>
            )}
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🔄 Reset Quiz
            </button>
          </div>
        </div>

        {score !== null && (
          <div className="mb-6 p-6 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl text-center shadow-lg animate-bounce">
            <h3 className="text-2xl font-bold">
              🎉 Your Score: {score}/{quizData.quiz.length} ({Math.round((score / quizData.quiz.length) * 100)}%)
            </h3>
          </div>
        )}

        <div className="space-y-6">
          {quizData.quiz.map((question, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-purple-200 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-purple-800">
                {index + 1}. {question.question}
              </h3>
              <div className="space-y-3 mb-4">
                {question.options.map((option, optIndex) => {
                  const isSelected = selectedAnswers[index] === option;
                  const isCorrect = showAnswers && option === question.answer;
                  const isWrong = showAnswers && isSelected && option !== question.answer;

                  return (
                    <button
                      key={optIndex}
                      onClick={() => handleAnswerSelect(index, option)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-102 ${
                        isSelected
                          ? showAnswers
                            ? isCorrect
                              ? 'bg-green-100 border-green-500 text-green-800'
                              : 'bg-red-100 border-red-500 text-red-800'
                            : 'bg-purple-100 border-purple-500 text-purple-800'
                          : 'bg-gray-50 border-gray-300 hover:bg-purple-50 hover:border-purple-300'
                      }`}
                      disabled={showAnswers}
                    >
                      <span className="font-bold mr-3">{String.fromCharCode(65 + optIndex)})</span>
                      {option}
                      {showAnswers && isCorrect && <span className="ml-2 text-green-600">✅</span>}
                      {showAnswers && isWrong && <span className="ml-2 text-red-600">❌</span>}
                    </button>
                  );
                })}
              </div>
              {showAnswers && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-blue-800 font-semibold mb-2">💡 Explanation:</div>
                  <p className="text-blue-700">{question.explanation}</p>
                  <div className="mt-2 text-sm text-blue-600">
                    Difficulty: <span className="font-medium">{question.difficulty}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Related Topics */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-100 p-6 rounded-xl shadow-lg border border-indigo-200">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center">
          <span className="mr-2">🔗</span> Related Topics
        </h2>
        <div className="flex flex-wrap gap-3">
          {quizData.related_topics.map((topic, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizDisplay;
