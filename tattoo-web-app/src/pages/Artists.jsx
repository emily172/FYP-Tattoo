import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Artists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State variables for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStyle, setFilterStyle] = useState('');

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
          <option value="Traditional">Traditional</option>
          <option value="Black & Gray">Black & Gray</option>
          <option value="Watercolor">Watercolor</option>
        </select>
      </div>

      {/* Loading Spinner */}
      {loading && <div className="text-center">Loading...</div>}
      {/* Error Message */}
      {error && <div className="text-center text-red-500">{error}</div>}
      {/* Artists Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <div
              key={artist._id}
              className="bg-white rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition"
            >
              <img
                src={artist.avatar}
                alt={artist.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-bold text-gray-800">{artist.name}</h2>
              <p className="text-gray-600 mt-2">{artist.bio}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Artists;



/*import React, { useState } from "react";
import { Link } from "react-router-dom";
import { artists } from "../data/artists";

const Artists = () => {
  const [search, setSearch] = useState(""); // Search bar state
  const [specialty, setSpecialty] = useState(""); // Filter state

  // Filter artists based on the search term and specialty
  const filteredArtists = artists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(search.toLowerCase()) &&
      (specialty === "" || artist.specialty === specialty)
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Our Artists</h2>
      <p>Explore profiles of skilled tattoo artists.</p>
*/
      {/* Search and Filter */}
      /*<div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="form-control mb-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="">All Specialties</option>
          <option value="Geometric Tattoos">Geometric Tattoos</option>
          <option value="Blackwork Tattoos">Blackwork Tattoos</option>
          <option value="Realism Tattoos">Realism Tattoos</option>
        </select>
      </div>
*/
      {/* Display Filtered Artists */}
     /* <div className="row">
        {filteredArtists.length > 0 ? (
          filteredArtists.map((artist) => (
            <div className="col-md-4 mb-4" key={artist.id}>
              <div className="card">*/
                {/* Link to the artist's profile page passing the id to the page */}
               /* <Link to={`/artists/${artist.id}`} className="text-decoration-none">
                  <img
                    src={artist.image || "https://placehold.co/350x200"}
                    alt={artist.name || "Artist"}
                    className="card-img-top"
                    style={{
                      objectFit: "cover",
                      height: "200px",
                      width: "100%",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{artist.name}</h5>
                    <p>{artist.specialty}</p>
                  </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No artists match your search or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Artists;*/
