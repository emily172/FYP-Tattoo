import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageGallery() {
  const [tattoos, setTattoos] = useState([]);
  const [formData, setFormData] = useState({ name: '', image: '', style: '', popularity: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [error, setError] = useState('');

  // Fetch tattoos from the backend
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    axios
      .get('http://localhost:5000/tattoos', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setTattoos(response.data))
      .catch((err) => setError('Failed to fetch tattoos.'));
  }, []);

  // Handle form submission for Create or Update
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const headers = { Authorization: `Bearer ${token}` };

    if (isEditing) {
      axios
        .put(`http://localhost:5000/tattoos/${currentId}`, formData, { headers })
        .then((response) => {
          setTattoos((prev) =>
            prev.map((tattoo) => (tattoo._id === currentId ? response.data : tattoo))
          );
          resetForm();
        })
        .catch((err) => setError('Failed to update tattoo.'));
    } else {
      axios
        .post('http://localhost:5000/tattoos', formData, { headers })
        .then((response) => {
          setTattoos((prev) => [...prev, response.data]);
          resetForm();
        })
        .catch((err) => setError('Failed to create tattoo.'));
    }
  };

  // Handle deletion of a tattoo
  const handleDelete = (id) => {
    const token = localStorage.getItem('adminToken');
    axios
      .delete(`http://localhost:5000/tattoos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setTattoos((prev) => prev.filter((tattoo) => tattoo._id !== id)))
      .catch((err) => setError('Failed to delete tattoo.'));
  };

  // Handle editing a tattoo
  const handleEdit = (tattoo) => {
    setFormData({
      name: tattoo.name,
      image: tattoo.image,
      style: tattoo.style,
      popularity: tattoo.popularity,
    });
    setIsEditing(true);
    setCurrentId(tattoo._id);
  };

  // Reset the form state
  const resetForm = () => {
    setFormData({ name: '', image: '', style: '', popularity: '' });
    setIsEditing(false);
    setCurrentId(null);
    setError('');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Gallery</h1>
      <form onSubmit={handleFormSubmit} className="bg-white p-4 rounded shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Tattoo' : 'Create New Tattoo'}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="url"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
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
        <input
          type="number"
          placeholder="Popularity"
          value={formData.popularity}
          onChange={(e) => setFormData({ ...formData, popularity: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 rounded w-full hover:bg-indigo-600"
        >
          {isEditing ? 'Update Tattoo' : 'Create Tattoo'}
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
        {tattoos.map((tattoo) => (
          <div key={tattoo._id} className="bg-white rounded-md shadow-md p-4">
            <img src={tattoo.image} alt={tattoo.name} className="w-full h-40 object-cover mb-4 rounded-md" />
            <h2 className="text-lg font-bold">{tattoo.name}</h2>
            <p>Style: {tattoo.style}</p>
            <p>Popularity: {tattoo.popularity}</p>
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                onClick={() => handleEdit(tattoo)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleDelete(tattoo._id)}
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

export default ManageGallery;
