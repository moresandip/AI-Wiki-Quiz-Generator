// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Check if we're in production without backend URL configured
const isProduction = window.location.hostname !== 'localhost' && 
                     window.location.hostname !== '127.0.0.1' &&
                     !window.location.hostname.includes('localhost');
const isBackendConfigured = !!process.env.REACT_APP_API_URL && 
                            process.env.REACT_APP_API_URL !== 'http://localhost:8000' &&
                            !process.env.REACT_APP_API_URL.includes('localhost');

export const generateQuiz = async (url) => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate_quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      // Try to get the detailed error from the backend response
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData && errorData.detail ? errorData.detail : 'Failed to generate quiz';
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
      // Provide better error message for production without backend configured
      if (isProduction && !isBackendConfigured) {
        throw new Error('Backend server is not configured. Please set REACT_APP_API_URL environment variable in Netlify with your deployed backend URL. See deployment guide for instructions.');
      }
      throw new Error(`Cannot connect to backend server at ${API_BASE_URL}. Please check if the backend is running.`);
    }
    throw error;
  }
};

export const getHistory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/history`);

    if (!response.ok) {
      throw new Error('Failed to fetch history');
    }

    return response.json();
  } catch (error) {
    if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
      // Provide better error message for production without backend configured
      if (isProduction && !isBackendConfigured) {
        throw new Error('Backend server is not configured. Please set REACT_APP_API_URL environment variable in Netlify with your deployed backend URL. See deployment guide for instructions.');
      }
      throw new Error(`Cannot connect to backend server at ${API_BASE_URL}. Please check if the backend is running.`);
    }
    throw error;
  }
};

export const getQuiz = async (quizId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/quiz/${quizId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch quiz');
    }

    return response.json();
  } catch (error) {
    if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
      // Provide better error message for production without backend configured
      if (isProduction && !isBackendConfigured) {
        throw new Error('Backend server is not configured. Please set REACT_APP_API_URL environment variable in Netlify with your deployed backend URL. See deployment guide for instructions.');
      }
      throw new Error(`Cannot connect to backend server at ${API_BASE_URL}. Please check if the backend is running.`);
    }
    throw error;
  }
};
