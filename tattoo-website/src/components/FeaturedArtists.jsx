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
    <div className="py-16 bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <h2 className="text-4xl font-extrabold text-center text-white mb-12">
        Meet Our <span className="text-indigo-500">Team</span>
      </h2>
      
      {/* Enhanced Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {artists.map((artist) => (
          <div
            key={artist._id}
            className="group bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
          >
            {/* Enhanced Image Styling */}
            <div className="relative h-60 rounded-t-lg overflow-hidden">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
            </div>

            {/* Artist Details */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                {artist.name}
              </h3>
              <p className="text-sm text-gray-400 mt-2">{artist.bio || 'Learn more about our talented artist.'}</p>
              <p className="text-sm text-gray-500 mt-4">
                <strong>Specialty:</strong> {artist.style || 'Various styles'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedArtists;
