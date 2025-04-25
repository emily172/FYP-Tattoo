import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft, faChevronRight, faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faXTwitter, faTiktok, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';

import axios from 'axios';

function Gallery() {
  const [tattoos, setTattoos] = useState([]);
  const [filteredTattoos, setFilteredTattoos] = useState([]);
  const [selectedTattoo, setSelectedTattoo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [error, setError] = useState('');
  const [isAutoplay, setIsAutoplay] = useState(false); // Autoplay state

  const [searchQuery, setSearchQuery] = useState(''); // Real-time search query
  const [selectedFilter, setSelectedFilter] = useState('All Styles'); // Selected filter for style
  const [selectedSort, setSelectedSort] = useState('By Number'); // Sorting state

  // Fetch tattoos from the backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/tattoos')
      .then((response) => {
        const data = response.data;
        setTattoos(data);
        setFilteredTattoos(data); // Initialize filtered tattoos
      })
      .catch(() => setError('Failed to fetch tattoos.'));
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...tattoos];

    // Filter by style
    if (selectedFilter !== 'All Styles') {
      result = result.filter((tattoo) => tattoo.style === selectedFilter);
    }

    // Search tattoos by name
    if (searchQuery) {
      result = result.filter((tattoo) =>
        tattoo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting options
    if (selectedSort === 'By Number') {
      result.sort((a, b) => a._id - b._id); // Sort by ID number
    } else if (selectedSort === 'By Name') {
      result.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name
    } else if (selectedSort === 'By Style') {
      result.sort((a, b) => a.style.localeCompare(b.style)); // Sort alphabetically by style
    }

    setFilteredTattoos(result);
  }, [tattoos, selectedFilter, searchQuery, selectedSort]);

  // Autoplay functionality
  useEffect(() => {
    let interval;
    if (isAutoplay) {
      interval = setInterval(() => {
        handleNext(); // Automatically navigate to the next image
      }, 3000); // Change image every 3 seconds
    }
    return () => clearInterval(interval); // Clear interval when autoplay is toggled off or modal is closed
  }, [isAutoplay, currentIndex]);

  // Mouse and keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedTattoo) return;

      if (event.key === 'ArrowLeft') {
        handlePrev();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'Escape') {
        closeModal();
      }
    };

    const handleScroll = (event) => {
      if (!selectedTattoo) return;

      if (event.deltaY < 0) {
        handlePrev(); // Scroll up
      } else if (event.deltaY > 0) {
        handleNext(); // Scroll down
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleScroll);
    };
  }, [selectedTattoo, currentIndex]);

  const handleFilterChange = (key, value) => {
    setSelectedFilter(value);
  };

  const clearFilters = () => {
    setSelectedFilter('All Styles');
    setSearchQuery('');
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + filteredTattoos.length) % filteredTattoos.length;
    setSelectedTattoo(filteredTattoos[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % filteredTattoos.length;
    setSelectedTattoo(filteredTattoos[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const closeModal = () => {
    setSelectedTattoo(null);
    setCurrentIndex(null);
    setIsAutoplay(false); // Disable autoplay when closing the modal
  };

  const shareTattoo = (platform) => {
    const tattooUrl = `http://localhost:5000/tattoos/${selectedTattoo._id}`;

    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(tattooUrl)}`, '_blank');
    } else if (platform === 'x') {
      window.open(
        `https://X.com/intent/tweet?url=${encodeURIComponent(tattooUrl)}&text=Check out this tattoo!`,
        '_blank'
      );
    } else if (platform === 'tiktok') {
      window.open('https://www.tiktok.com', '_blank');
    } else if (platform === 'instagram') {
      window.open('https://www.instagram.com', '_blank');
    } else if (platform === 'pinterest') {
      window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(tattooUrl)}`, '_blank');
    }
  };


  const handleDownload = (tattoo) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const image = new Image();

  image.crossOrigin = 'Anonymous'; // Ensure images from external sources load correctly

  image.onload = () => {
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    // Draw the tattoo image onto the canvas
    context.drawImage(image, 0, 0);

    // Add watermark
    context.font = '30px Arial';
    context.fillStyle = 'rgba(255, 255, 255, 0.8)';
    context.textAlign = 'center';
    context.fillText('© InkPots', canvas.width / 2, canvas.height - 20);

    // Generate downloadable image
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${tattoo.name.replace(/\s+/g, '-')}-tattoo.png`;
    link.click();
  };

  image.onerror = () => {
    console.error('Failed to load the image.');
  };

  image.src = tattoo.image; // Tattoo image source
};


  return (
<div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black p-8">
  {/* Header Section */}
  <header className="text-center mb-12">
    <h1 className="text-7xl font-extrabold text-white drop-shadow-lg tracking-wide">
      Tattoo Gallery
    </h1>
    <p className="text-xl text-gray-400 mt-4">
      Explore stunning tattoo designs and artistic inspirations.
    </p>
  </header>

  <div className="w-full max-w-screen-xl mx-auto">
    {/* Error Message */}
    {error && <p className="text-red-500 mb-6 text-center">{error}</p>}

    {/* Search Bar */}
    <input
      type="text"
      placeholder="Search tattoos by name..."
      className="w-full mb-8 px-4 py-3 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-500 shadow-lg text-lg"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />

    {/* Filters */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Style Filter */}
      <select
        className="px-5 py-3 rounded-lg bg-gradient-to-r from-gray-700 via-gray-800 to-black text-lg font-semibold text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition-transform transform hover:scale-105"
        value={selectedFilter}
        onChange={(e) => handleFilterChange('style', e.target.value)}
      >
        <option value="All Styles">🌟 All Styles</option>
        {[...new Set(tattoos.map((tattoo) => tattoo.style))].map((style) => (
          <option key={style} value={style}>
            {style}
          </option>
        ))}
      </select>

      {/* Clear Filters */}
      <button
        className="px-5 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white text-lg font-bold shadow-md hover:from-red-600 hover:to-black focus:outline-none focus:ring-2 focus:ring-red-500 transition-transform transform hover:scale-105 hover:rotate-3"
        onClick={clearFilters}
      >
        🚫 Clear All
      </button>
    </div>

    {/* Sorting */}
    <div className="flex flex-wrap gap-4 mb-8 justify-center">
      <button
        className={`px-5 py-3 rounded-lg font-bold shadow-md ${
          selectedSort === 'By Number' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'
        } hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform transform hover:scale-105`}
        onClick={() => setSelectedSort('By Number')}
      >
        By Number
      </button>
      <button
        className={`px-5 py-3 rounded-lg font-bold shadow-md ${
          selectedSort === 'By Name' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'
        } hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform transform hover:scale-105`}
        onClick={() => setSelectedSort('By Name')}
      >
        By Name
      </button>
      <button
        className={`px-5 py-3 rounded-lg font-bold shadow-md ${
          selectedSort === 'By Style' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'
        } hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform transform hover:scale-105`}
        onClick={() => setSelectedSort('By Style')}
      >
        By Style
      </button>
    </div>

    {/* Surprise Me Button */}
    <div className="text-center mb-8">
      <button
        className="px-6 py-3 bg-purple-500 text-white text-xl font-bold rounded-lg hover:bg-purple-600 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-transform hover:scale-110"
        onClick={() => {
          const randomIndex = Math.floor(Math.random() * filteredTattoos.length);
          setSelectedTattoo(filteredTattoos[randomIndex]);
          setCurrentIndex(randomIndex);
        }}
      >
        🎲 Surprise Me!
      </button>
    </div>
  




{/* Tattoo Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
  {filteredTattoos.map((tattoo, index) => (
    <div
      key={tattoo._id}
      className="group relative bg-gradient-to-br from-gray-800 via-gray-700 to-black rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-transform transform hover:scale-105 hover:rotate-2"
      onClick={() => {
        setSelectedTattoo(tattoo);
        setCurrentIndex(index);
      }}
    >
      {/* Image */}
      <img
        src={tattoo.image}
        alt={tattoo.name}
        className="w-full h-96 sm:h-[28rem] lg:h-[32rem] object-cover rounded-t-2xl transition-transform transform group-hover:scale-110 group-hover:rotate-2"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="flex flex-col items-center justify-center h-full space-y-5 px-6">
          {/* Tattoo Name */}
          <h3 className="text-white text-2xl font-extrabold tracking-wide uppercase">
            {tattoo.name}
          </h3>
          {/* Additional Details */}
          <p className="text-gray-300 text-lg font-light italic">
            Style: {tattoo.style || "Unique Design"}
          </p>
          <p className="text-gray-400 text-base font-medium">
            Popularity: {tattoo.popularity || "Unknown"}
          </p>
          {/* View More Button */}
          <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-lg font-bold rounded-full hover:scale-110 hover:shadow-lg transition-transform">
            Explore Tattoo
          </button>
        </div>
      </div>

      {/* Decorative Border */}
      <div className="absolute inset-0 border-[6px] border-transparent rounded-2xl group-hover:border-indigo-500 transition-all duration-500"></div>
    </div>
  ))}
</div>



        {/* Fullscreen Modal */}
        {selectedTattoo && (
          <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center z-50 p-6">
            <div className="relative max-w-screen-lg w-full max-h-screen bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
              {/* Close Icon */}
              <button
                className="absolute top-4 right-4 bg-red-600 w-12 h-12 rounded-full flex items-center justify-center hover:bg-red-700 hover:rotate-90 transition-transform duration-300 shadow-lg hover:shadow-xl"
                onClick={closeModal}
              >
                <FontAwesomeIcon icon={faTimes} className="text-white text-2xl" />
                {/* OR */}
                {/* <FaTimes className="text-white text-2xl" /> */}
              </button>


              {/* Scrollable Content */}
              <div className="flex flex-col items-center overflow-y-auto max-h-[90vh] p-4 space-y-4">
                {/* Main Image */}
                <div className="flex items-center justify-center mb-4">
                  <img
                    src={selectedTattoo.image}
                    alt={selectedTattoo.name}
                    className="max-w-full max-h-[50vh] object-contain rounded-lg shadow-lg"
                  />
                </div>

                {/* Tattoo Details */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
                    {selectedTattoo.name}
                  </h2>
                  <p className="text-gray-300 text-sm italic">
                    Style: {selectedTattoo.style || "Unknown Style"}
                  </p>
                  <p className="text-gray-400 text-xs font-medium">
                    Popularity: {selectedTattoo.popularity || "Unrated"}
                  </p>
                  {/* Download Button */}
                  <button
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 shadow-md transition-transform hover:scale-105"
                    onClick={() => handleDownload(selectedTattoo)}
                  >
                    Download Image
                  </button>
                </div>


                {/* Navigation Controls */}
                {/* Previous Icon */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <button
                    className="bg-gray-800 p-4 rounded-full shadow-lg hover:bg-gray-700 transition-transform hover:scale-110 hover:-translate-x-1"
                    onClick={handlePrev}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} className="text-white text-2xl" />
                    {/* OR */}
                    {/* <FaChevronLeft className="text-white text-2xl" /> */}
                  </button>
                </div>

                {/* Next Icon */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <button
                    className="bg-gray-800 p-4 rounded-full shadow-lg hover:bg-gray-700 transition-transform hover:scale-110 hover:translate-x-1"
                    onClick={handleNext}
                  >
                    <FontAwesomeIcon icon={faChevronRight} className="text-white text-2xl" />
                    {/* OR */}
                    {/* <FaChevronRight className="text-white text-2xl" /> */}
                  </button>
                </div>


                <div className="flex">
                  <button
                    className={`relative flex items-center space-x-2 px-6 py-2 rounded-full text-sm font-bold transition-transform duration-300 ${isAutoplay
                        ? 'bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 shadow-lg ring-2 ring-green-500 hover:ring-green-600'
                        : 'bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 shadow-lg ring-2 ring-red-500 hover:ring-red-600'
                      }`}
                    onClick={() => setIsAutoplay(!isAutoplay)}
                  >
                    {/* Play/Pause Icon */}
                    <div
                      className={`transition-transform duration-300 ${isAutoplay ? 'translate-x-0' : '-translate-x-1'
                        }`}
                    >
                      <FontAwesomeIcon
                        icon={isAutoplay ? faPauseCircle : faPlayCircle}
                        className="text-white text-lg"
                      />
                    </div>

                    {/* Label */}
                    <span className="text-white">
                      {isAutoplay ? 'Autoplay: ON' : 'Autoplay: OFF'}
                    </span>
                  </button>
                </div>


                {/* Social Sharing Icons */}
                <div className="flex mt-4 space-x-4">
                  <button
                    className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-4 rounded-full hover:from-blue-500 hover:to-blue-700 transition-transform hover:scale-110 shadow-lg flex items-center justify-center"
                    onClick={() => shareTattoo('facebook')}
                  >
                    <FontAwesomeIcon icon={faFacebookF} className="text-xl" />
                    {/* OR */}
                    {/* <FaFacebookF className="text-xl" /> */}
                  </button>
                  <button
                    className="bg-gradient-to-br from-sky-400 to-sky-600 text-white p-4 rounded-full hover:from-sky-500 hover:to-sky-700 transition-transform hover:scale-110 shadow-lg flex items-center justify-center"
                    onClick={() => shareTattoo('x')}
                  >
                    <FontAwesomeIcon icon={faXTwitter} className="text-xl" />
                  </button>
                  <button
                    className="bg-gradient-to-br from-pink-400 to-pink-600 text-white p-4 rounded-full hover:from-pink-500 hover:to-pink-700 transition-transform hover:scale-110 shadow-lg flex items-center justify-center"
                    onClick={() => shareTattoo('tiktok')}
                  >
                    <FontAwesomeIcon icon={faTiktok} className="text-xl" />
                    {/* OR */}
                    {/* <FaTiktok className="text-xl" /> */}
                  </button>
                  <button
                    className="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-4 rounded-full hover:from-orange-500 hover:to-orange-700 transition-transform hover:scale-110 shadow-lg flex items-center justify-center"
                    onClick={() => shareTattoo('instagram')}
                  >
                    <FontAwesomeIcon icon={faInstagram} className="text-xl" />
                    {/* OR */}
                    {/* <FaInstagram className="text-xl" /> */}
                  </button>
                  <button
                    className="bg-gradient-to-br from-red-400 to-red-600 text-white p-4 rounded-full hover:from-red-500 hover:to-red-700 transition-transform hover:scale-110 shadow-lg flex items-center justify-center"
                    onClick={() => shareTattoo('pinterest')}
                  >
                    <FontAwesomeIcon icon={faPinterest} className="text-xl" />
                    {/* OR */}
                    {/* <FaPinterest className="text-xl" /> */}
                  </button>
                </div>



                {/* Thumbnail Navigation */}
                <div className="flex overflow-x-auto space-x-4">
                  {tattoos.map((tattoo, index) => (
                    <img
                      key={tattoo._id}
                      src={tattoo.image}
                      alt={tattoo.name}
                      className={`w-16 h-16 object-cover cursor-pointer ${index === currentIndex ? 'ring-4 ring-indigo-500' : ''
                        } rounded-lg transition-transform hover:scale-105`}
                      onClick={() => {
                        setSelectedTattoo(tattoo);
                        setCurrentIndex(index);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Gallery;
