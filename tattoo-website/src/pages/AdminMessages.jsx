import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]); // Track selected IDs for bulk actions
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    status: '',
  });
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [undoVisible, setUndoVisible] = useState(false); // Control Undo Snackbar visibility
  const [undoTimer, setUndoTimer] = useState(null); // Timer for the undo action

  useEffect(() => {
    fetchMessages(); // Load all messages
    fetchStats(); // Load statistics
  }, []);

  // Fetch all messages
  /*const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:5000/api/contact');
      setMessages(data);
      setFilteredMessages(data); // Initialize filtered messages with all messages
      setLoading(false);
    } catch {
      setError('Failed to fetch messages.');
      setLoading(false);
    }
  };
*/

  const fetchMessages = async (page = 1) => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:5000/api/contact', {
        params: { page, limit: 10 }, // Pass page and limit as query params
      });
      setMessages(data.contacts); // Update messages with paginated results
      setFilteredMessages(data.contacts); // Update filtered messages
      setCurrentPage(data.page); // Update current page
      setTotalPages(data.totalPages); // Update total pages
      setLoading(false);
    } catch {
      setError('Failed to fetch messages.');
      setLoading(false);
    }
  };


  // Fetch statistics for statuses
  const fetchStats = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/contact/stats');
      setStats(data);
    } catch {
      setError('Failed to fetch stats.');
    }
  };

  // Handle input changes in filters
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters to messages
  const handleFilter = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:5000/api/contact/filter', { params: filters });
      setFilteredMessages(data);
      setLoading(false);
    } catch {
      setError('Failed to filter messages.');
      setLoading(false);
    }
  };

  // Handle autocomplete search
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
      setAutocompleteResults([]); // Clear suggestions for short queries
    }
  };

  // Handle suggestion click from autocomplete
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name); // Set query to selected suggestion
    setAutocompleteResults([]); // Clear autocomplete results

    // Perform search immediately
    axios
      .get(`http://localhost:5000/api/contact/search?query=${suggestion.name}`)
      .then((response) => {
        setFilteredMessages(response.data); // Update messages with search results
      })
      .catch(() => {
        setError('Failed to search messages.');
      });
  };

  // Perform manual search
  const handleSearch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:5000/api/contact/search?query=${searchQuery}`);
      setFilteredMessages(data);
      setLoading(false);
    } catch {
      setError('Failed to search messages.');
      setLoading(false);
    }
  };

  // Update message status
  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/contact/${id}/status`, { status });
      fetchMessages(); // Refresh messages after update
    } catch {
      setError('Failed to update status.');
    }
  };

  // Handle checkbox selection for bulk actions
  const handleSelect = (id) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  // Bulk Update Handler
  const handleBulkUpdate = async (status) => {
    try {
      await axios.put('http://localhost:5000/api/contact/bulk-update', { ids: selectedIds, status });
      fetchMessages(); // Refresh messages after bulk update
      setSelectedIds([]); // Clear selected IDs
    } catch {
      setError('Failed to perform bulk update.');
    }
  };

  // Bulk Delete Handler
  const handleBulkDelete = async () => {
    // First Confirmation: "Are you sure you want to delete?"
    const firstConfirmation = window.confirm(
      "Are you sure you want to delete the selected messages?"
    );

    if (!firstConfirmation) {
      return; // Exit if the first confirmation is declined
    }

    // Second Confirmation: "There is no turning back!"
    const secondConfirmation = window.confirm(
      "This action is irreversible! Are you absolutely sure you want to proceed?"
    );

    if (!secondConfirmation) {
      return; // Exit if the second confirmation is declined
    }

    // Proceed with Soft Delete
    try {
      await axios.put('http://localhost:5000/api/contact/soft-delete', { ids: selectedIds });

      // Temporarily hide the messages after 1 second
      setTimeout(() => {
        setFilteredMessages((prevMessages) =>
          prevMessages.filter((msg) => !selectedIds.includes(msg._id))
        );
      }, 1000); // 1-second delay for hiding messages

      // Show Undo Snackbar after hiding the messages
      setUndoVisible(true);

      // Start Timer for Permanent Deletion
      const timer = setTimeout(async () => {
        try {
          await axios.delete('http://localhost:5000/api/contact/permanent-delete');
          fetchMessages(); // Refresh messages after permanent deletion
        } catch {
          setError('Failed to permanently delete messages.');
        }
      }, 10000); // 10 seconds timer for undo action

      // Store the timer ID to allow undo action
      setUndoTimer(timer);
      setSelectedIds([]); // Clear selected IDs
    } catch {
      setError('Failed to soft delete messages.');
    }
  };

  // Undo Delete Handler
  const handleUndoDelete = async () => {
    clearTimeout(undoTimer); // Cancel the permanent delete timer
    try {
      await axios.put('http://localhost:5000/api/contact/undo-delete', { ids: selectedIds });
      setUndoVisible(false); // Hide Undo Snackbar
      fetchMessages(); // Refresh messages to restore soft-deleted messages
    } catch {
      setError('Failed to undo delete.');
    }
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

      {/* Undo Snackbar */}
      {undoVisible && (
        <div className="fixed bottom-4 left-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg">
          <p>Messages deleted. <button onClick={handleUndoDelete} className="underline">Undo</button></p>
        </div>
      )}

      {/* Statistics Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Message Statistics</h2>
        {stats.map((stat, index) => (
          <p key={index} className="text-gray-700">
            {stat._id}: {stat.count}
          </p>
        ))}
      </div>

      {/* Search and Filters Section */}
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

      {/* Filters Section */}
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-lg font-bold text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="w-full p-3 rounded-lg border border-gray-300"
          />
        </div>
        <div>
          <label className="block text-lg font-bold text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="w-full p-3 rounded-lg border border-gray-300"
          />
        </div>
        <div>
          <label className="block text-lg font-bold text-gray-700">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="w-full p-3 rounded-lg border border-gray-300"
          >
            <option value="">Select Status</option>
            <option value="Unanswered">Unanswered</option>
            <option value="Handled">Handled</option>
          </select>
        </div>
        <button
          onClick={handleFilter}
          className="w-full mt-4 p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>

      {/* Bulk Actions */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => handleBulkUpdate('Handled')}
          disabled={selectedIds.length === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
        >
          Mark Selected as Handled
        </button>
        <button
          onClick={handleBulkDelete}
          disabled={selectedIds.length === 0}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300"
        >
          Delete Selected
        </button>
      </div>

      {/* Messages Table */}

      {filteredMessages.length === 0 ? (
        <p className="text-center text-gray-600">No messages found.</p>
      ) : (
        <table className="mt-8 w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      const allIds = filteredMessages.map((msg) => msg._id);
                      setSelectedIds(allIds);
                    } else {
                      setSelectedIds([]);
                    }
                  }}
                  checked={selectedIds.length === filteredMessages.length && selectedIds.length > 0}
                />
              </th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Message</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.map((msg) => (
              <tr key={msg._id}>
                <td className="border border-gray-300 p-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(msg._id)}
                    onChange={() => handleSelect(msg._id)}
                  />
                </td>
                <td className="border border-gray-300 p-2">{msg.name}</td>
                <td className="border border-gray-300 p-2">{msg.email}</td>
                <td className="border border-gray-300 p-2">{msg.message}</td>
                <td className="border border-gray-300 p-2">
                  <span
                    className={
                      msg.status === 'Unanswered'
                        ? 'text-red-600 font-bold'
                        : 'text-green-600 font-bold'
                    }
                  >
                    {msg.status}
                  </span>
                </td>
                <td className="border border-gray-300 p-2">
                  {msg.status === 'Unanswered' && (
                    <button
                      onClick={() => handleStatusUpdate(msg._id, 'Handled')}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Mark as Handled
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagniation included */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => fetchMessages(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Previous
        </button>
        <p className="text-gray-700">Page {currentPage} of {totalPages}</p>
        <button
          onClick={() => fetchMessages(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Next
        </button>
      </div>


    </div>
  );
};

export default AdminMessages;
