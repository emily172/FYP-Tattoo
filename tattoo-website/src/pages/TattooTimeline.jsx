import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TattooTimeline = () => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null); // Track the currently selected image
  const [error, setError] = useState('');

  // Fetch tattoo images from backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/images')
      .then((response) => {
        setImages(response.data); // Populate gallery
      })
      .catch((err) => {
        console.error('Error fetching tattoo images:', err);
        setError('Failed to load tattoo images. Please try again later.');
      });
  }, []);

  // Function to open the lightbox modal
  const openLightbox = (image) => {
    setCurrentImage(image);
  };

  // Function to close the lightbox modal
  const closeLightbox = () => {
    setCurrentImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-5xl font-extrabold text-center mb-8 text-indigo-800">
        🎨 Tattoo Gallery
      </h1>
      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : images.length === 0 ? (
        <p className="text-center text-gray-500">No tattoos available to display.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <div
              key={image._id}
              className="group relative rounded-lg shadow-md cursor-pointer overflow-hidden"
              onClick={() => openLightbox(image)}
            >
              <img
                src={image.imageURL}
                alt={image.artistName || 'Tattoo'}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300"
          onClick={closeLightbox} // Close modal when clicking outside
        >
          <div
            className="relative max-w-4xl w-full p-4 sm:p-6 bg-white rounded-lg shadow-2xl transform transition-transform duration-300 scale-100"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-lg bg-red-500 rounded-full px-3 py-1 hover:bg-red-600"
            >
              ✖
            </button>

            {/* Lightbox Image */}
            <img
              src={currentImage.imageURL}
              alt={currentImage.artistName || 'Tattoo'}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg mb-4 shadow-md"
            />

            {/* Details */}
            <div className="text-center px-4 sm:px-6">
              <h3 className="text-3xl font-bold text-gray-800">{currentImage.artistName}</h3>
              <p className="text-lg text-indigo-600 font-medium mt-2">
                {currentImage.style || 'Unknown Style'}
              </p>
              {currentImage.description && (
                <p className="text-gray-700 text-justify mt-4">{currentImage.description}</p>
              )}
              {currentImage.tags && (
                <div className="flex flex-wrap justify-center mt-4">
                  {currentImage.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs shadow-sm mr-2 mb-2"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              {currentImage.locationOnBody && (
                <p className="italic text-gray-500 mt-4">
                  Location: {currentImage.locationOnBody}
                </p>
              )}
              {currentImage.artistWebsite && (
                <div className="mt-6">
                  <a
                    href={currentImage.artistWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md"
                  >
                    Visit Artist's Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TattooTimeline;
