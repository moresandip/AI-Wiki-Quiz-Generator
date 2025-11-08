import React, { useState, useEffect } from 'react';
import { getHistory, getQuiz } from '../services/api';
import HistoryTable from '../components/HistoryTable';
import Modal from '../components/Modal';
import QuizDisplay from '../components/QuizDisplay';

const HistoryTab = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (err) {
      setError('Failed to load history.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (quizId) => {
    try {
      const quizData = await getQuiz(quizId);
      setSelectedQuiz(quizData);
      setModalOpen(true);
    } catch (err) {
      setError('Failed to load quiz details.');
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedQuiz(null);
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Loading history...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Quiz History</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {history.length === 0 ? (
        <p className="text-gray-600">No quizzes generated yet.</p>
      ) : (
        <HistoryTable history={history} onViewDetails={handleViewDetails} />
      )}

      <Modal isOpen={modalOpen} onClose={closeModal}>
        {selectedQuiz && <QuizDisplay quizData={selectedQuiz} />}
      </Modal>
    </div>
  );
};

export default HistoryTab;
