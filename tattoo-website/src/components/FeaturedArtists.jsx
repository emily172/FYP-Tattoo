import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FeaturedArtists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/artists?limit=3') // Fetch only 3 artists
      .then((response) => setArtists(response.data))
      .catch((error) => console.error('Error fetching artists:', error));
  }, []);

  return (
    <div className="p-8 bg-gray-200">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Meet Our <span className="text-indigo-500">Artists</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {artists.map((artist) => (
          <div
            key={artist._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 text-center"
          >
            {/* Updated Artist Image */}
            <div className="relative w-full h-48 mx-auto mb-4">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover rounded-md shadow-lg border border-indigo-500"
              />
            </div>

            {/* Artist Name */}
            <h3 className="text-xl font-bold text-gray-800">{artist.name}</h3>

            {/* Artist Bio */}
            <p className="text-sm text-gray-600 mt-2">{artist.bio}</p>

            {/* Artist Specialty */}
            <p className="text-sm text-gray-500 mt-4">
              <strong>Specialty:</strong> {artist.style}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedArtists;
