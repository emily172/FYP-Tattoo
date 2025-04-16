import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageGallery() {
  const [tattoos, setTattoos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/tattoos')
      .then((response) => setTattoos(response.data))
      .catch((err) => setError('Failed to fetch tattoos.'));
  }, []);

  const deleteTattoo = (id) => {
    axios.delete(`http://localhost:5000/tattoos/${id}`)
      .then(() => {
        setTattoos((prev) => prev.filter((tattoo) => tattoo._id !== id));
      })
      .catch((err) => alert('Failed to delete tattoo.'));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Gallery</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tattoos.map((tattoo) => (
          <div key={tattoo._id} className="bg-white rounded-md shadow-md p-4">
            <img src={tattoo.image} alt={tattoo.name} className="w-full h-40 object-cover mb-4 rounded-md" />
            <h2 className="text-lg font-bold">{tattoo.name}</h2>
            <p>Style: {tattoo.style}</p>
            <p>Popularity: {tattoo.popularity}</p>
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => deleteTattoo(tattoo._id)}
              >
                Delete
              </button>
              <button
                className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                onClick={() => alert('Edit feature coming soon!')}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageGallery;
