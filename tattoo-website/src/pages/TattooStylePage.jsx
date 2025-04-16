import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const TattooStylePage = () => {
  const { id } = useParams(); // Capture the style ID from the URL
  const [style, setStyle] = useState(null);
  const [relatedStyles, setRelatedStyles] = useState([]); // For related tattoo styles
  const [error, setError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // For carousel functionality

  useEffect(() => {
    axios
      .get(`http://localhost:5000/tattoo-styles/${id}`) // Fetch the selected style details
      .then((response) => setStyle(response.data))
      .catch((err) => {
        console.error('Error fetching tattoo style:', err);
        setError(true);
      });

    // Fetch related tattoo styles (example: all styles except current one)
    axios
      .get('http://localhost:5000/tattoo-styles') // Fetch all tattoo styles
      .then((response) =>
        setRelatedStyles(response.data.filter((styleItem) => styleItem._id !== id)) // Exclude the current style
      )
      .catch((err) => console.error('Error fetching related styles:', err));
  }, [id]);

  if (error) return <p className="text-red-500">Error loading style details. Please try again later.</p>;
  if (!style) return <p>Loading style details...</p>;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? style.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === style.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="p-8">
      {/* Main Image */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{style.name}</h1>
        <img
          src={style.image}
          alt={style.name}
          className="w-full h-80 object-cover rounded-lg"
        />
      </div>

      {/* About the Style */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">About the Style</h2>
        <p className="text-gray-700 text-lg">{style.descriptor}</p>
      </section>

      {/* Fun Facts */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Fun Facts</h2>
        <p className="text-gray-700 text-lg">{style.funFacts || 'No fun facts available for this style.'}</p>
      </section>

      {/* History */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">History</h2>
        <p className="text-gray-700 text-lg">{style.history || 'No history available for this style.'}</p>
      </section>

      {/* Style-Specific Challenges */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Style-Specific Challenges</h2>
        <p className="text-gray-700 text-lg">{style.challenges || 'No challenges documented for this style.'}</p>
      </section>

      {/* Tools and Techniques */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Tools and Techniques</h2>
        <p className="text-gray-700 text-lg">{style.toolsTechniques || 'No tools and techniques information available.'}</p>
      </section>

      {/* Tattoo Maintenance Timeline */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Tattoo Maintenance Timeline</h2>
        <p className="text-gray-700 text-lg">{style.maintenanceTimeline || 'No maintenance timeline provided.'}</p>
      </section>

      {/* Iconic Designs */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Iconic Designs</h2>
        <p className="text-gray-700 text-lg">{style.iconicDesigns || 'No iconic designs listed for this style.'}</p>
      </section>

      {/* Tattoo Studio Environment */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Tattoo Studio Environment</h2>
        <p className="text-gray-700 text-lg">{style.studioEnvironment || 'No studio environment recommendations available.'}</p>
      </section>

      {/* Estimated Duration */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Estimated Duration</h2>
        <p className="text-gray-700 text-lg">{style.estimatedDuration || 'No duration information available.'}</p>
      </section>

      {/* Common Locations */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Common Locations</h2>
        <p className="text-gray-700 text-lg">
          {style.commonLocations || 'This style is versatile and can be placed on various parts of the body.'}
        </p>
      </section>

      {/* Image Carousel - Gallery */}
      {style.images && style.images.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Gallery</h2>
          <div className="relative w-full max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-lg">
              <img
                src={style.images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
            >
              &#8249; {/* Left Arrow */}
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
            >
              &#8250; {/* Right Arrow */}
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {style.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'
                }`}
              ></button>
            ))}
          </div>
        </section>
      )}

      {/* Preparing for This Type of Tattoo */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Preparing for This Type of Tattoo</h2>
        <p className="text-gray-700 text-lg">{style.preparation || 'No preparation instructions available.'}</p>
      </section>

      {/* Aftercare */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Aftercare</h2>
        <p className="text-gray-700 text-lg">{style.aftercare || 'No aftercare instructions available.'}</p>
      </section>
    </div>
  );
};

export default TattooStylePage;

