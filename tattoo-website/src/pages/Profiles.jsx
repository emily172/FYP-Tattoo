import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch profiles on component load
  useEffect(() => {
    axios
      .get('http://localhost:5000/profiles') // Fetch all profiles
      .then((response) => setProfiles(response.data))
      .catch((err) => console.error('Error fetching profiles:', err));
  }, []);

  // Filter profiles based on search term
  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black p-8">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-7xl font-extrabold text-white drop-shadow-lg tracking-wide">
          Profiles
        </h1>
        <p className="text-xl text-gray-400 mt-4">
          Discover talented individuals and their unique specializations.
        </p>
        {/* Search Bar */}
        <div className="mt-8 text-center">
          <input
            type="text"
            placeholder="Search profiles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg w-80"
          />
        </div>
      </header>

{/* Profiles Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
  {filteredProfiles.map((profile) => (
    <Link
      to={`/profiles/${profile._id}`}
      key={profile._id}
      className="group relative rounded-[2rem] bg-gradient-to-bl from-gray-900 via-gray-800 to-black shadow-lg hover:shadow-[0_25px_70px_rgba(0,0,0,0.9)] transition-transform transform hover:scale-[1.05] overflow-hidden"
    >
      {/* Profile Image */}
      <div className="relative h-[300px] overflow-hidden rounded-t-[2rem]">
        <img
          src={profile.profileImage}
          alt={profile.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
        />
        {/* Inner Frame Effect */}
        <div className="absolute inset-0 border-[8px] border-gray-800 rounded-t-[2rem] group-hover:border-indigo-500 transition-all duration-500"></div>
      </div>

      {/* Profile Content */}
      <div className="p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-b-[2rem]">
        <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text tracking-wide">
          {profile.name}
        </h2>
        {/* Specialties */}
        {profile.tattooStyles && profile.tattooStyles.length > 0 && (
          <div className="flex flex-wrap mt-4 gap-2">
            {profile.tattooStyles.map((style, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-indigo-500 text-white rounded-full text-sm font-semibold shadow-md hover:bg-indigo-600 transition duration-300"
              >
                {style}
              </span>
            ))}
          </div>
        )}
        {/* Short Bio */}
        <p className="text-base text-gray-300 mt-4 leading-relaxed line-clamp-3">
          {profile.bio.substring(0, 100)}...
        </p>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-indigo-400 hover:text-indigo-500 font-semibold text-lg tracking-wide">
            Learn More →
          </span>
          {/* Stylish Button */}
          <button className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-full shadow-lg hover:bg-gradient-to-l hover:from-pink-500 hover:to-yellow-500 transition-transform hover:scale-[1.1] flex items-center space-x-2">
            <span>View Profile</span>
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
      {filteredProfiles.length === 0 && (
        <p className="text-center text-gray-400 text-lg mt-12 animate-pulse">
          No profiles available at the moment. Please check back later.
        </p>
      )}
    </div>
  );
};

export default Profiles;
