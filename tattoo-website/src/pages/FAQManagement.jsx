import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FAQManagement() {
  const [faqs, setFaqs] = useState([]); // List of FAQs
  const [formData, setFormData] = useState({ category: '', question: '', answer: '' }); // State for form inputs
  const [error, setError] = useState(''); // Error message for form submission
  const [isEditing, setIsEditing] = useState(false); // Flag for edit mode
  const [currentId, setCurrentId] = useState(null); // ID of FAQ being edited

  // Fetch FAQs when component mounts
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/faqs')
      .then((response) => setFaqs(response.data))
      .catch((err) => console.error('Error fetching FAQs:', err));
  }, []);

  // Handle form submission (Create or Update FAQ)
  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = isEditing
      ? `http://localhost:5000/api/faqs/${currentId}`
      : 'http://localhost:5000/api/faqs';
    const method = isEditing ? 'put' : 'post';

    axios[method](apiUrl, formData)
      .then((response) => {
        if (isEditing) {
          // Update FAQ in the list
          setFaqs((prev) =>
            prev.map((faq) => (faq._id === currentId ? response.data : faq))
          );
        } else {
          // Add new FAQ to the list
          setFaqs((prev) => [...prev, response.data]);
        }
        resetForm(); // Clear form after submission
      })
      .catch((err) => setError('Failed to save FAQ.'));
  };

  // Handle FAQ deletion
  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;
    axios
      .delete(`http://localhost:5000/api/faqs/${id}`)
      .then(() => setFaqs((prev) => prev.filter((faq) => faq._id !== id)))
      .catch((err) => console.error('Error deleting FAQ:', err));
  };

  // Set FAQ data for editing
  const handleEdit = (faq) => {
    setFormData({
      category: faq.category,
      question: faq.question,
      answer: faq.answer,
    });
    setIsEditing(true);
    setCurrentId(faq._id);
  };

  // Reset form state
  const resetForm = () => {
    setFormData({ category: '', question: '', answer: '' });
    setIsEditing(false);
    setCurrentId(null);
    setError('');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage FAQs</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit FAQ' : 'Create New FAQ'}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        {/* Category Input */}
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />
        
        {/* Question Input */}
        <input
          type="text"
          placeholder="Question"
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />
        
        {/* Answer Input */}
        <textarea
          placeholder="Answer"
          value={formData.answer}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        ></textarea>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 rounded w-full hover:bg-indigo-600"
        >
          {isEditing ? 'Update FAQ' : 'Create FAQ'}
        </button>
        
        {isEditing && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 text-white py-2 rounded w-full hover:bg-gray-600 mt-2"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* FAQ List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq) => (
          <div key={faq._id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-bold">{faq.category}</h2>
            <p className="mt-2">
              <strong>Q:</strong> {faq.question}
            </p>
            <p className="mt-1">
              <strong>A:</strong> {faq.answer}
            </p>
            <div className="mt-4 flex space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleEdit(faq)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleDelete(faq._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQManagement;
