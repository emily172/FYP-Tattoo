import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageTattooImages = () => {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState({
    artistName: '',
    style: '',
    imageURL: '',
    description: '',
    tags: [],
    dimensions: '',
    locationOnBody: '',
    artistWebsite: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch tattoo image details from the backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/images') // Fetch all tattoo images
      .then((response) => {
        console.log('Fetched Tattoo Images:', response.data);
        setImages(response.data);
      })
      .catch((err) => {
        console.error('Error fetching tattoo images:', err);
        setError('Failed to load tattoo image details.');
      });
  }, []);

  // Handle adding a new tattoo image entry
  const handleAddImage = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/images', newImage) // Create a new image entry
      .then((response) => {
        console.log('Added Tattoo Image:', response.data);
        setImages([...images, response.data]); // Update images state
        setNewImage({
          artistName: '',
          style: '',
          imageURL: '',
          description: '',
          tags: [],
          dimensions: '',
          locationOnBody: '',
          artistWebsite: '',
        }); // Clear the form
        setSuccess('Tattoo image added successfully!');
        setError('');
      })
      .catch((err) => {
        console.error('Error adding tattoo image entry:', err);
        setError('Failed to add tattoo image entry.');
        setSuccess('');
      });
  };

  // Handle deleting a tattoo image entry
  const handleDeleteImage = (id) => {
    axios
      .delete(`http://localhost:5000/api/images/${id}`) // Delete the entry
      .then(() => {
        setImages(images.filter((image) => image._id !== id)); // Remove from the state
        setSuccess('Tattoo image deleted successfully!');
        setError('');
      })
      .catch((err) => {
        console.error('Error deleting tattoo image entry:', err);
        setError('Failed to delete tattoo image entry.');
        setSuccess('');
      });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard: Manage Tattoo Images</h1>

      {/* Error and Success Messages */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      {/* Add New Tattoo Image Entry */}
      <form onSubmit={handleAddImage} className="bg-white p-6 rounded shadow-md mb-6">
        <h2 className="text-lg font-bold mb-4">Add New Tattoo Image</h2>
        <div className="mb-4">
          <label htmlFor="artistName" className="block text-lg font-bold text-gray-700">
            Artist Name
          </label>
          <input
            type="text"
            id="artistName"
            name="artistName"
            value={newImage.artistName}
            onChange={(e) => setNewImage({ ...newImage, artistName: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="style" className="block text-lg font-bold text-gray-700">
            Style
          </label>
          <input
            type="text"
            id="style"
            name="style"
            value={newImage.style}
            onChange={(e) => setNewImage({ ...newImage, style: e.target.value })}
            className="w-full p-2 border rounded"
            required
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
            value={newImage.imageURL}
            onChange={(e) => setNewImage({ ...newImage, imageURL: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-bold text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newImage.description}
            onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
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
            value={newImage.tags}
            onChange={(e) => setNewImage({ ...newImage, tags: e.target.value.split(',').map(tag => tag.trim()) })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dimensions" className="block text-lg font-bold text-gray-700">
            Dimensions
          </label>
          <input
            type="text"
            id="dimensions"
            name="dimensions"
            value={newImage.dimensions}
            onChange={(e) => setNewImage({ ...newImage, dimensions: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="locationOnBody" className="block text-lg font-bold text-gray-700">
            Location on Body
          </label>
          <input
            type="text"
            id="locationOnBody"
            name="locationOnBody"
            value={newImage.locationOnBody}
            onChange={(e) => setNewImage({ ...newImage, locationOnBody: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="artistWebsite" className="block text-lg font-bold text-gray-700">
            Artist Website
          </label>
          <input
            type="text"
            id="artistWebsite"
            name="artistWebsite"
            value={newImage.artistWebsite}
            onChange={(e) => setNewImage({ ...newImage, artistWebsite: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-6 rounded shadow-md hover:bg-indigo-600"
        >
          Add Image
        </button>
      </form>

      {/* Display Existing Tattoo Images */}
      <div className="space-y-6">
        {images.map((image) => (
          <div
            key={image._id}
            className="bg-white p-4 rounded shadow-md flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-700">{image.artistName}</h2>
              <p className="text-gray-600">{image.style}</p>
              {image.imageURL && <img src={image.imageURL} alt="Tattoo" className="w-32 mt-2 rounded" />}
              {image.description && <p className="text-gray-500 mt-2">{image.description}</p>}
              {image.tags && (
                <div className="flex flex-wrap mt-2">
                  {image.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-indigo-300 text-indigo-800 px-3 py-1 rounded-full text-sm mr-2"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              {image.locationOnBody && <p className="italic text-gray-500 mt-2">Location: {image.locationOnBody}</p>}
              {image.artistWebsite && (
                <a
                  href={image.artistWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-500 hover:underline mt-2 block"
                >
                  Visit Artist
                </a>
              )}
            </div>
            <button
              onClick={() => handleDeleteImage(image._id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageTattooImages;
