import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageImages = () => {
  const [images, setImages] = useState([]);
  const [editImage, setEditImage] = useState(null); // Image selected for editing
  const [formData, setFormData] = useState({}); // Form data for editing
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch all images from backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/images')
      .then((response) => setImages(response.data))
      .catch((err) => {
        console.error('Error fetching images:', err);
        setErrorMessage('Failed to load images.');
      });
  }, []);

  // Delete an image
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/images/${id}`);
      setImages(images.filter((image) => image._id !== id)); // Update state
      setSuccessMessage('Image deleted successfully!');
    } catch (error) {
      console.error('Error deleting image:', error);
      setErrorMessage('Failed to delete image.');
    }
  };

  // Open edit form for selected image
  const handleEdit = (image) => {
    setEditImage(image); // Select image for editing
    setFormData({
      title: image.title,
      imageURL: image.imageURL,
      description: image.description,
      tags: image.tags.join(', '),
      authorName: image.author?.name || '',
      authorWebsite: image.author?.website || '',
    });
  };

  // Handle form input changes during editing
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit edit changes
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedImage = {
        ...formData,
        tags: formData.tags.split(',').map((tag) => tag.trim()), // Convert tags string into array
      };
      await axios.put(`http://localhost:5000/api/images/${editImage._id}`, updatedImage);
      setImages(
        images.map((image) =>
          image._id === editImage._id ? { ...image, ...updatedImage } : image
        )
      ); // Update state
      setSuccessMessage('Image updated successfully!');
      setEditImage(null); // Close edit form
    } catch (error) {
      console.error('Error updating image:', error);
      setErrorMessage('Failed to update image.');
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard: Manage Images</h1>

      {/* Success/Error Messages */}
      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

      {/* Images List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div key={image._id} className="bg-white p-4 rounded shadow-md">
            <img
              src={image.imageURL}
              alt={image.title || 'Image'}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-lg font-bold mt-2">{image.title}</h3>
            <p className="text-gray-700">{image.description}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(image)}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(image._id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Image Form */}
      {editImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Edit Image</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-lg font-bold text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="imageURL" className="block text-lg font-bold text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  id="imageURL"
                  name="imageURL"
                  value={formData.imageURL}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-lg font-bold text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="tags" className="block text-lg font-bold text-gray-700">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="authorName" className="block text-lg font-bold text-gray-700">
                  Author Name
                </label>
                <input
                  type="text"
                  id="authorName"
                  name="authorName"
                  value={formData.authorName}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="authorWebsite" className="block text-lg font-bold text-gray-700">
                  Author Website
                </label>
                <input
                  type="text"
                  id="authorWebsite"
                  name="authorWebsite"
                  value={formData.authorWebsite}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageImages;
