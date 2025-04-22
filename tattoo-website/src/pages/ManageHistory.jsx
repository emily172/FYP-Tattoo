import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageHistory = () => {
  const [history, setHistory] = useState([]);
  const [formData, setFormData] = useState({
    year: '',
    event: '',
    image: '',
    video: '',
    testimonial: '',
    link: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch history details from the backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/history')
      .then((response) => {
        setHistory(response.data);
      })
      .catch(() => {
        setError('Failed to load history details.');
      });
  }, []);

  // Handle adding or updating history entries
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing entry
      axios
        .put(`http://localhost:5000/api/history/${currentId}`, formData)
        .then((response) => {
          setHistory((prev) =>
            prev.map((entry) =>
              entry._id === currentId ? response.data : entry
            )
          );
          setSuccess('History entry updated successfully!');
          setError('');
          resetForm();
        })
        .catch(() => {
          setError('Failed to update history entry.');
          setSuccess('');
        });
    } else {
      // Add new entry
      axios
        .post('http://localhost:5000/api/history', formData)
        .then((response) => {
          setHistory([...history, response.data]);
          setSuccess('History entry added successfully!');
          setError('');
          resetForm();
        })
        .catch(() => {
          setError('Failed to add history entry.');
          setSuccess('');
        });
    }
  };

  // Handle editing a history entry
  const handleEdit = (entry) => {
    setFormData({
      year: entry.year,
      event: entry.event,
      image: entry.image,
      video: entry.video,
      testimonial: entry.testimonial,
      link: entry.link,
    });
    setIsEditing(true);
    setCurrentId(entry._id);
  };

  // Handle deleting a history entry
  const handleDeleteEntry = (id) => {
    axios
      .delete(`http://localhost:5000/api/history/${id}`)
      .then(() => {
        setHistory(history.filter((entry) => entry._id !== id));
        setSuccess('History entry deleted successfully!');
        setError('');
      })
      .catch(() => {
        setError('Failed to delete history entry.');
        setSuccess('');
      });
  };

  // Reset form state
  const resetForm = () => {
    setFormData({
      year: '',
      event: '',
      image: '',
      video: '',
      testimonial: '',
      link: '',
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 p-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-purple-800 drop-shadow-lg">
          History Management Portal
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          Create, update, and preserve the timeline of our milestones.
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

      {/* Add/Edit History Entry Form */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {isEditing ? 'Edit History Entry' : 'Add New History Entry'}
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Year"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            <textarea
              placeholder="Event Description"
              value={formData.event}
              onChange={(e) => setFormData({ ...formData, event: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            ></textarea>
            <input
              type="url"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="url"
              placeholder="Video URL"
              value={formData.video}
              onChange={(e) => setFormData({ ...formData, video: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              placeholder="Testimonial"
              value={formData.testimonial}
              onChange={(e) =>
                setFormData({ ...formData, testimonial: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            ></textarea>
            <input
              type="url"
              placeholder="Link (Optional)"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-gradient-to-br from-purple-500 to-purple-700 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform"
              >
                {isEditing ? 'Update Entry' : 'Add Entry'}
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

        {/* Existing Entries */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Existing Entries</h2>
          <div className="space-y-4">
            {history.map((entry) => (
              <div
                key={entry._id}
                className="bg-gray-100 rounded-lg p-4 shadow-md hover:shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-800">{entry.year}</h3>
                <p className="text-gray-600">{entry.event}</p>
                {entry.image && (
                  <img
                    src={entry.image}
                    alt="Milestone"
                    className="w-full h-32 mt-2 rounded-lg object-cover"
                  />
                )}
                {entry.video && (
                  <a
                    href={entry.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 hover:underline mt-2 block"
                  >
                    Watch Video
                  </a>
                )}
                {entry.testimonial && (
                  <blockquote className="text-gray-500 italic mt-2">
                    "{entry.testimonial}"
                  </blockquote>
                )}
                {entry.link && (
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 hover:underline mt-2 block"
                  >
                    Learn More
                  </a>
                )}
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleEdit(entry)}
                    className="text-blue-500 hover:text-blue-700 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEntry(entry._id)}
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

export default ManageHistory;
