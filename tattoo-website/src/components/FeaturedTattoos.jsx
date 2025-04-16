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
    <div className="p-8 bg-gray-100">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Featured <span className="text-indigo-500">Tattoos</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tattoos.map((tattoo) => (
          <TattooCard key={tattoo._id} tattoo={tattoo} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedTattoos;
