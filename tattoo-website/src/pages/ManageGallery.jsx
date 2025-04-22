import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageGallery() {
  const [tattoos, setTattoos] = useState([]);
  const [formData, setFormData] = useState({ name: '', image: '', style: '', popularity: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [error, setError] = useState('');
  const [totalCreated, setTotalCreated] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch tattoos from the backend
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    axios
      .get('http://localhost:5000/tattoos', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setTattoos(response.data);
        setTotalCreated(response.data.length); // Initialize total tattoos count
      })
      .catch(() => setError('Failed to fetch tattoos.'));
  }, []);

  // Handle form submission for Create or Update
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    const headers = { Authorization: `Bearer ${token}` };

    try {
      if (isEditing) {
        const response = await axios.put(`http://localhost:5000/tattoos/${currentId}`, formData, { headers });
        setTattoos((prev) =>
          prev.map((tattoo) => (tattoo._id === currentId ? response.data : tattoo))
        );
        resetForm();
      } else {
        const response = await axios.post('http://localhost:5000/tattoos', formData, { headers });
        setTattoos((prev) => [response.data, ...prev]);
        setTotalCreated((prevCount) => prevCount + 1);
        resetForm();
      }
    } catch {
      setError('Failed to save tattoo.');
    } finally {
      setLoading(false);
    }
  };

  // Open Delete Modal
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  // Handle deletion of a tattoo
  const confirmDelete = async () => {
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`http://localhost:5000/tattoos/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTattoos((prev) => prev.filter((tattoo) => tattoo._id !== deleteId));
    } catch {
      setError('Failed to delete tattoo.');
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  // Close Delete Modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteId(null);
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

  // Escape Key Functionality
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDeleteModalOpen) {
        closeDeleteModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isDeleteModalOpen, closeDeleteModal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 p-8">
      {/* Hero Section */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-purple-800 drop-shadow-lg animate-fade-in">
          Tattoo Management Portal
        </h1>
        <p className="text-lg text-gray-700 mt-2 animate-slide-in">
          Create, edit, and organize your tattoo gallery in a visually stunning way.
        </p>
      </header>

      {error && (
        <div className="text-red-600 bg-red-100 border border-red-400 px-4 py-3 rounded shadow-md mb-6">
          {error}
        </div>
      )}

      {/* Real-Time Counter */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
        <p className="text-gray-600 font-medium">
          Total Tattoos: <span className="font-bold text-purple-600">{totalCreated}</span>
        </p>
        <p className="text-gray-600 font-medium">
          Currently Editing: <span className="font-bold text-purple-600">{isEditing ? 'Yes' : 'No'}</span>
        </p>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form Card */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {isEditing ? 'Edit Tattoo' : 'Create New Tattoo'}
          </h2>
          {loading && (
            <div className="absolute inset-0 bg-gray-100 bg-opacity-80 flex items-center justify-center">
              <div className="spinner-grow text-purple-500 h-12 w-12"></div>
            </div>
          )}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="url"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="text"
              placeholder="Style"
              value={formData.style}
              onChange={(e) => setFormData({ ...formData, style: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="number"
              placeholder="Popularity"
              value={formData.popularity}
              onChange={(e) => setFormData({ ...formData, popularity: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-gradient-to-br from-purple-500 to-purple-700 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform"
              >
                {isEditing ? 'Update' : 'Create'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Gallery */}
        <div className="flex-2 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tattoo Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-gallery">
            {tattoos.map((tattoo) => (
              <div
                key={tattoo._id}
                className="bg-gray-100 rounded-lg p-4 shadow-lg hover:scale-105 transition-transform hover:shadow-xl"
              >
                <img
                  src={tattoo.image}
                  alt={tattoo.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-800">{tattoo.name}</h3>
                <p className="text-gray-600">Style: {tattoo.style}</p>
                <p className="text-gray-600">Popularity: {tattoo.popularity}</p>
                <div className="flex space-x-3 mt-3">
                  <button
                    className="bg-purple-500 text-white px-3 py-2 rounded-lg hover:bg-purple-600 transition"
                    onClick={() => handleEdit(tattoo)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                    onClick={() => openDeleteModal(tattoo._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div>
          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={closeDeleteModal} // Close modal when clicking outside
          ></div>
          
          {/* Modal Dialog */}
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-description"
          >
            <div
              className="bg-white rounded-lg shadow-lg p-6 space-y-6 max-w-md w-full relative animate-slide-in"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
              {/* Warning Icon */}
              <div className="flex items-center justify-center text-red-500">
                <span className="material-icons text-5xl animate-pulse">warning</span>
              </div>
              
              {/* Modal Title */}
              <h2 id="delete-modal-title" className="text-lg font-bold text-gray-800 text-center">
                Are You Sure?
              </h2>
              
              {/* Modal Description */}
              <p id="delete-modal-description" className="text-gray-600 text-center">
                Do you want to permanently delete this tattoo? This action is
                <span className="font-bold text-red-500"> irreversible</span>.
              </p>
              
              {/* Action Buttons */}
              <div className="flex justify-evenly mt-6">
                {/* Cancel Button */}
                <button
                  className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md shadow hover:bg-gray-300 hover:scale-105 transition-all"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
                
                {/* Confirm Delete Button */}
                <button
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-md shadow hover:from-red-600 hover:to-red-700 hover:scale-105 transition-all"
                  onClick={confirmDelete}
                >
                  Yes, Delete
                </button>
              </div>
              
              {/* Close "X" Button */}
              <button
                onClick={closeDeleteModal}
                aria-label="Close Modal"
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 hover:scale-110 transition"
              >
                <span className="text-2xl font-bold">×</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageGallery;
