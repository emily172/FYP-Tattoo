import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FAQManagement = () => {
  const [faqs, setFaqs] = useState([]);
  const [formData, setFormData] = useState({
    category: '',
    question: '',
    answer: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch FAQs from the backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/faqs')
      .then((response) => setFaqs(response.data))
      .catch(() => setError('Failed to load FAQs.'));
  }, []);

  // Handle adding or updating FAQs
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update FAQ
      axios
        .put(`http://localhost:5000/api/faqs/${currentId}`, formData)
        .then((response) => {
          setFaqs((prev) =>
            prev.map((faq) => (faq._id === currentId ? response.data : faq))
          );
          setSuccess('FAQ updated successfully!');
          setError('');
          resetForm();
        })
        .catch(() => {
          setError('Failed to update FAQ.');
          setSuccess('');
        });
    } else {
      // Add new FAQ
      axios
        .post('http://localhost:5000/api/faqs', formData)
        .then((response) => {
          setFaqs([...faqs, response.data]);
          setSuccess('FAQ added successfully!');
          setError('');
          resetForm();
        })
        .catch(() => {
          setError('Failed to add FAQ.');
          setSuccess('');
        });
    }
  };

  // Handle editing an FAQ
  const handleEdit = (faq) => {
    setFormData({
      category: faq.category,
      question: faq.question,
      answer: faq.answer,
    });
    setIsEditing(true);
    setCurrentId(faq._id);
  };

  // Handle deleting an FAQ
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/faqs/${id}`)
      .then(() => {
        setFaqs(faqs.filter((faq) => faq._id !== id));
        setSuccess('FAQ deleted successfully!');
        setError('');
      })
      .catch(() => {
        setError('Failed to delete FAQ.');
        setSuccess('');
      });
  };

  // Reset form state
  const resetForm = () => {
    setFormData({ category: '', question: '', answer: '' });
    setIsEditing(false);
    setCurrentId(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 p-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-purple-800 drop-shadow-lg">
          FAQ Management Portal
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          Create, update, and organize frequently asked questions.
        </p>
      </header>

      {/* Error and Success Messages */}
      {error && (
        <div className="text-red-600 bg-red-100 border border-red-400 px-4 py-3 rounded shadow-md mb-6">
          {error}
        </div>
      )}
      {success && (
        <div className="text-green-600 bg-green-100 border border-green-400 px-4 py-3 rounded shadow-md mb-6">
          {success}
        </div>
      )}

      {/* Add/Edit FAQ Form */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {isEditing ? 'Edit FAQ' : 'Add New FAQ'}
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="text"
              placeholder="Question"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            <textarea
              placeholder="Answer"
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            ></textarea>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-gradient-to-br from-purple-500 to-purple-700 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform"
              >
                {isEditing ? 'Update FAQ' : 'Add FAQ'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Existing FAQs */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Existing FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq._id}
                className="bg-gray-100 rounded-lg p-4 shadow-md hover:shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-800">{faq.category}</h3>
                <p className="text-gray-600">{faq.question}</p>
                <p className="text-gray-500 mt-2">{faq.answer}</p>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleEdit(faq)}
                    className="text-blue-500 hover:text-blue-700 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(faq._id)}
                    className="text-red-500 hover:text-red-700 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQManagement;
