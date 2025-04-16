import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageTattooStyles = () => {
  const [styles, setStyles] = useState([]);
  const [newStyle, setNewStyle] = useState({ name: '', description: '', image: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/tattoo-styles')
      .then((response) => setStyles(response.data))
      .catch((err) => console.error('Error fetching tattoo styles:', err));
  }, []);

  const handleAddStyle = (e) => {
    e.preventDefault();

    // Validate input
    if (!newStyle.name || !newStyle.description || !newStyle.image) {
      setError('All fields are required.');
      return;
    }
    if (!newStyle.image.startsWith('http')) {
      setError('Invalid image URL.');
      return;
    }

    console.log('Payload being sent:', newStyle);

    axios
      .post('http://localhost:5000/tattoo-styles', newStyle)
      .then((response) => {
        console.log('Response from server:', response.data);
        setStyles([response.data, ...styles]);
        setNewStyle({ name: '', description: '', image: '' }); // Reset form
        setError('');
      })
      .catch((err) => {
        console.error('Error adding style:', err);
        setError('Failed to add tattoo style. Please try again.');
      });
  };

  const deleteStyle = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tattoo-styles/${id}`);
      setStyles(styles.filter((style) => style._id !== id)); // Update UI
    } catch (err) {
      console.error('Error deleting style:', err);
      setError('Failed to delete tattoo style.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Tattoo Styles</h1>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Add Form */}
      <form onSubmit={handleAddStyle} className="mb-8 border p-4 rounded bg-white shadow-md">
        <h2 className="text-xl font-bold mb-4">Add New Style</h2>
        <input
          type="text"
          name="name"
          value={newStyle.name}
          onChange={(e) => setNewStyle({ ...newStyle, name: e.target.value })}
          placeholder="Style Name"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <textarea
          name="description"
          value={newStyle.description}
          onChange={(e) => setNewStyle({ ...newStyle, description: e.target.value })}
          placeholder="Description"
          className="w-full p-2 border rounded mb-4"
          rows="3"
          required
        />
        <input
          type="url"
          name="image"
          value={newStyle.image}
          onChange={(e) => setNewStyle({ ...newStyle, image: e.target.value })}
          placeholder="Image URL"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Style
        </button>
      </form>

      {/* Styles List */}
      {styles.map((style) => (
        <div key={style._id} className="border p-4 rounded mb-4">
          <h3 className="text-lg font-bold">{style.name}</h3>
          <p className="text-gray-500">{style.description}</p>
          <img src={style.image} alt={style.name} className="w-full h-40 object-cover rounded-md mb-4" />
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => deleteStyle(style._id)}
          >
            Delete Style
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageTattooStyles;
