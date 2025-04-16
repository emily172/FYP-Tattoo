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
            className="bg-white rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition"
          >
            <img
              src={artist.avatar}
              alt={artist.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800">{artist.name}</h3>
            <p className="text-gray-600 mt-2">{artist.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedArtists;
