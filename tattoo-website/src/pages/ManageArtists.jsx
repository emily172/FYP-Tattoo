import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageArtists() {
  const [artists, setArtists] = useState([]);
  const [formData, setFormData] = useState({ name: '', bio: '', avatar: '', style: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [error, setError] = useState('');

  // Fetch artists when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    axios
      .get('http://localhost:5000/artists', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setArtists(response.data))
      .catch((err) => setError('Failed to fetch artists.'));
  }, []);

  // Handle form submission for Create or Update
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const headers = { Authorization: `Bearer ${token}` };

    if (isEditing) {
      axios
        .put(`http://localhost:5000/artists/${currentId}`, formData, { headers })
        .then((response) => {
          setArtists((prev) =>
            prev.map((artist) => (artist._id === currentId ? response.data : artist))
          );
          resetForm();
        })
        .catch((err) => setError('Failed to update artist.'));
    } else {
      axios
        .post('http://localhost:5000/artists', formData, { headers })
        .then((response) => {
          setArtists((prev) => [...prev, response.data]);
          resetForm();
        })
        .catch((err) => setError('Failed to create artist.'));
    }
  };

  // Handle deletion of an artist
  const handleDelete = (id) => {
    console.log('Deleting Artist ID:', id); // Add this for debugging
    const token = localStorage.getItem('adminToken');
    axios
      .delete(`http://localhost:5000/artists/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setArtists((prev) => prev.filter((artist) => artist._id !== id)))
      .catch((err) => console.error('Error deleting artist:', err));
  };
  

  // Handle editing an artist
  const handleEdit = (artist) => {
    setFormData({ name: artist.name, bio: artist.bio, avatar: artist.avatar, style: artist.style });
    setIsEditing(true);
    setCurrentId(artist._id);
  };

  // Reset the form state
  const resetForm = () => {
    setFormData({ name: '', bio: '', avatar: '', style: '' });
    setIsEditing(false);
    setCurrentId(null);
    setError('');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Artists</h1>
      <form onSubmit={handleFormSubmit} className="bg-white p-4 rounded shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Artist' : 'Create New Artist'}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <textarea
          placeholder="Bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="url"
          placeholder="Avatar URL"
          value={formData.avatar}
          onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="text"
          placeholder="Style"
          value={formData.style}
          onChange={(e) => setFormData({ ...formData, style: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 rounded w-full hover:bg-indigo-600"
        >
          {isEditing ? 'Update Artist' : 'Create Artist'}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 text-white py-2 rounded w-full hover:bg-gray-600 mt-2"
          >
            Cancel Edit
          </button>
        )}
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <div key={artist._id} className="bg-white rounded-md shadow-md p-4">
            <img src={artist.avatar} alt={artist.name} className="w-full h-40 object-cover mb-4 rounded-md" />
            <h2 className="text-lg font-bold">{artist.name}</h2>
            <p>{artist.bio}</p>
            <p>Style: {artist.style}</p>
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                onClick={() => handleEdit(artist)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleDelete(artist._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageArtists;
