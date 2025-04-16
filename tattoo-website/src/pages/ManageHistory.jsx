import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageHistory = () => {
  const [history, setHistory] = useState([]);
  const [newEntry, setNewEntry] = useState({ year: '', event: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch History details from the backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/history') // Fetch history entries
      .then((response) => {
        console.log('Fetched History:', response.data); // Debugging log
        setHistory(response.data); // Set history entries
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
      .post('http://localhost:5000/api/history', newEntry) // Create new entry
      .then((response) => {
        console.log('Added History Entry:', response.data); // Debugging log
        setHistory([...history, response.data]); // Update history state
        setNewEntry({ year: '', event: '' }); // Clear form
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
      .delete(`http://localhost:5000/api/history/${id}`) // Delete entry
      .then(() => {
        setHistory(history.filter((entry) => entry._id !== id)); // Remove entry locally
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

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

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
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-6 rounded shadow-md hover:bg-indigo-600"
        >
          Add Entry
        </button>
      </form>

      <div className="space-y-6">
        {history.map((entry) => (
          <div
            key={entry._id}
            className="bg-white p-4 rounded shadow-md flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-700">{entry.year}</h2>
              <p className="text-gray-600">{entry.event}</p>
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
