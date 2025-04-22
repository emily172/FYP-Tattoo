import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft, faChevronRight, faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

function Artist() {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [error, setError] = useState('');
  const [isAutoplay, setIsAutoplay] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Specialisations');
  const [selectedSort, setSelectedSort] = useState('By Popularity');

  // Fetch artists from the backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/artists')
      .then((response) => {
        const data = response.data;
        setArtists(data);
        setFilteredArtists(data);
      })
      .catch(() => setError('Failed to fetch artists.'));
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...artists];

    if (selectedFilter !== 'All Specialisations') {
      result = result.filter((artist) =>
        artist.specialisation.toLowerCase().includes(selectedFilter.toLowerCase())
      );
    }

    if (searchQuery) {
      result = result.filter((artist) =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSort === 'By Popularity') {
      result.sort((a, b) => b.popularity - a.popularity);
    } else if (selectedSort === 'By Name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredArtists(result);
  }, [artists, selectedFilter, searchQuery, selectedSort]);

  // Autoplay functionality
  useEffect(() => {
    let interval;
    if (isAutoplay) {
      interval = setInterval(() => {
        handleNext();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoplay, currentIndex]);

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
  };

  const clearFilters = () => {
    setSelectedFilter('All Specialisations');
    setSearchQuery('');
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + filteredArtists.length) % filteredArtists.length;
    setSelectedArtist(filteredArtists[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % filteredArtists.length;
    setSelectedArtist(filteredArtists[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const closeModal = () => {
    setSelectedArtist(null);
    setCurrentIndex(null);
    setIsAutoplay(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-white tracking-tight">
          Artist Gallery
        </h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Search artists by name..."
          className="w-full mb-6 p-2 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex space-x-4 mb-6">
          <select
            className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200"
            value={selectedFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="All Specialisations">All Specialisations</option>
            {[...new Set(artists.map((artist) => artist.specialisation))].map((specialisation) => (
              <option key={specialisation} value={specialisation}>
                {specialisation}
              </option>
            ))}
          </select>

          <button
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            onClick={clearFilters}
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtists.map((artist, index) => (
            <div
              key={artist._id}
              className="group relative bg-gradient-to-br from-gray-800 via-gray-700 to-black rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow"
              onClick={() => {
                setSelectedArtist(artist);
                setCurrentIndex(index);
              }}
            >
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-60 sm:h-72 lg:h-80 object-cover rounded-lg transition-transform transform group-hover:scale-110 group-hover:rotate-2"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="flex flex-col items-center justify-center h-full space-y-3 px-4">
                  <h3 className="text-white text-xl font-extrabold tracking-wide uppercase">
                    {artist.name}
                  </h3>
                  <p className="text-gray-300 text-sm font-light italic">
                    Specialisation: {artist.specialisation || "N/A"}
                  </p>
                  <p className="text-gray-400 text-xs font-medium">
                    Popularity: {artist.popularity || "Unknown"}
                  </p>
                  <button className="px-5 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-full hover:scale-105 hover:shadow-lg transition-transform">
                    Explore Artist
                  </button>
                </div>
              </div>
              <div className="absolute inset-0 border-4 border-transparent rounded-lg group-hover:border-indigo-500 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {selectedArtist && (
          <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center z-50 p-6">
            <div className="relative max-w-screen-lg w-full max-h-screen bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
              <button
                className="absolute top-4 right-4 bg-red-600 w-12 h-12 rounded-full flex items-center justify-center hover:bg-red-700 hover:rotate-90 transition-transform duration-300 shadow-lg hover:shadow-xl"
                onClick={closeModal}
              >
                <FontAwesomeIcon icon={faTimes} className="text-white text-2xl" />
              </button>
              <div className="flex flex-col items-center overflow-y-auto max-h-[90vh] p-4 space-y-4">
                <div className="flex items-center justify-center mb-4">
                  <img
                    src={selectedArtist.image}
                    alt={selectedArtist.name}
                    className="max-w-full max-h-[50vh] object-contain rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex flex-col items-center text-center space-y-4">
                  <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
                    {selectedArtist.name}
                  </h2>
                  <p className="text-gray-300 text-sm italic">
                    Specialisation: {selectedArtist.specialisation || "Unknown Specialisation"}
                  </p>
                  <p className="text-gray-400 text-xs font-medium">
                    Popularity: {selectedArtist.popularity || "Unrated"}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {selectedArtist.bio || "No biography available."}
                  </p>
                  <div className="text-gray-300 text-sm">
                    <p>Phone: {selectedArtist.contacts?.phone || "N/A"}</p>
                    <p>Email: {selectedArtist.contacts?.email || "N/A"}</p>
                    <p>Address: {selectedArtist.contacts?.address || "N/A"}</p>
                  </div>
                  <div className="flex space-x-4">
                    {selectedArtist.socialMediaLinks?.instagram && (
                      <a
                        href={selectedArtist.socialMediaLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-500                        hover:underline"
                      >
                        Instagram
                      </a>
                    )}
                    {selectedArtist.socialMediaLinks?.facebook && (
                      <a
                        href={selectedArtist.socialMediaLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Facebook
                      </a>
                    )}
                    {selectedArtist.socialMediaLinks?.twitter && (
                      <a
                        href={selectedArtist.socialMediaLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-500 hover:underline"
                      >
                        Twitter
                      </a>
                    )}
                    {selectedArtist.socialMediaLinks?.website && (
                      <a
                        href={selectedArtist.socialMediaLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:underline"
                      >
                        Website
                      </a>
                    )}
                  </div>

                  {/* Awards Section */}
                  {selectedArtist.awards?.length > 0 && (
                    <div className="text-gray-300 text-sm">
                      <h3 className="text-lg font-semibold text-white">Awards:</h3>
                      <ul className="list-disc list-inside">
                        {selectedArtist.awards.map((award, index) => (
                          <li key={index}>
                            {award.title} ({award.year}): {award.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Certifications Section */}
                  {selectedArtist.certifications?.length > 0 && (
                    <div className="text-gray-300 text-sm">
                      <h3 className="text-lg font-semibold text-white">Certifications:</h3>
                      <ul className="list-disc list-inside">
                        {selectedArtist.certifications.map((certification, index) => (
                          <li key={index}>{certification}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Navigation Controls */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <button
                      className="bg-gray-800 p-4 rounded-full shadow-lg hover:bg-gray-700 transition-transform hover:scale-110 hover:-translate-x-1"
                      onClick={handlePrev}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} className="text-white text-2xl" />
                    </button>
                  </div>

                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <button
                      className="bg-gray-800 p-4 rounded-full shadow-lg hover:bg-gray-700 transition-transform hover:scale-110 hover:translate-x-1"
                      onClick={handleNext}
                    >
                      <FontAwesomeIcon icon={faChevronRight} className="text-white text-2xl" />
                    </button>
                  </div>

                  {/* Autoplay Toggle */}
                  <div className="flex">
                    <button
                      className={`relative flex items-center space-x-2 px-6 py-2 rounded-full text-sm font-bold transition-transform duration-300 ${isAutoplay
                          ? 'bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 shadow-lg ring-2 ring-green-500 hover:ring-green-600'
                          : 'bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 shadow-lg ring-2 ring-red-500 hover:ring-red-600'
                        }`}
                      onClick={() => setIsAutoplay(!isAutoplay)}
                    >
                      <FontAwesomeIcon
                        icon={isAutoplay ? faPauseCircle : faPlayCircle}
                        className="text-white text-lg"
                      />
                      <span className="text-white">
                        {isAutoplay ? 'Autoplay: ON' : 'Autoplay: OFF'}
                      </span>
                    </button>
                  </div>

                  {/* Thumbnail Navigation */}
                  <div className="flex overflow-x-auto space-x-4">
                    {artists.map((artist, index) => (
                      <img
                        key={artist._id}
                        src={artist.image}
                        alt={artist.name}
                        className={`w-16 h-16 object-cover cursor-pointer ${index === currentIndex ? 'ring-4 ring-indigo-500' : ''
                          } rounded-lg transition-transform hover:scale-105`}
                        onClick={() => {
                          setSelectedArtist(artist);
                          setCurrentIndex(index);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Artist;

                        