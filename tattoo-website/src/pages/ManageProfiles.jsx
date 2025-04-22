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
  const [selectedProfile, setSelectedProfile] = useState(null); // For edit mode
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/profiles') // Fetch all profiles
      .then((response) => setProfiles(response.data))
      .catch((err) => console.error('Error fetching profiles:', err));
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
      .catch((err) => {
        console.error('Error adding profile:', err);
        setError('Failed to add profile.');
      });
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
      .catch((err) => {
        console.error('Error updating profile:', err);
        setError('Failed to update profile.');
      });
  };

  const deleteProfile = async (id) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      try {
        await axios.delete(`http://localhost:5000/profiles/${id}`);
        setProfiles(profiles.filter((profile) => profile._id !== id));
      } catch (err) {
        console.error('Error deleting profile:', err);
        setError('Failed to delete profile.');
      }
    }
  };

  const handleInputChange = (e, field, isNestedField = false) => {
    const { name, value } = e.target;

    if (isNestedField) {
      if (selectedProfile) {
        setSelectedProfile((prev) => ({
          ...prev,
          [field]: { ...prev[field], [name]: value },
        }));
      } else {
        setNewProfile((prev) => ({
          ...prev,
          [field]: { ...prev[field], [name]: value },
        }));
      }
    } else {
      if (selectedProfile) {
        setSelectedProfile((prev) => ({
          ...prev,
          [field]: Array.isArray(prev[field]) ? value.split(', ') : value,
        }));
      } else {
        setNewProfile((prev) => ({
          ...prev,
          [field]: Array.isArray(prev[field]) ? value.split(', ') : value,
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

  const closeModal = () => {
    resetForm();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Profiles</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form
        onSubmit={(e) => (selectedProfile ? handleEditProfile(e) : handleAddProfile(e))}
        className="mb-8 border p-4 rounded bg-white shadow-md"
      >
        <h2 className="text-xl font-bold mb-4">
          {selectedProfile ? 'Edit Profile' : 'Add New Profile'}
        </h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          value={selectedProfile ? selectedProfile.name : newProfile.name}
          onChange={(e) => handleInputChange(e, 'name')}
          placeholder="Profile Name"
          className="w-full p-2 border rounded mb-4"
          required
        />

        {/* Bio */}
        <textarea
          name="bio"
          value={selectedProfile ? selectedProfile.bio : newProfile.bio}
          onChange={(e) => handleInputChange(e, 'bio')}
          placeholder="Biography"
          className="w-full p-2 border rounded mb-4"
          rows="3"
          required
        />

        {/* Profile Image */}
        <input
          type="url"
          name="profileImage"
          value={selectedProfile ? selectedProfile.profileImage : newProfile.profileImage}
          onChange={(e) => handleInputChange(e, 'profileImage')}
          placeholder="Profile Image URL"
          className="w-full p-2 border rounded mb-4"
          required
        />

        {/* Popularity */}
        <input
          type="number"
          name="popularity"
          value={selectedProfile ? selectedProfile.popularity : newProfile.popularity}
          onChange={(e) => handleInputChange(e, 'popularity')}
          placeholder="Popularity (0-10)"
          className="w-full p-2 border rounded mb-4"
        />

        {/* Interests */}
        <textarea
          name="interests"
          value={selectedProfile ? selectedProfile.interests.join(', ') : newProfile.interests.join(', ')}
          onChange={(e) =>
            handleInputChange(
              { target: { name: 'interests', value: e.target.value.split(', ') } },
              'interests'
            )
          }
          placeholder="Interests (comma-separated)"
          className="w-full p-2 border rounded mb-4"
        />

        {/* Skills */}
        <textarea
          name="skills"
          value={selectedProfile ? selectedProfile.skills.join(', ') : newProfile.skills.join(', ')}
          onChange={(e) =>
            handleInputChange(
              { target: { name: 'skills', value: e.target.value.split(', ') } },
              'skills'
            )
          }
          placeholder="Skills (comma-separated)"
          className="w-full p-2 border rounded mb-4"
        />

        {/* Contact Information */}
        <input
          type="text"
          name="contactInfo"
          value={selectedProfile ? selectedProfile.contactInfo : newProfile.contactInfo}
          onChange={(e) => handleInputChange(e, 'contactInfo')}
          placeholder="Contact Information"
          className="w-full p-2 border rounded mb-4"
        />

        {/* Experience */}
        <input
          type="text"
          name="experience"
          value={selectedProfile ? selectedProfile.experience : newProfile.experience}
          onChange={(e) => handleInputChange(e, 'experience')}
          placeholder="Years of Experience"
          className="w-full p-2 border rounded mb-4"
        />

        {/* Tattoo Styles */}
        <textarea
          name="tattooStyles"
          value={selectedProfile ? selectedProfile.tattooStyles.join(', ') : newProfile.tattooStyles.join(', ')}
          onChange={(e) =>
            handleInputChange(
              { target: { name: 'tattooStyles', value: e.target.value.split(', ') } },
              'tattooStyles'
            )
          }
          placeholder="Tattoo Styles (comma-separated)"
          className="w-full p-2 border rounded mb-4"
        />

        {/* Portfolio */}
        <textarea
          name="portfolio"
          value={selectedProfile ? selectedProfile.portfolio.join(', ') : newProfile.portfolio.join(', ')}
          onChange={(e) =>
            handleInputChange(
              { target: { name: 'portfolio', value: e.target.value.split(', ') } },
              'portfolio'
            )
          }
          placeholder="Portfolio URLs (comma-separated)"
          className="w-full p-2 border rounded mb-4"
        />

        {/* Certifications */}
        <textarea
          name="certifications"
          value={
            selectedProfile
              ? selectedProfile.certifications.join(', ')
              : newProfile.certifications.join(', ')
          }
          onChange={(e) =>
            handleInputChange(
              { target: { name: 'certifications', value: e.target.value.split(', ') } },
              'certifications'
            )
          }
          placeholder="Certifications (comma-separated)"
          className="w-full p-2 border rounded mb-4"
        />

        {/* Tags */}
        <textarea
          name="tags"
          value={selectedProfile ? selectedProfile.tags.join(', ') : newProfile.tags.join(', ')}
          onChange={(e) =>
            handleInputChange(
              { target: { name: 'tags', value: e.target.value.split(', ') } },
              'tags'
            )
          }
          placeholder="Tags (comma-separated)"
          className="w-full p-2 border rounded mb-4"
        />

        {/* Social Media Links */}
        <div className="mb-4">
          <h3 className="text-lg font-bold">Social Media Links</h3>
          {['tiktok', 'instagram', 'facebook', 'x'].map((platform) => (
            <input
              key={platform}
              type="url"
              name={platform}
              value={
                selectedProfile
                  ? selectedProfile.socialMediaLinks[platform]
                  : newProfile.socialMediaLinks[platform]
              }
              onChange={(e) => handleInputChange(e, 'socialMediaLinks', true)}
              placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
              className="w-full p-2 border rounded mb-2"
            />
          ))}
        </div>

        {/* Languages Spoken */}
        <textarea
          name="languagesSpoken"
          value={
            selectedProfile
              ? selectedProfile.languagesSpoken.join(', ')
              : newProfile.languagesSpoken.join(', ')
          }
          onChange={(e) =>
            handleInputChange(
              { target: { name: 'languagesSpoken', value: e.target.value.split(', ') } },
              'languagesSpoken'
            )
          }
          placeholder="Languages Spoken (comma-separated)"
          className="w-full p-2 border rounded mb-4"
        />

        {/* Availability */}
        <input
          type="text"
          name="availability"
          value={selectedProfile ? selectedProfile.availability : newProfile.availability}
          onChange={(e) => handleInputChange(e, 'availability')}
          placeholder="Availability"
          className="w-full p-2 border rounded mb-4"
        />

        {/* Pricing */}
        <input
          type="text"
          name="pricing"
          value={selectedProfile ? selectedProfile.pricing : newProfile.pricing}
          onChange={(e) => handleInputChange(e, 'pricing')}
          placeholder="Pricing Details"
          className="w-full p-2 border rounded mb-4"
        />

        {/* Safety Protocols */}
        <textarea
          name="safetyProtocols"
          value={selectedProfile ? selectedProfile.safetyProtocols : newProfile.safetyProtocols}
          onChange={(e) => handleInputChange(e, 'safetyProtocols')}
          placeholder="Safety Protocols"
          className="w-full p-2 border rounded mb-4"
        />

        {/* Awards */}
        <textarea
          name="awards"
          value={selectedProfile ? selectedProfile.awards.join(', ') : newProfile.awards.join(', ')}
          onChange={(e) =>
            handleInputChange(
              { target: { name: 'awards', value: e.target.value.split(', ') } },
              'awards'
            )
          }
          placeholder="Awards (comma-separated)"
          className="w-full p-2 border rounded mb-4"
        />

        {/* Artwork */}
        <textarea
          name="artwork"
          value={selectedProfile ? selectedProfile.artwork.join(', ') : newProfile.artwork.join(', ')}
          onChange={(e) =>
            handleInputChange(
              { target: { name: 'artwork', value: e.target.value.split(', ') } },
              'artwork'
            )
          }
          placeholder="Artwork URLs (comma-separated)"
          className="w-full p-2 border rounded mb-4"
        />

        {/* Origin */}
        <div className="mb-4">
          <h3 className="text-lg font-bold">Origin</h3>
          <input
            type="text"
            name="city"
            value={selectedProfile ? selectedProfile.origin.city : newProfile.origin.city}
            onChange={(e) => handleInputChange(e, 'origin', true)}
            placeholder="City"
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="text"
            name="country"
            value={selectedProfile ? selectedProfile.origin.country : newProfile.origin.country}
            onChange={(e) => handleInputChange(e, 'origin', true)}
            placeholder="Country"
            className="w-full p-2 border rounded mb-4"
          />
        </div>

        {/* Submit and Cancel Buttons */}
        <button
          type="submit"
          className={`bg-${selectedProfile ? 'blue' : 'green'}-500 text-white px-4 py-2 rounded hover:bg-${
            selectedProfile ? 'blue' : 'green'
          }-600`}
        >
          {selectedProfile ? 'Update Profile' : 'Add Profile'}
        </button>
        {selectedProfile && (
          <button
            type="button"
            onClick={closeModal}
            className="bg-red-500 text-white px-4 py-2 rounded ml-4 hover:bg-red-600"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Profiles List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <div key={profile._id} className="border p-4 rounded shadow-md">
            <h3 className="text-lg font-bold">{profile.name}</h3>
            <p className="text-gray-500">{profile.bio.substring(0, 50)}...</p>
            <img
              src={profile.profileImage}
              alt={profile.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={() => handleProfileClick(profile)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
