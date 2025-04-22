import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TattooStyles = () => {
  const [styles, setStyles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch tattoo styles on component load
  useEffect(() => {
    axios
      .get('http://localhost:5000/tattoo-styles') // Fetch all tattoo styles
      .then((response) => setStyles(response.data))
      .catch((err) => console.error('Error fetching tattoo styles:', err));
  }, []);

  // Filter tattoo styles based on search term
  const filteredStyles = styles.filter((style) =>
    style.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black p-8">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-7xl font-extrabold text-white drop-shadow-lg tracking-wide">
          Tattoo Styles
        </h1>
        <p className="text-xl text-gray-400 mt-4">
          Explore bold, inspiring, and visually stunning tattoo designs.
        </p>
        {/* Search Bar */}
        <div className="mt-8 text-center">
          <input
            type="text"
            placeholder="Search tattoo styles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg w-80"
          />
        </div>
      </header>

      {/* Styles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredStyles.map((style) => (
          <Link
            to={`/styles/${style._id}`}
            key={style._id}
            className="group relative rounded-3xl bg-gradient-to-b from-gray-800 via-gray-900 to-black shadow-2xl hover:shadow-[0_25px_60px_rgba(0,0,0,0.9)] transition-transform transform hover:scale-[1.1] overflow-hidden"
          >
            {/* Style Image */}
            <div className="relative h-80 overflow-hidden rounded-t-3xl">
              <img
                src={style.image}
                alt={style.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-3"
              />
              {/* Glow Frame */}
              <div className="absolute inset-0 border-[6px] border-transparent group-hover:border-indigo-500 rounded-t-3xl transition-all duration-500"></div>
              {/* Multi-layer Radial Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.2)_0%,_transparent_75%)] pointer-events-none opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>
              {/* Featured Badge */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-yellow-500 px-3 py-2 text-sm font-bold text-white rounded-full shadow-lg">
                Featured
              </div>
            </div>

            {/* Style Content */}
            <div className="p-6 relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-b-3xl">
              <h2 className="text-3xl font-extrabold text-white group-hover:text-indigo-400 transition-colors duration-300 leading-tight tracking-wide">
                {style.name}
              </h2>
              {/* Tags */}
              <div className="flex flex-wrap mt-2 space-x-2">
                {style.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-500 text-white rounded-full text-sm font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {/* Description */}
              <p className="text-base text-gray-300 mt-4 leading-relaxed line-clamp-3">
                {style.description.substring(0, 100)}...
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-indigo-400 hover:text-indigo-500 font-semibold text-lg tracking-wide">
                  Learn More →
                </span>
                {/* Luxury Button with Icon */}
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-full shadow-lg hover:bg-gradient-to-l hover:from-pink-500 hover:to-yellow-500 transition-transform hover:scale-[1.1] flex items-center space-x-2">
                  <span>Explore Style</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1.5-11.5a.75.75 0 00-1.5 0V10H6a.75.75 0 000 1.5h4v4a.75.75 0 001.5 0V10h4a.75.75 0 000-1.5h-4V6.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State Message */}
      {filteredStyles.length === 0 && (
        <p className="text-center text-gray-400 text-lg mt-12 animate-pulse">
          No tattoo styles available at the moment. Please check back later.
        </p>
      )}
    </div>
  );
};

export default TattooStyles;
