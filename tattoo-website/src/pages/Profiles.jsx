import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/profiles') // Fetch all profiles
      .then((response) => setProfiles(response.data))
      .catch((err) => console.error('Error fetching profiles:', err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Profiles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <Link to={`/profiles/${profile._id}`} key={profile._id} className="bg-white rounded-md shadow-md p-4 text-center hover:bg-gray-100 cursor-pointer">
            <img
              src={profile.profileImage}
              alt={profile.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold">{profile.name}</h3>
            <p className="text-gray-500">{profile.bio.substring(0, 100)}...</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profiles;
