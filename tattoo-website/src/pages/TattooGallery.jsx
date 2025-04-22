import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TattooGallery = () => {
  const [tattoos, setTattoos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/tattoo-gallery') // Fetch all tattoo images
      .then((response) => setTattoos(response.data))
      .catch((err) => {
        console.error('Error fetching tattoo gallery:', err);
        setError('Failed to load the tattoo gallery. Please try again later.');
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Tattoo Gallery</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : tattoos.length === 0 ? (
        <p className="text-gray-500">No tattoos available to display.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tattoos.map((tattoo) => (
            <div key={tattoo._id} className="border p-4 rounded shadow-md">
              <h3 className="text-lg font-bold">{tattoo.title}</h3>
              <img
                src={tattoo.imageUrl}
                alt={tattoo.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <p className="text-gray-700">{tattoo.description}</p>
              <p className="text-gray-700">
                <span className="font-bold">Style:</span> {tattoo.tattooStyle}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Location:</span> {tattoo.bodyLocation}
              </p>
              {tattoo.createdBy && (
                <p className="text-gray-700">
                  <span className="font-bold">Created By:</span> {tattoo.createdBy.name}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TattooGallery;
