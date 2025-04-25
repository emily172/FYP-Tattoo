import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [newProfile, setNewProfile] = useState({
    name: '',
    bio: '',
    profileImage: '',
    popularity: 0,
    interests: [],
    skills: [],
    contactInfo: '',
    experience: '',
    tattooStyles: [],
    portfolio: [],
    certifications: [],
    tags: [],
    socialMediaLinks: {
      tiktok: '',
      instagram: '',
      facebook: '',
      x: '',
    },
    languagesSpoken: [],
    availability: '',
    pricing: '',
    safetyProtocols: '',
    awards: [],
    artwork: [],
    origin: {
      city: '',
      country: '',
    },
  });
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/profiles')
      .then((response) => {
        const updatedProfiles = response.data.map((profile) => ({
          ...profile,
          origin: profile.origin || { city: '', country: '' },
        }));
        setProfiles(updatedProfiles);
      })
      .catch(() => setError('Failed to fetch profiles.'));
  }, []);

  const handleAddProfile = (e) => {
    e.preventDefault();
    if (!newProfile.name || !newProfile.bio || !newProfile.profileImage) {
      setError('Name, Bio, and Profile Image are required.');
      return;
    }

    axios
      .post('http://localhost:5000/profiles', newProfile)
      .then((response) => {
        setProfiles([response.data, ...profiles]);
        resetForm();
        setError('');
      })
      .catch(() => setError('Failed to add profile.'));
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    if (!selectedProfile.name || !selectedProfile.bio || !selectedProfile.profileImage) {
      setError('Name, Bio, and Profile Image are required.');
      return;
    }

    axios
      .put(`http://localhost:5000/profiles/${selectedProfile._id}`, selectedProfile)
      .then((response) => {
        setProfiles(
          profiles.map((profile) =>
            profile._id === response.data._id ? response.data : profile
          )
        );
        resetForm();
        setError('');
      })
      .catch(() => setError('Failed to update profile.'));
  };

  const deleteProfile = async (id) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      try {
        await axios.delete(`http://localhost:5000/profiles/${id}`);
        setProfiles(profiles.filter((profile) => profile._id !== id));
      } catch {
        setError('Failed to delete profile.');
      }
    }
  };

  const handleInputChange = (e, field, isNestedField = false) => {
    const { name, value } = e.target;

    const formattedValue =
      typeof value === 'string' && value.includes(',')
        ? value.split(', ').map((item) => item.trim())
        : value;

    if (isNestedField) {
      if (selectedProfile) {
        setSelectedProfile((prev) => ({
          ...prev,
          [field]: { ...prev[field], [name]: formattedValue },
        }));
      } else {
        setNewProfile((prev) => ({
          ...prev,
          [field]: { ...prev[field], [name]: formattedValue },
        }));
      }
    } else {
      if (selectedProfile) {
        setSelectedProfile((prev) => ({
          ...prev,
          [field]: formattedValue,
        }));
      } else {
        setNewProfile((prev) => ({
          ...prev,
          [field]: formattedValue,
        }));
      }
    }
  };

  const resetForm = () => {
    setNewProfile({
      name: '',
      bio: '',
      profileImage: '',
      popularity: 0,
      interests: [],
      skills: [],
      contactInfo: '',
      experience: '',
      tattooStyles: [],
      portfolio: [],
      certifications: [],
      tags: [],
      socialMediaLinks: {
        tiktok: '',
        instagram: '',
        facebook: '',
        x: '',
      },
      languagesSpoken: [],
      availability: '',
      pricing: '',
      safetyProtocols: '',
      awards: [],
      artwork: [],
      origin: {
        city: '',
        country: '',
      },
    });
    setSelectedProfile(null);
  };

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 p-8">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-purple-800 drop-shadow-lg">
          Profile Management Portal
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          Create, update, and manage profiles effortlessly.
        </p>
      </header>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Add/Edit Form */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">
          {selectedProfile ? 'Edit Profile' : 'Add New Profile'}
        </h2>
        <form
          onSubmit={(e) =>
            selectedProfile ? handleEditProfile(e) : handleAddProfile(e)
          }
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Profile Name"
            value={selectedProfile ? selectedProfile.name : newProfile.name}
            onChange={(e) => handleInputChange(e, 'name')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            required
          />
          <textarea
            placeholder="Biography"
            value={selectedProfile ? selectedProfile.bio : newProfile.bio}
            onChange={(e) => handleInputChange(e, 'bio')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            required
          />
          {/* Add all other form fields like popularity, interests, etc. */}
          <button
            type="submit"
            className={`text-white px-4 py-2 rounded ${
              selectedProfile ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {selectedProfile ? 'Update Profile' : 'Add Profile'}
          </button>
          {selectedProfile && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-red-500 text-white px-4 py-2 rounded ml-4 hover:bg-red-600"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Profiles List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <div
            key={profile._id}
            className="bg-gray-100 shadow-lg rounded-lg p-4 hover:shadow-2xl"
          >
            {/* Profile Name and Bio */}
            <h3 className="text-lg font-bold mb-2">{profile.name}</h3>
            <p className="text-gray-600 mb-2">{profile.bio.substring(0, 50)}...</p>

            {/* Profile Image */}
            <img
              src={profile.profileImage}
              alt={profile.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />

            {/* Popularity */}
            <p className="text-gray-600 mb-2">
              <strong>Popularity:</strong> {profile.popularity}/10
            </p>

            {/* Interests and Skills */}
            <p className="text-gray-600 mb-2">
              <strong>Interests:</strong> {profile.interests.join(', ') || 'Not specified'}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Skills:</strong> {profile.skills.join(', ') || 'Not specified'}
            </p>

            {/* Contact Information and Experience */}
            <p className="text-gray-600 mb-2">
              <strong>Contact Info:</strong> {profile.contactInfo || 'Not provided'}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Experience:</strong> {profile.experience || 'Not specified'}
            </p>

            {/* Tattoo Styles and Portfolio */}
            <p className="text-gray-600 mb-2">
              <strong>Tattoo Styles:</strong> {profile.tattooStyles.join(', ') || 'None'}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Portfolio:</strong>{' '}
              {profile.portfolio.length > 0
                ? profile.portfolio.map((url, index) => (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {index === 0 ? 'View Portfolio' : ', More'}
                    </a>
                  ))
                : 'No portfolio links'}
            </p>

            {/* Certifications and Tags */}
            <p className="text-gray-600 mb-2">
              <strong>Certifications:</strong> {profile.certifications.join(', ') || 'None'}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Tags:</strong> {profile.tags.join(', ') || 'Not specified'}
            </p>

            {/* Social Media Links */}
            <div className="flex flex-col mb-2">
              <strong className="text-gray-600 mb-1">Social Media Links:</strong>
              <div className="flex space-x-2">
                {profile.socialMediaLinks.tiktok && (
                  <a
                    href={profile.socialMediaLinks.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-500 hover:underline"
                  >
                    TikTok
                  </a>
                )}
                {profile.socialMediaLinks.instagram && (
                  <a
                    href={profile.socialMediaLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:underline"
                  >
                    Instagram
                  </a>
                )}
                {profile.socialMediaLinks.facebook && (
                  <a
                    href={profile.socialMediaLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Facebook
                  </a>
                )}
                {profile.socialMediaLinks.x && (
                  <a
                    href={profile.socialMediaLinks.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:underline"
                  >
                    X
                  </a>
                )}
              </div>
            </div>

            {/* Languages and Availability */}
            <p className="text-gray-600 mb-2">
              <strong>Languages:</strong> {profile.languagesSpoken.join(', ') || 'Not specified'}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Availability:</strong> {profile.availability || 'Not specified'}
            </p>

            {/* Pricing and Safety Protocols */}
            <p className="text-gray-600 mb-2">
              <strong>Pricing:</strong> {profile.pricing || 'Not specified'}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Safety Protocols:</strong> {profile.safetyProtocols || 'None'}
            </p>

            {/* Awards and Artwork */}
            <p className="text-gray-600 mb-2">
              <strong>Awards:</strong> {profile.awards.join(', ') || 'No awards listed'}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Artwork:</strong>{' '}
              {profile.artwork.length > 0
                ? profile.artwork.map((url, index) => (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {index === 0 ? 'View Artwork' : ', More'}
                    </a>
                  ))
                : 'No artwork links'}
            </p>

            {/* Origin (City and Country) */}
            <p className="text-gray-600 mb-2">
              <strong>Origin:</strong> {profile.origin?.city || 'Unknown City'}, {profile.origin?.country || 'Unknown Country'}
            </p>

            {/* Action Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleProfileClick(profile)}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProfile(profile._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProfiles;

