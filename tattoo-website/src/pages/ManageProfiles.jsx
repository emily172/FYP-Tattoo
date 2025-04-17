import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [newProfile, setNewProfile] = useState({
    name: '',
    age: '',
    bio: '',
    profileImage: '',
    interests: [],
    skills: [],
    contactInfo: '',
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

    // Validate input
    if (!newProfile.name || !newProfile.age || !newProfile.bio || !newProfile.profileImage) {
      setError('All fields are required.');
      return;
    }

    axios
      .post('http://localhost:5000/profiles', newProfile)
      .then((response) => {
        setProfiles([response.data, ...profiles]); // Add to the list
        setNewProfile({
          name: '',
          age: '',
          bio: '',
          profileImage: '',
          interests: [],
          skills: [],
          contactInfo: '',
        }); // Reset form
        setError('');
      })
      .catch((err) => {
        console.error('Error adding profile:', err);
        setError('Failed to add profile.');
      });
  };

  const handleEditProfile = (e) => {
    e.preventDefault();

    // Validate input
    if (!selectedProfile.name || !selectedProfile.age || !selectedProfile.bio || !selectedProfile.profileImage) {
      setError('All fields are required.');
      return;
    }

    axios
      .put(`http://localhost:5000/profiles/${selectedProfile._id}`, selectedProfile) // Update existing profile
      .then((response) => {
        setProfiles(
          profiles.map((profile) => (profile._id === response.data._id ? response.data : profile))
        ); // Update the list
        setSelectedProfile(null); // Exit edit mode
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
        await axios.delete(`http://localhost:5000/profiles/${id}`); // Delete profile
        setProfiles(profiles.filter((profile) => profile._id !== id)); // Remove from list
      } catch (err) {
        console.error('Error deleting profile:', err);
        setError('Failed to delete profile.');
      }
    }
  };

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile); // Enable edit mode
  };

  const closeModal = () => {
    setSelectedProfile(null); // Exit edit mode
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Profiles</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Add/Edit Form */}
      <form
        onSubmit={(e) => (selectedProfile ? handleEditProfile(e) : handleAddProfile(e))}
        className="mb-8 border p-4 rounded bg-white shadow-md"
      >
        <h2 className="text-xl font-bold mb-4">
          {selectedProfile ? 'Edit Profile' : 'Add New Profile'}
        </h2>
        <input
          type="text"
          name="name"
          value={selectedProfile ? selectedProfile.name : newProfile.name}
          onChange={(e) =>
            selectedProfile
              ? setSelectedProfile({ ...selectedProfile, name: e.target.value })
              : setNewProfile({ ...newProfile, name: e.target.value })
          }
          placeholder="Profile Name"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="number"
          name="age"
          value={selectedProfile ? selectedProfile.age : newProfile.age}
          onChange={(e) =>
            selectedProfile
              ? setSelectedProfile({ ...selectedProfile, age: e.target.value })
              : setNewProfile({ ...newProfile, age: e.target.value })
          }
          placeholder="Age"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <textarea
          name="bio"
          value={selectedProfile ? selectedProfile.bio : newProfile.bio}
          onChange={(e) =>
            selectedProfile
              ? setSelectedProfile({ ...selectedProfile, bio: e.target.value })
              : setNewProfile({ ...newProfile, bio: e.target.value })
          }
          placeholder="Biography"
          className="w-full p-2 border rounded mb-4"
          rows="3"
          required
        />
        <input
          type="url"
          name="profileImage"
          value={selectedProfile ? selectedProfile.profileImage : newProfile.profileImage}
          onChange={(e) =>
            selectedProfile
              ? setSelectedProfile({ ...selectedProfile, profileImage: e.target.value })
              : setNewProfile({ ...newProfile, profileImage: e.target.value })
          }
          placeholder="Profile Image URL"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <textarea
          name="interests"
          value={selectedProfile ? selectedProfile.interests.join('\n') : newProfile.interests.join('\n')}
          onChange={(e) =>
            selectedProfile
              ? setSelectedProfile({ ...selectedProfile, interests: e.target.value.split('\n') })
              : setNewProfile({ ...newProfile, interests: e.target.value.split('\n') })
          }
          placeholder="Interests (one per line)"
          className="w-full p-2 border rounded mb-4"
        />
        <textarea
          name="skills"
          value={selectedProfile ? selectedProfile.skills.join('\n') : newProfile.skills.join('\n')}
          onChange={(e) =>
            selectedProfile
              ? setSelectedProfile({ ...selectedProfile, skills: e.target.value.split('\n') })
              : setNewProfile({ ...newProfile, skills: e.target.value.split('\n') })
          }
          placeholder="Skills (one per line)"
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          name="contactInfo"
          value={selectedProfile ? selectedProfile.contactInfo : newProfile.contactInfo}
          onChange={(e) =>
            selectedProfile
              ? setSelectedProfile({ ...selectedProfile, contactInfo: e.target.value })
              : setNewProfile({ ...newProfile, contactInfo: e.target.value })
          }
          placeholder="Contact Information"
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className={`bg-${selectedProfile ? 'blue' : 'green'}-500 text-white px-4 py-2 rounded hover:bg-${selectedProfile ? 'blue' : 'green'}-600`}
        >
          {selectedProfile ? 'Update Profile' : 'Add Profile'}
        </button>
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
                onClick={() => setSelectedProfile(profile)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
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
