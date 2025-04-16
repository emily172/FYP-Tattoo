import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageHistory = () => {
  const [history, setHistory] = useState([]);
  const [newEntry, setNewEntry] = useState({
    year: '',
    event: '',
    image: '',
    video: '',
    testimonial: '',
    link: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch history details from the backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/history') // Fetch all history entries
      .then((response) => {
        console.log('Fetched History:', response.data);
        setHistory(response.data);
      })
      .catch((err) => {
        console.error('Error fetching history:', err);
        setError('Failed to load history details.');
      });
  }, []);

  // Handle adding a new history entry
  const handleAddEntry = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/history', newEntry) // Create a new entry
      .then((response) => {
        console.log('Added History Entry:', response.data);
        setHistory([...history, response.data]); // Update history state
        setNewEntry({
          year: '',
          event: '',
          image: '',
          video: '',
          testimonial: '',
          link: '',
        }); // Clear the form
        setSuccess('History entry added successfully!');
        setError('');
      })
      .catch((err) => {
        console.error('Error adding history entry:', err);
        setError('Failed to add history entry.');
        setSuccess('');
      });
  };

  // Handle deleting a history entry
  const handleDeleteEntry = (id) => {
    axios
      .delete(`http://localhost:5000/api/history/${id}`) // Delete the entry
      .then(() => {
        setHistory(history.filter((entry) => entry._id !== id)); // Remove from the state
        setSuccess('History entry deleted successfully!');
        setError('');
      })
      .catch((err) => {
        console.error('Error deleting history entry:', err);
        setError('Failed to delete history entry.');
        setSuccess('');
      });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard: Manage History</h1>

      {/* Error and Success Messages */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      {/* Add New History Entry */}
      <form onSubmit={handleAddEntry} className="bg-white p-6 rounded shadow-md mb-6">
        <h2 className="text-lg font-bold mb-4">Add New History Entry</h2>
        <div className="mb-4">
          <label htmlFor="year" className="block text-lg font-bold text-gray-700">
            Year
          </label>
          <input
            type="text"
            id="year"
            name="year"
            value={newEntry.year}
            onChange={(e) => setNewEntry({ ...newEntry, year: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="event" className="block text-lg font-bold text-gray-700">
            Event
          </label>
          <textarea
            id="event"
            name="event"
            value={newEntry.event}
            onChange={(e) => setNewEntry({ ...newEntry, event: e.target.value })}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-lg font-bold text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={newEntry.image}
            onChange={(e) => setNewEntry({ ...newEntry, image: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="video" className="block text-lg font-bold text-gray-700">
            Video URL
          </label>
          <input
            type="text"
            id="video"
            name="video"
            value={newEntry.video}
            onChange={(e) => setNewEntry({ ...newEntry, video: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="testimonial" className="block text-lg font-bold text-gray-700">
            Testimonial
          </label>
          <textarea
            id="testimonial"
            name="testimonial"
            value={newEntry.testimonial}
            onChange={(e) => setNewEntry({ ...newEntry, testimonial: e.target.value })}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="link" className="block text-lg font-bold text-gray-700">
            Link
          </label>
          <input
            type="text"
            id="link"
            name="link"
            value={newEntry.link}
            onChange={(e) => setNewEntry({ ...newEntry, link: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-6 rounded shadow-md hover:bg-indigo-600"
        >
          Add Entry
        </button>
      </form>

      {/* Display Existing History Entries */}
      <div className="space-y-6">
        {history.map((entry) => (
          <div
            key={entry._id}
            className="bg-white p-4 rounded shadow-md flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-700">{entry.year}</h2>
              <p className="text-gray-600">{entry.event}</p>
              {entry.image && <img src={entry.image} alt="Milestone" className="w-32 mt-2 rounded" />}
              {entry.video && (
                <a href={entry.video} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline mt-2 block">
                  Watch Video
                </a>
              )}
              {entry.testimonial && <blockquote className="text-gray-500 italic mt-2">"{entry.testimonial}"</blockquote>}
              {entry.link && (
                <a href={entry.link} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline mt-2 block">
                  Learn More
                </a>
              )}
            </div>
            <button
              onClick={() => handleDeleteEntry(entry._id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageHistory;
