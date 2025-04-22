import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faGlobe, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faUserTie, faStar, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

function Artist() {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All Languages');
  const [selectedExperience, setSelectedExperience] = useState('All Levels');

  useEffect(() => {
    // Fetch artists from backend
    axios
      .get('http://localhost:5000/artists')
      .then((response) => {
        setArtists(response.data);
        setFilteredArtists(response.data);
      })
      .catch(() => setError('Failed to fetch artists.'));
  }, []);

  useEffect(() => {
    let result = [...artists];

    // Filter by language
    if (selectedLanguage !== 'All Languages') {
      result = result.filter((artist) =>
        artist.languagesSpoken?.includes(selectedLanguage)
      );
    }

    // Filter by experience
    if (selectedExperience !== 'All Levels') {
      const [min, max] = selectedExperience.split('-').map(Number);
      result = result.filter(
        (artist) => artist.experience >= min && artist.experience <= max
      );
    }

    // Filter by search query (name)
    if (searchQuery) {
      result = result.filter((artist) =>
        artist.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredArtists(result);
  }, [artists, selectedLanguage, selectedExperience, searchQuery]);

  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
  };

  const handleExperienceChange = (value) => {
    setSelectedExperience(value);
  };

  const clearFilters = () => {
    setSelectedLanguage('All Languages');
    setSelectedExperience('All Levels');
    setSearchQuery('');
  };

  const closeModal = () => {
    setSelectedArtist(null);
    setCurrentIndex(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      const nextIndex =
        currentIndex === null ? 0 : (currentIndex + 1) % filteredArtists.length;
      setSelectedArtist(filteredArtists[nextIndex]);
      setCurrentIndex(nextIndex);
    } else if (e.key === 'ArrowLeft') {
      const prevIndex =
        currentIndex === null
          ? 0
          : (currentIndex - 1 + filteredArtists.length) %
            filteredArtists.length;
      setSelectedArtist(filteredArtists[prevIndex]);
      setCurrentIndex(prevIndex);
    } else if (e.key === 'Escape') {
      closeModal();
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex flex-col items-center p-4 sm:p-6"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
<div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black p-8">
  {/* Header Section */}
  <header className="text-center mb-12">
    <h1 className="text-7xl font-extrabold text-white drop-shadow-lg tracking-wide">
      Our Team
    </h1>
    <p className="text-xl text-gray-400 mt-4">
      Discover the amazing talent behind incredible art.
    </p>
    {/* Search Bar */}
    <div className="mt-8 text-center">
      <input
        type="text"
        placeholder="Search artists by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg w-80"
      />
    </div>
  </header>

  <div className="w-full max-w-screen-xl mx-auto">

    {/* Error Message */}
    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

    {/* Filters */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
  <select
    className="px-4 py-3 rounded-lg bg-gradient-to-r from-gray-700 via-gray-800 to-black text-lg font-semibold text-gray-300 hover:text-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
    value={selectedLanguage}
    onChange={(e) => handleLanguageChange(e.target.value)}
  >
    <option value="All Languages" className="text-gray-400">🌐 All Languages</option>
    {[...new Set(artists.flatMap((artist) => artist.languagesSpoken || []))].map((language) => (
      <option key={language} value={language} className="text-gray-400 hover:text-gray-100">
        {language}
      </option>
    ))}
  </select>

  <select
    className="px-4 py-3 rounded-lg bg-gradient-to-r from-gray-700 via-gray-800 to-black text-lg font-semibold text-gray-300 hover:text-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
    value={selectedExperience}
    onChange={(e) => handleExperienceChange(e.target.value)}
  >
    <option value="All Levels" className="text-gray-400">🎨 All Levels</option>
    <option value="0-3" className="text-gray-400">0-3 Years</option>
    <option value="4-6" className="text-gray-400">4-6 Years</option>
    <option value="7-10" className="text-gray-400">7-10 Years</option>
    <option value="11-20" className="text-gray-400">11-20 Years</option>
  </select>

  <button
    className="px-4 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-lg font-bold text-white shadow-md hover:from-red-600 hover:to-black focus:outline-none focus:ring-2 focus:ring-red-500 transition-transform transform hover:scale-110"
    onClick={clearFilters}
  >
    🚫 Clear Filters
  </button>
</div>

  </div>

{/* Artist Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
  {filteredArtists.map((artist, index) => (
    <div
      key={artist._id}
      className="group relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition-transform transform hover:scale-105 hover:rotate-3"
      onClick={() => {
        setSelectedArtist(artist);
        setCurrentIndex(index);
      }}
    >
      {/* Card Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-30 transition-opacity"></div>

      {/* Image Section */}
      <div className="w-full h-80 overflow-hidden rounded-t-2xl">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-90"
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Name */}
        <h3 className="text-2xl font-bold text-gray-100 group-hover:text-indigo-400 transition">
          {artist.name}
        </h3>

        {/* Specialisation */}
        <p className="text-base text-gray-300 flex items-center mt-3">
          <FontAwesomeIcon icon={faUserTie} className="text-indigo-400 mr-2" />
          <span className="font-semibold">Specialisation:</span> {artist.specialisation || "N/A"}
        </p>

        {/* Popularity */}
        <p className="text-base text-gray-300 flex items-center mt-2">
          <FontAwesomeIcon icon={faStar} className="text-pink-400 mr-2" />
          <span className="font-semibold">Popularity:</span> {artist.popularity || "0"}
        </p>

        {/* View Profile Button */}
        <button className="mt-5 px-5 py-3 text-base font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-lg hover:from-indigo-400 hover:to-pink-400 transition-transform transform hover:scale-[1.1] hover:shadow-lg flex items-center">
          <FontAwesomeIcon icon={faArrowCircleRight} className="mr-2" />
          View Profile
        </button>
      </div>
    </div>
  ))}
</div>



        {/* Modal for Selected Artist */}
        {selectedArtist && (
  <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center z-50 p-4 sm:p-6">
    <div className="relative max-w-screen-lg w-full bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 bg-red-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500"
        onClick={closeModal}
        tabIndex={0}
      >
        <FontAwesomeIcon icon={faTimes} className="text-white text-lg" />
      </button>

              {/* Modal Content */}
              <div className="p-6 space-y-6 text-center sm:text-left">
                {/* Artist Image */}
                <img
                  src={selectedArtist.image}
                  alt={selectedArtist.name}
                  className="w-full max-h-[50vh] object-cover rounded-lg mx-auto sm:mx-0 shadow-lg"
                />

                {/* Artist Name */}
                <h2 className="text-2xl font-bold text-white">{selectedArtist.name}</h2>

                {/* Artist Bio */}
                <p className="text-sm text-gray-300 mt-4">
                  {selectedArtist.bio || "Biography not available."}
                </p>

                {/* Contact Information */}
                <div className="space-y-2 mt-4">
                  <h3 className="text-md font-semibold text-indigo-400">Contact</h3>
                  <p className="text-sm text-gray-300 flex items-center">
                    <FontAwesomeIcon icon={faEnvelope} className="text-indigo-400 mr-2" />
                    Email: {selectedArtist.contacts?.email || "Not Provided"}
                  </p>
                  <p className="text-sm text-gray-300 flex items-center">
                    <FontAwesomeIcon icon={faPhone} className="text-indigo-400 mr-2" />
                    Phone: {selectedArtist.contacts?.phone || "Not Provided"}
                  </p>
                </div>

                {/* Social Media Links */}
                <div className="space-y-2 mt-4">
                  <h3 className="text-md font-semibold text-indigo-400">Social Media</h3>
                  <div className="flex space-x-4">
                    {selectedArtist.socialMediaLinks?.instagram && (
                      <a
                        href={selectedArtist.socialMediaLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-400 hover:text-pink-500 transition flex items-center"
                      >
                        <FontAwesomeIcon icon={faInstagram} className="mr-2" />
                        Instagram
                      </a>
                    )}
                    {selectedArtist.socialMediaLinks?.facebook && (
                      <a
                        href={selectedArtist.socialMediaLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-500 transition flex items-center"
                      >
                        <FontAwesomeIcon icon={faFacebook} className="mr-2" />
                        Facebook
                      </a>
                    )}
                    {selectedArtist.socialMediaLinks?.twitter && (
                      <a
                        href={selectedArtist.socialMediaLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-400 hover:text-sky-500 transition flex items-center"
                      >
                        <FontAwesomeIcon icon={faTwitter} className="mr-2" />
                        Twitter
                      </a>
                    )}
                    {selectedArtist.socialMediaLinks?.website && (
                      <a
                        href={selectedArtist.socialMediaLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-gray-400 transition flex items-center"
                      >
                        <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                        Website
                      </a>
                    )}
                  </div>
                </div>

                {/* Languages Section */}
                {selectedArtist.languagesSpoken?.length > 0 && (
                  <div className="space-y-2 mt-4">
                    <h3 className="text-md font-semibold text-indigo-400">Languages</h3>
                    <ul className="list-disc list-inside text-sm text-gray-300">
                      {selectedArtist.languagesSpoken.map((language, index) => (
                        <li key={index} className="flex items-center">
                          <FontAwesomeIcon icon={faGlobe} className="text-indigo-400 mr-2" />
                          {language}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Experience Section */}
                {selectedArtist.experience && (
                  <div className="space-y-2 mt-4">
                    <h3 className="text-md font-semibold text-indigo-400">Experience</h3>
                    <p className="text-sm text-gray-300 flex items-center">
                      <FontAwesomeIcon icon={faBriefcase} className="text-indigo-400 mr-2" />
                      {selectedArtist.experience} years of experience in the industry.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Artist;
