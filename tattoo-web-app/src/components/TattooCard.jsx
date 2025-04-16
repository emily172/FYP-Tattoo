import React from 'react';

function TattooCard({ tattoo }) {
  const { name, image } = tattoo; // Destructure the tattoo data

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transform hover:scale-105 transition">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg" />
      <div className="p-2">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
      </div>
    </div>
  );
}

export default TattooCard;
