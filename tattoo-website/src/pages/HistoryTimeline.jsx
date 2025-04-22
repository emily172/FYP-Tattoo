import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faCalendarAlt,
  faBookmark,
  faPlayCircle,
  faArrowRight,
  faArrowLeft,
  faTimes,
  faQuoteLeft,
} from '@fortawesome/free-solid-svg-icons';

const HistoryTimeline = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/history')
      .then((response) => setHistory(response.data))
      .catch((err) => setError('Failed to load history details.'));
  }, []);

  const openCarousel = (index) => {
    if (history[index]?.image) {
      setCurrentIndex(index);
    }
  };

  const closeCarousel = () => setCurrentIndex(null);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex > 0 ? prevIndex - 1 : history.length - 1;
      while (!history[newIndex]?.image) {
        newIndex = newIndex > 0 ? newIndex - 1 : history.length - 1;
      }
      return newIndex;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex < history.length - 1 ? prevIndex + 1 : 0;
      while (!history[newIndex]?.image) {
        newIndex = newIndex < history.length - 1 ? newIndex + 1 : 0;
      }
      return newIndex;
    });
  };

  const handleKeyDown = (event) => {
    if (currentIndex !== null) {
      if (event.key === 'Escape') {
        closeCarousel();
      } else if (event.key === 'ArrowLeft') {
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        goToNext();
      }
    }
  };

  const handleMouseScroll = (event) => {
    if (currentIndex !== null) {
      if (event.deltaY < 0) {
        goToPrevious();
      } else if (event.deltaY > 0) {
        goToNext();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleMouseScroll);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleMouseScroll);
    };
  }, [currentIndex]);

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex flex-col items-center p-4 sm:p-6">
      {/* Header */}
      <h1 className="text-7xl font-extrabold tracking-wide text-white drop-shadow-lg">
        Our History
      </h1>

      <VerticalTimeline>
        {history.map((entry, index) => (
          <VerticalTimelineElement
            key={index}
            iconStyle={{
              background: 'linear-gradient(to bottom, #3b82f6, #9333ea)',
              color: '#fff',
            }}
            icon={
              <FontAwesomeIcon
                icon={faStar}
                className="text-white text-2xl hover:text-yellow-500 transition duration-300"
              />
            }
          >
            <div className="p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-md border-2 border-transparent hover:border-gray-600 hover:shadow-2xl overflow-hidden transition-transform transform hover:scale-105">
              {/* Year Section with Icon */}
              <div className="text-center mb-4 flex items-center justify-center">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-indigo-400" />
                <span className="text-4xl font-bold text-indigo-400 drop-shadow-lg">
                  {entry.year}
                </span>
              </div>

              {/* Event Description */}
              <p className="text-lg text-gray-300 text-center flex items-center">
                <FontAwesomeIcon icon={faBookmark} className="mr-2 text-gray-300" />
                {entry.event}
              </p>

              {/* Image */}
              {entry.image && (
                <div className="relative mt-6">
                  <img
                    src={entry.image}
                    alt={`Timeline Event for ${entry.year}`}
                    className="w-full rounded-lg shadow-lg hover:scale-105 hover:brightness-110 transform transition-transform duration-300 cursor-pointer"
                    onClick={() => openCarousel(index)}
                  />
                </div>
              )}

              {/* Video Section */}
              {entry.video && entry.video.includes('youtube.com') ? (
                <a
                  href={entry.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block mt-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
                >
                  <img
                    src={`https://img.youtube.com/vi/${entry.video.split('v=')[1]}/0.jpg`}
                    alt="Video Thumbnail"
                    className="w-full rounded-lg group-hover:brightness-75 transition duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FontAwesomeIcon icon={faPlayCircle} className="text-white text-5xl" />
                  </div>
                </a>
              ) : (
                entry.video && (
                  <iframe
                    src={entry.video}
                    title="Milestone Video"
                    className="w-full h-60 mt-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    allowFullScreen
                  ></iframe>
                )
              )}

              {/* Testimonial Section */}
              {entry.testimonial && (
                <blockquote className="text-gray-300 italic mt-6 border-l-4 border-indigo-500 pl-4">
                  <FontAwesomeIcon icon={faQuoteLeft} className="text-indigo-500 mr-2" />
                  "{entry.testimonial}"
                </blockquote>
              )}

              {/* Learn More Button */}
              {entry.link && (
                <div className="text-center mt-6">
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 text-md font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-md shadow-md hover:from-indigo-400 hover:to-pink-400 transform hover:scale-105 transition-transform flex items-center justify-center"
                  >
                    Learn More
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </a>
                </div>
              )}
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>

      {/* Carousel Modal */}
      {currentIndex !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gradient-to-bl from-gray-900 via-black to-gray-800 bg-opacity-90 z-50 transition-opacity duration-300"
          onClick={closeCarousel}
        >
          <div
            className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg shadow-2xl overflow-hidden p-6 max-w-screen-md mx-auto"
            onClick={(e) => e.stopPropagation()} // Prevent background click from closing
          >
            {/* Current Image */}
            <img
              src={history[currentIndex].image}
              alt="Carousel View"
              className="rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300 max-w-full max-h-[80vh]"
            />

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full flex items-center shadow-lg transition"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Previous
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full flex items-center shadow-lg transition"
            >
              Next
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </button>

            {/* Close Button */}
            <button
              onClick={closeCarousel}
              className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center shadow-md"
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryTimeline;

