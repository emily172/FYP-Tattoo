import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const { id } = useParams(); // Capture the profile ID from the URL
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/profiles/${id}`) // Fetch the selected profile details
      .then((response) => setProfile(response.data))
      .catch((err) => {
        console.error('Error fetching profile:', err);
        setError(true);
      });
  }, [id]);

  if (error) return <p className="text-red-500">Error loading profile details. Please try again later.</p>;
  if (!profile) return <p>Loading profile details...</p>;

  return (
    <div className="p-8">
      {/* Main Profile Information */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{profile.name}</h1>
        <img
          src={profile.profileImage}
          alt={profile.name}
          className="w-full h-80 object-cover rounded-lg"
        />
      </div>

      {/* About the Profile */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">About {profile.name}</h2>
        <p className="text-gray-700 text-lg">{profile.bio}</p>
      </section>

      {/* Interests */}
      {profile.interests && profile.interests.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Interests</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg">
            {profile.interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills */}
      {profile.skills && profile.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg">
            {profile.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Contact Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        <p className="text-gray-700 text-lg">{profile.contactInfo}</p>
      </section>
    </div>
  );
};

export default ProfilePage;
