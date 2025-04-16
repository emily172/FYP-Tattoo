import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const HistoryTimeline = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(null); // Index for active image in carousel

  // Fetch history details from backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/history')
      .then((response) => {
        console.log('Fetched History:', response.data);
        setHistory(response.data); // Populate timeline
      })
      .catch((err) => {
        console.error('Error fetching history:', err);
        setError('Failed to load history details.');
      });
  }, []);

  // Open the carousel modal at the selected index
  const openCarousel = (index) => {
    if (history[index]?.image) {
      setCurrentIndex(index); // Open modal for the clicked image
    }
  };

  // Close the carousel modal
  const closeCarousel = () => {
    setCurrentIndex(null);
  };

  // Navigate to the previous image with valid entries
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex > 0 ? prevIndex - 1 : history.length - 1;
      while (!history[newIndex]?.image) {
        newIndex = newIndex > 0 ? newIndex - 1 : history.length - 1;
      }
      return newIndex;
    });
  };

  // Navigate to the next image with valid entries
  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex < history.length - 1 ? prevIndex + 1 : 0;
      while (!history[newIndex]?.image) {
        newIndex = newIndex < history.length - 1 ? newIndex + 1 : 0;
      }
      return newIndex;
    });
  };

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="p-8 bg-gradient-to-r from-indigo-50 to-indigo-100 min-h-screen">
      <h1 className="text-6xl font-extrabold text-center mb-8 text-indigo-800 tracking-wider">
        📜 Our History
      </h1>
      <VerticalTimeline>
        {history.map((entry, index) => (
          <VerticalTimelineElement
            key={index}
            date={entry.year}
            iconStyle={{
              background: 'linear-gradient(to bottom, #3b82f6, #9333ea)',
              color: '#fff',
            }}
            icon={<i className="fas fa-star text-xl text-white"></i>} // Fancy icon!
          >
            <h3 className="text-2xl font-bold text-gray-800">{entry.year}</h3>
            <p className="text-lg text-gray-600 mb-4">{entry.event}</p>

            {/* Display Image */}
            {entry.image && (
              <img
                src={entry.image}
                alt="Milestone"
                className="w-full mt-4 rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300 cursor-pointer"
                onClick={() => openCarousel(index)} // Open carousel on image click
              />
            )}

            {/* Handle YouTube Videos */}
            {entry.video && entry.video.includes("youtube.com") ? (
              <a
                href={entry.video}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block mt-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
              >
                {/* Video Thumbnail */}
                <img
                  src={`https://img.youtube.com/vi/${entry.video.split('v=')[1]}/0.jpg`}
                  alt="Video Thumbnail"
                  className="w-full rounded-lg group-hover:brightness-75 transition-all duration-300"
                />
                {/* Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-white text-4xl font-bold">▶</span>
                    <span className="text-white text-lg mt-2 font-semibold">
                      Watch Video
                    </span>
                  </div>
                </div>
              </a>
            ) : (
              entry.video && (
                <iframe
                  src={entry.video}
                  title="Milestone Video"
                  className="w-full h-60 mt-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )
            )}

            {/* Display Testimonial */}
            {entry.testimonial && (
              <blockquote className="text-gray-600 italic mt-4 border-l-4 border-indigo-500 pl-4">
                "{entry.testimonial}"
              </blockquote>
            )}

            {/* Provide External Link */}
            {entry.link && (
              <a
                href={entry.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:underline mt-4 inline-block font-semibold"
              >
                Learn More ➡
              </a>
            )}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>

      {/* Image Carousel Modal */}
      {currentIndex !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={closeCarousel} // Close carousel
        >
          <div className="relative">
            {/* Current Image */}
            <img
              src={history[currentIndex].image}
              alt="Carousel View"
              className="rounded-lg shadow-lg max-w-full max-h-screen"
            />
            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent modal close
                goToPrevious();
              }}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full"
            >
              ◀ Previous
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent modal close
                goToNext();
              }}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full"
            >
              Next ▶
            </button>
            {/* Close Button */}
            <button
              onClick={closeCarousel}
              className="absolute top-4 right-4 text-white text-lg bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryTimeline;
