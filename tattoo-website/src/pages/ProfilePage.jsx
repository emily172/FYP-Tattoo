import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const { id } = useParams(); // Capture the profile ID from the URL
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Carousel functionality for portfolio images

  useEffect(() => {
    axios
      .get(`http://localhost:5000/profiles/${id}`) // Fetch the selected profile details
      .then((response) => setProfile(response.data))
      .catch((err) => {
        console.error('Error fetching profile:', err);
        setError(true);
      });
  }, [id]);

  if (error)
    return <p className="text-red-500 text-center">Error loading profile details. Please try again later.</p>;
  if (!profile) return <p className="text-center text-gray-400 animate-pulse">Loading profile details...</p>;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? profile.portfolio.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === profile.portfolio.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-8">
      {/* Header */}
      <header className="text-center mb-16 relative group">
  <div className="relative overflow-hidden rounded-3xl shadow-xl">
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[800px]">
      {/* Carousel Images */}
      <img
        src={profile.profileImage}
        alt={`Primary image of ${profile.name}`}
        loading="lazy"
        className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 ease-in-out opacity-100 group-hover:scale-110"
      />
      {profile.portfolio && profile.portfolio.length > 0 && (
        <img
          src={profile.portfolio[0]}
          alt="Additional profile image"
          loading="lazy"
          className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        />
      )}
    </div>
    {/* Title and Icon */}
    <div className="absolute bottom-8 left-8 flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide bg-gradient-to-r from-pink-500 via-purple-500 to-white text-transparent bg-clip-text">
  {profile.name}
</h1>

      <span className="text-pink-500 text-3xl md:text-4xl lg:text-5xl" title="Profile Star">
        🌟
      </span>
    </div>
  </div>
</header>

{/* About Section */}
{profile.bio && (
  <section className="mb-16 max-w-4xl mx-auto border-4 border-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-lg shadow-lg p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
    {/* Icon and Header */}
    <div className="col-span-full text-center">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
        About {profile.name}
      </h2>
    </div>
    {/* Content */}
    <div className="col-span-full text-center">
      <p className="text-gray-300 text-lg leading-relaxed">{profile.bio}</p>
    </div>
  </section>
)}
{/* Tile-Based Layout */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 px-6 py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9)]">
  {/* Experience Section */}
  {profile.experience && (
    <div className="bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-xl p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
        💼 Experience
      </h2>
      <p className="text-gray-300 text-lg leading-relaxed">{profile.experience}</p>
    </div>
  )}

  {/* Pricing Section */}
  {profile.pricing && (
    <div className="bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
        💰 Pricing
      </h2>
      <p className="text-gray-300 text-lg leading-relaxed">{profile.pricing}</p>
    </div>
  )}

  {/* Availability Section */}
  {profile.availability && (
    <div className="bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
        ⏰ Availability
      </h2>
      <p className="text-gray-300 text-lg leading-relaxed">{profile.availability}</p>
    </div>
  )}

  {/* Safety Protocols */}
  {profile.safetyProtocols && (
    <div className="bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
        🛡️ Safety Protocols
      </h2>
      <p className="text-gray-300 text-lg leading-relaxed">
        {profile.safetyProtocols || "No safety protocols specified."}
      </p>
    </div>
  )}

  {/* Awards Section */}
  {profile.awards && profile.awards.length > 0 && (
    <div className="bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
        🏆 Awards
      </h2>
      <ul className="list-disc list-inside text-gray-300 text-lg">
        {profile.awards.map((award, index) => (
          <li key={index}>{award}</li>
        ))}
      </ul>
    </div>
  )}

  {/* Origin Section */}
  {profile.origin && (
    <div className="bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
        📍 Origin
      </h2>
      <p className="text-gray-300 text-lg leading-relaxed">
        <strong>City:</strong> {profile.origin.city || "Not specified"}
      </p>
      <p className="text-gray-300 text-lg leading-relaxed">
        <strong>Country:</strong> {profile.origin.country || "Not specified"}
      </p>
    </div>
  )}

  {/* Languages Spoken */}
  {profile.languagesSpoken && profile.languagesSpoken.length > 0 && (
    <div className="bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
        🗣️ Languages Spoken
      </h2>
      <ul className="list-disc list-inside text-gray-300 text-lg">
        {profile.languagesSpoken.map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
    </div>
  )}

  {/* Tags Section */}
  {profile.tags && profile.tags.length > 0 && (
    <div className="bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
        🏷️ Tags
      </h2>
      <ul className="flex flex-wrap justify-center space-x-2">
        {profile.tags.map((tag, index) => (
          <li
            key={index}
            className="bg-pink-500 text-white text-sm px-3 py-1 rounded-full shadow hover:bg-pink-600 transition duration-300"
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  )}

  {/* Social Media Links */}
  {profile.socialMediaLinks && (
    <div className="bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
        🌐 Connect on Social Media
      </h2>
      <div className="flex justify-center space-x-4">
        {profile.socialMediaLinks.tiktok && (
          <a
            href={profile.socialMediaLinks.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 text-lg bg-pink-500 px-4 py-2 rounded-lg shadow hover:bg-pink-600 transition-all duration-300"
          >
            TikTok
          </a>
        )}
        {profile.socialMediaLinks.instagram && (
          <a
            href={profile.socialMediaLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 text-lg bg-purple-500 px-4 py-2 rounded-lg shadow hover:bg-purple-600 transition-all duration-300"
          >
            Instagram
          </a>
        )}
        {profile.socialMediaLinks.facebook && (
          <a
            href={profile.socialMediaLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 text-lg bg-blue-500 px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-all duration-300"
          >
            Facebook
          </a>
        )}
        {profile.socialMediaLinks.x && (
          <a
            href={profile.socialMediaLinks.x}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 text-lg bg-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-800 transition-all duration-300"
          >
            X (formerly Twitter)
          </a>
        )}
      </div>
    </div>
  )}
</div>



{/* Portfolio Section */}
{profile.portfolio && profile.portfolio.length > 0 && (
  <section className="mb-16 px-6 py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9)]">
    {/* Header */}
    <h2 className="text-4xl font-extrabold tracking-wide mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text text-center flex items-center justify-center space-x-4">
      ✨ Portfolio Gallery ✨
      <span className="text-pink-500 text-3xl">📷</span>
    </h2>

    {/* Main Image Display */}
    <div className="relative w-full h-[800px] rounded-lg overflow-hidden shadow-xl">
      <div
        className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105"
        style={{
          backgroundImage: `url(${profile.portfolio[currentIndex]})`,
        }}
        aria-label={`Portfolio image ${currentIndex + 1} of ${profile.portfolio.length}`}
      ></div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white px-5 py-3 rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label="Previous Image"
      >
        &#8249;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white px-5 py-3 rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label="Next Image"
      >
        &#8250;
      </button>
    </div>

    {/* Indicators */}
    <div className="flex justify-center space-x-4 mt-8">
      {profile.portfolio.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`w-5 h-5 rounded-full ${currentIndex === index ? "bg-pink-500 scale-125" : "bg-gray-500"
            } transition-transform duration-300`}
          aria-label={`Navigate to image ${index + 1}`}
        ></button>
      ))}
    </div>
  </section>
)}
{/* Artwork Section */}
{profile.artwork && profile.artwork.length > 0 && (
  <section className="mb-12 bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg p-8 transition-transform duration-500 hover:shadow-2xl">
    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text flex items-center justify-center space-x-4">
      <span className="text-purple-500">🎨</span>
      <span>Artwork</span>
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {profile.artwork.map((image, index) => (
        <div
          key={index}
          className="relative group rounded-lg overflow-hidden shadow-lg"
        >
          <img
            src={image}
            alt={`Artwork ${index + 1}`}
            className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white font-bold text-lg">
            Artwork {index + 1}
          </div>
        </div>
      ))}
    </div>
  </section>
)}
    </div>
  );
};

export default ProfilePage;
