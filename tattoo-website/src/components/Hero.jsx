import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div
      className="relative bg-cover bg-center h-[60vh]"
      style={{ backgroundImage: "url('path/to/hero-image.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
        <h1 className="text-white text-5xl font-extrabold text-center">Welcome to Tattoo Studio</h1>
        <p className="text-white text-lg mt-4 text-center">Your story, inked with perfection.</p>
        <Link to="/gallery">
          <button className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded text-lg">
            Explore the Gallery
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
