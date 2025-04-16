import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TattooCard from '../components/TattooCard'; // Importing the reusable component for rendering tattoo cards

function Gallery() {
  // State variables to store tattoo data, loading status, and potential errors
  const [tattoos, setTattoos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State variables for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStyle, setFilterStyle] = useState('');
  const [filterPopularity, setFilterPopularity] = useState('');

  // Fetch tattoo data from the backend with search and filter options
  useEffect(() => {
    axios
      .get('http://localhost:5000/tattoos', {
        params: {
          search: searchTerm, // Pass search term to the backend
          style: filterStyle, // Pass selected style filter
          popularity: filterPopularity, // Pass popularity filter
        },
      })
      .then((response) => {
        setTattoos(response.data); // Populate tattoos with the response data
        setLoading(false); // Stop the loading spinner
      })
      .catch((err) => {
        console.error('Error fetching tattoos:', err); // Log the error to the console
        setError('Failed to fetch tattoo data'); // Set error state
        setLoading(false); // Stop the loading spinner
      });
  }, [searchTerm, filterStyle, filterPopularity]); // Dependency array ensures fetch triggers on input changes

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        Tattoo <span className="text-indigo-500">Gallery</span>
      </h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search tattoos by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-lg p-2 border rounded shadow-md"
        />
      </div>

      {/* Filters */}
      <div className="mb-6 flex justify-center space-x-4">
        <select
          value={filterStyle}
          onChange={(e) => setFilterStyle(e.target.value)}
          className="p-2 border rounded shadow-md"
        >
          <option value="">All Styles</option>
          <option value="Traditional">Traditional</option>
          <option value="Black & Gray">Black & Gray</option>
          <option value="Watercolor">Watercolor</option>
        </select>
        <select
          value={filterPopularity}
          onChange={(e) => setFilterPopularity(e.target.value)}
          className="p-2 border rounded shadow-md"
        >
          <option value="">All Popularities</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
      </div>

      {/* Loading Spinner */}
      {loading && <div className="text-center">Loading...</div>}
      {/* Error Message */}
      {error && <div className="text-center text-red-500">{error}</div>}
      {/* Tattoos Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tattoos.map((tattoo) => (
            <TattooCard key={tattoo._id} tattoo={tattoo} /> // Render each tattoo with TattooCard component
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
