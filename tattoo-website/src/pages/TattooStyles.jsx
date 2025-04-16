import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TattooStyles = () => {
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/tattoo-styles') // Fetch tattoo styles
      .then((response) => setStyles(response.data))
      .catch((err) => console.error('Error fetching tattoo styles:', err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Tattoo Styles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {styles.map((style, index) => (
          <div key={index} className="bg-white rounded-md shadow-md p-4 text-center">
            <img src={style.image} alt={style.name} className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-bold">{style.name}</h3>
            <p className="text-gray-500">{style.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TattooStyles;
