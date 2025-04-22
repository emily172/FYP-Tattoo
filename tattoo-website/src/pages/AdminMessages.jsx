import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    axios
      .get('http://localhost:5000/api/contact')
      .then((response) => {
        setMessages(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch messages.');
        setLoading(false);
      });
  };

  const handleAutocomplete = (query) => {
    setSearchQuery(query);

    if (query.length > 2) {
      axios
        .get(`http://localhost:5000/api/contact/autocomplete?query=${query}`)
        .then((response) => {
          setAutocompleteResults(response.data);
        })
        .catch(() => {
          setAutocompleteResults([]);
        });
    } else {
      setAutocompleteResults([]); // Clear suggestions if query is too short
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name); // Set search query to the clicked suggestion
    setAutocompleteResults([]); // Clear autocomplete dropdown

    // Trigger search to load results immediately
    axios
      .get(`http://localhost:5000/api/contact/search?query=${suggestion.name}`)
      .then((response) => {
        setMessages(response.data); // Update messages with search results
      })
      .catch(() => {
        setError('Failed to search messages.');
      });
  };

  const handleSearch = () => {
    axios
      .get(`http://localhost:5000/api/contact/search?query=${searchQuery}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch(() => {
        setError('Failed to search messages.');
      });
  };

  if (loading) {
    return <p className="text-center">Loading messages...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard - Contact Messages</h1>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => handleAutocomplete(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300"
        />

        {/* Autocomplete Dropdown */}
        {autocompleteResults.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-10">
            {autocompleteResults.map((result, index) => (
              <div
                key={index}
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(result)}
              >
                <p className="text-gray-800 font-bold">{result.name}</p>
                <p className="text-gray-600 text-sm">{result.email}</p>
                <p className="text-gray-500 text-xs">{result.messageSnippet}</p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleSearch}
          className="w-full mt-4 p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {messages.length === 0 ? (
        <p className="text-center text-gray-600">No messages found.</p>
      ) : (
        <table className="mt-8 w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Message</th>
              <th className="border border-gray-300 p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id}>
                <td className="border border-gray-300 p-2">{msg.name}</td>
                <td className="border border-gray-300 p-2">{msg.email}</td>
                <td className="border border-gray-300 p-2">{msg.message}</td>
                <td className="border border-gray-300 p-2">{new Date(msg.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminMessages;
