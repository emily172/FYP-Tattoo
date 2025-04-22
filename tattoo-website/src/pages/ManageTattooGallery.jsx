import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageTattooGallery = () => {
  const [tattoos, setTattoos] = useState([]);
  const [newTattoo, setNewTattoo] = useState({
    title: '',
    imageUrl: '',
    description: '',
    tattooStyle: '',
    bodyLocation: '',
    createdBy: '',
  });
  const [selectedTattoo, setSelectedTattoo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/tattoo-gallery')
      .then((response) => setTattoos(response.data))
      .catch((err) => {
        console.error('Error fetching tattoo gallery:', err.message);
        setError('Failed to load tattoo gallery.');
      });
  }, []);

  const handleAddTattoo = (e) => {
    e.preventDefault();

    if (!newTattoo.title || !newTattoo.imageUrl) {
      console.error('Validation Error: Title and Image URL are required.');
      setError('Title and Image URL are required.');
      return;
    }

    console.log('Payload being sent to backend:', newTattoo);

    axios
      .post('http://localhost:5000/tattoo-gallery', newTattoo)
      .then((response) => {
        console.log('Response from backend:', response.data);
        setTattoos([response.data, ...tattoos]);
        setNewTattoo({
          title: '',
          imageUrl: '',
          description: '',
          tattooStyle: '',
          bodyLocation: '',
          createdBy: '',
        });
        setError('');
      })
      .catch((err) => {
        console.error('Error adding tattoo image:', err.response?.data || err.message);
        setError(err.response?.data?.error || 'Failed to add tattoo image.');
      });
  };

  const handleEditTattoo = (e) => {
    e.preventDefault();

    if (!selectedTattoo.title || !selectedTattoo.imageUrl) {
      console.error('Validation Error: Title and Image URL are required.');
      setError('Title and Image URL are required.');
      return;
    }

    console.log('Payload being sent to backend for edit:', selectedTattoo);

    axios
      .put(`http://localhost:5000/tattoo-gallery/${selectedTattoo._id}`, selectedTattoo)
      .then((response) => {
        console.log('Response from backend:', response.data);
        setTattoos(
          tattoos.map((tattoo) =>
            tattoo._id === response.data._id ? response.data : tattoo
          )
        );
        setSelectedTattoo(null);
        setError('');
      })
      .catch((err) => {
        console.error('Error editing tattoo image:', err.response?.data || err.message);
        setError(err.response?.data?.error || 'Failed to edit tattoo image.');
      });
  };

  const deleteTattoo = (id) => {
    if (window.confirm('Are you sure you want to delete this tattoo?')) {
      console.log('Attempting to delete tattoo with ID:', id);

      axios
        .delete(`http://localhost:5000/tattoo-gallery/${id}`)
        .then(() => {
          console.log('Successfully deleted tattoo');
          setTattoos(tattoos.filter((tattoo) => tattoo._id !== id));
        })
        .catch((err) => {
          console.error('Error deleting tattoo image:', err.message);
          setError('Failed to delete tattoo image.');
        });
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Tattoo Gallery</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Add Tattoo Form */}
      <form onSubmit={handleAddTattoo} className="mb-8 border p-4 rounded bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Tattoo</h2>
        <input
          type="text"
          name="title"
          value={newTattoo.title}
          onChange={(e) => setNewTattoo({ ...newTattoo, title: e.target.value })}
          placeholder="Tattoo Title"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="url"
          name="imageUrl"
          value={newTattoo.imageUrl}
          onChange={(e) => setNewTattoo({ ...newTattoo, imageUrl: e.target.value })}
          placeholder="Image URL"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <textarea
          name="description"
          value={newTattoo.description}
          onChange={(e) => setNewTattoo({ ...newTattoo, description: e.target.value })}
          placeholder="Description"
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          name="tattooStyle"
          value={newTattoo.tattooStyle}
          onChange={(e) => setNewTattoo({ ...newTattoo, tattooStyle: e.target.value })}
          placeholder="Tattoo Style"
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          name="bodyLocation"
          value={newTattoo.bodyLocation}
          onChange={(e) => setNewTattoo({ ...newTattoo, bodyLocation: e.target.value })}
          placeholder="Body Location"
          className="w-full p-2 border rounded mb-4"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Tattoo
        </button>
      </form>

      {/* Tattoo List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tattoos.map((tattoo) => (
          <div key={tattoo._id} className="border p-4 rounded shadow-md">
            <h3 className="text-lg font-bold">{tattoo.title}</h3>
            <img
              src={tattoo.imageUrl}
              alt={tattoo.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <p className="text-gray-700">{tattoo.description}</p>
            <p className="text-gray-700">
              <span className="font-bold">Style:</span> {tattoo.tattooStyle || 'N/A'}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Body Location:</span> {tattoo.bodyLocation || 'N/A'}
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setSelectedTattoo(tattoo)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTattoo(tattoo._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Tattoo Modal */}
      {selectedTattoo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Edit Tattoo</h2>
            <form onSubmit={handleEditTattoo}>
              <input
                type="text"
                name="title"
                value={selectedTattoo.title}
                onChange={(e) =>
                  setSelectedTattoo({ ...selectedTattoo, title: e.target.value })
                }
                placeholder="Tattoo Title"
                className="w-full p-2 border rounded mb-4"
                required
              />
              <input
                type="url"
                name="imageUrl"
                value={selectedTattoo.imageUrl}
                onChange={(e) =>
                  setSelectedTattoo({ ...selectedTattoo, imageUrl: e.target.value })
                }
                placeholder="Image URL"
                className="w-full p-2 border rounded mb-4"
                required
              />
              <textarea
                name="description"
                value={selectedTattoo.description}
                onChange={(e) =>
                  setSelectedTattoo({ ...selectedTattoo, description: e.target.value })
                }
                placeholder="Description"
                className="w-full p-2 border rounded mb-4"
              />
              <input
                type="text"
                name="tattooStyle"
                value={selectedTattoo.tattooStyle}
                onChange={(e) =>
                  setSelectedTattoo({ ...selectedTattoo, tattooStyle: e.target.value })
                }
                placeholder="Tattoo Style"
                className="w-full p-2 border rounded mb-4"
              />
              <input
                type="text"
                name="bodyLocation"
                value={selectedTattoo.bodyLocation}
                onChange={(e) =>
                  setSelectedTattoo({ ...selectedTattoo, bodyLocation: e.target.value })
                }
                placeholder="Body Location"
                className="w-full p-2 border rounded mb-4"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTattoo(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTattooGallery;
