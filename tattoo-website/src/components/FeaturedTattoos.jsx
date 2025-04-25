import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TattooCard from './TattooCard';

function FeaturedTattoos() {
  const [tattoos, setTattoos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/tattoos?limit=3') // Fetch only 3 tattoos
      .then((response) => setTattoos(response.data))
      .catch((error) => console.error('Error fetching featured tattoos:', error));
  }, []);

  return (
    <div className="py-16 bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <h2 className="text-4xl font-extrabold text-center text-white mb-12">
        Featured <span className="text-indigo-500">Tattoos</span>
      </h2>
      
      {/* Updated Grid for Better Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {tattoos.map((tattoo) => (
          <div
            key={tattoo._id}
            className="group bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
          >
            {/* Enhanced Image Styling */}
            <div className="relative h-60 rounded-t-lg overflow-hidden">
              <img
                src={tattoo.image}
                alt={tattoo.name}
                className="w-full h-full object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
            </div>
            
            {/* Tattoo Details */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                {tattoo.name}
              </h3>
              <p className="text-gray-400 mt-2">{tattoo.description || 'Beautiful tattoo artwork.'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedTattoos;
