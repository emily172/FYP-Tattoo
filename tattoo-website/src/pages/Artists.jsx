import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Artists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State variables for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStyle, setFilterStyle] = useState('');
  const [styles, setStyles] = useState([]); // Dynamic styles

  // Fetch artist data from the backend with search and filter options
  useEffect(() => {
    axios
      .get('http://localhost:5000/artists', {
        params: {
          search: searchTerm, // Pass search term to the backend
          style: filterStyle, // Pass selected style filter
        },
      })
      .then((response) => {
        setArtists(response.data); // Populate artists with the response data
        setLoading(false); // Stop the loading spinner
      })
      .catch((err) => {
        console.error('Error fetching artists:', err); // Log the error to the console
        setError('Failed to fetch artist data'); // Set error state
        setLoading(false); // Stop the loading spinner
      });
  }, [searchTerm, filterStyle]); // Dependency array ensures fetch triggers on input changes

  // Fetch distinct styles from the backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/artists/styles') // Dynamic styles endpoint
      .then((response) => {
        setStyles(response.data); // Populate styles dropdown
      })
      .catch((err) => {
        console.error('Failed to fetch styles:', err);
      });
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        Meet Our <span className="text-indigo-500">Artists</span>
      </h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search artists by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-lg p-2 border rounded shadow-md"
        />
      </div>

      {/* Filters */}
      <div className="mb-6 flex justify-center">
        <select
          value={filterStyle}
          onChange={(e) => setFilterStyle(e.target.value)}
          className="p-2 border rounded shadow-md"
        >
          <option value="">All Styles</option>
          {styles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>

      {/* Loading Spinner */}
      {loading && <div className="text-center">Loading artists...</div>}
      {/* Error Message */}
      {error && <div className="text-center text-red-500">{error}</div>}
      {/* Artists Grid */}
      {!loading && !error && artists.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <div
              key={artist._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 text-center"
            >
              {/* Updated Image */}
              <div className="relative w-full h-64 mb-4">
                <img
                  src={artist.avatar}
                  alt={artist.name}
                  className="w-full h-full object-cover rounded-md shadow-lg border border-gray-300"
                />
              </div>

              {/* Artist Name */}
              <h2 className="text-xl font-bold text-gray-800">{artist.name}</h2>

              {/* Artist Bio */}
              <p className="text-gray-600 mt-2">{artist.bio}</p>

              {/* Artist Specialty */}
              <p className="text-gray-500 mt-4">
                <strong>Specialty:</strong> {artist.style}
              </p>
            </div>
          ))}
        </div>
      )}
      {/* Empty State */}
      {!loading && !error && artists.length === 0 && (
        <div className="text-center text-gray-500">No artists found</div>
      )}
    </div>
  );
}

export default Artists;
