import React from 'react';

function TattooCard({ tattoo }) {
  const { name, image } = tattoo;

  return (
    <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg shadow-md p-4 hover:shadow-xl transform hover:scale-105 transition-all">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-t-lg transition-transform duration-500 hover:scale-110"
      />
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold text-white">{name}</h2>
      </div>
    </div>
  );
}

export default TattooCard;
