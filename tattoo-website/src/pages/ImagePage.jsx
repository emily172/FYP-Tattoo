import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // For accessing dynamic route parameters
import axios from 'axios';

const ImagePage = () => {
  const { id } = useParams(); // Get the image ID from the URL
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  // Fetch image details from the backend
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/images/${id}`) // Fetch the specific image by ID
      .then((response) => setImage(response.data))
      .catch((err) => {
        console.error('Error fetching image details:', err);
        setError('Failed to load image details.');
      });
  }, [id]);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!image) {
    return <p className="text-center text-gray-500">Loading image details...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Image Section */}
        <div className="text-center mb-6">
          <img
            src={image.imageURL}
            alt={image.title || 'Image'}
            className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-md"
          />
        </div>

        {/* Information Section */}
        <div className="px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold text-gray-800">{image.title}</h1>
          {image.author?.name && (
            <p className="text-lg text-indigo-600 font-medium mt-2">
              By: {image.author.name}
            </p>
          )}
          {image.author?.website && (
            <a
              href={image.author.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md"
            >
              Visit Artist's Website
            </a>
          )}
          {image.description && (
            <p className="text-gray-700 text-justify mt-6">{image.description}</p>
          )}

          {/* Tags */}
          {image.tags && image.tags.length > 0 && (
            <div className="flex flex-wrap justify-start mt-6">
              {image.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs shadow-sm mr-2 mb-2"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Image Metadata */}
          {image.dimensions && (
            <p className="italic text-gray-500 mt-6">
              Dimensions: {image.dimensions.width} x {image.dimensions.height} pixels
            </p>
          )}
          <p className="italic text-gray-500 mt-2">
            Uploaded: {new Date(image.uploadDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
