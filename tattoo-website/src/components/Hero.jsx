import React, { useState, useEffect } from 'react';
import { FaPaintBrush, FaHistory, FaImages, FaUserFriends, FaUser, FaQuestionCircle, FaBlog, FaPhoneAlt, FaUserPlus } from 'react-icons/fa';
import heroImage1 from '../assets/images/hero-image1.jpg';
import heroImage2 from '../assets/images/hero-image2.jpg';
import heroImage3 from '../assets/images/hero-image3.jpg';
import heroImage4 from '../assets/images/hero-image4.jpg';
import heroImage5 from '../assets/images/hero-image5.jpg';
import heroImage6 from '../assets/images/hero-image6.jpg';
import heroImage7 from '../assets/images/hero-image7.jpg';

function Hero() {
  const images = [
    { src: heroImage1, alt: 'Tattoo Image 1' },
    { src: heroImage2, alt: 'Tattoo Image 2' },
    { src: heroImage3, alt: 'Tattoo Image 3' },
    { src: heroImage4, alt: 'Tattoo Image 4' },
    { src: heroImage5, alt: 'Tattoo Image 5' },
    { src: heroImage6, alt: 'Tattoo Image 6' },
    { src: heroImage7, alt: 'Tattoo Image 7' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically change slides every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [images.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] bg-black overflow-hidden rounded-xl shadow-2xl">
        {/* Carousel Images */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 h-full">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 text-white p-5 rounded-full hover:scale-110 transition-all shadow-lg focus:outline-none"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 text-white p-5 rounded-full hover:scale-110 transition-all shadow-lg focus:outline-none"
        >
          ›
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full ${
                index === currentSlide ? 'bg-indigo-500' : 'bg-gray-500'
              } hover:scale-110 transition-all shadow-md`}
            ></button>
          ))}
        </div>
      </div>

      {/* Welcome Section */}
      <div className="mt-12 px-6 md:px-16 lg:px-32 py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white rounded-lg shadow-xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
          Welcome to Ink Pots Tattoo Studio
        </h2>
        <p className="text-lg text-gray-300 text-center leading-relaxed mb-8">
          At our tattoo studio in the heart of Waterford City, we believe every tattoo tells a story and our talented artist are here to start your journey. 
          <br></br>Explore our diverse artists, styles offerings and start your journey with us.
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Styles */}
          <div className="flex items-center bg-gradient-to-b from-gray-800 to-gray-700 p-6 rounded-lg shadow-lg">
            <FaPaintBrush className="text-indigo-500 w-12 h-12 mr-4" />
            <div>
              <h3 className="text-xl font-bold text-white">Styles</h3>
              <p className="text-gray-300 text-sm">
                From Geomtric to Abstract or whatever your preferences, dive a range of tattoo styles tailored that matches your vision.
              </p>
            </div>
          </div>

          {/* History */}
          <div className="flex items-center bg-gradient-to-b from-gray-800 to-gray-700 p-6 rounded-lg shadow-lg">
            <FaHistory className="text-indigo-500 w-12 h-12 mr-4" />
            <div>
              <h3 className="text-xl font-bold text-white">History</h3>
              <p className="text-gray-300 text-sm">
                Discover the rich history of our studio the deeping meaning behind tattoo styles and their cultural significance.
              </p>
            </div>
          </div>

          {/* Gallery */}
          <div className="flex items-center bg-gradient-to-b from-gray-800 to-gray-700 p-6 rounded-lg shadow-lg">
            <FaImages className="text-indigo-500 w-12 h-12 mr-4" />
            <div>
              <h3 className="text-xl font-bold text-white">Gallery</h3>
              <p className="text-gray-300 text-sm">
                Look at our amazing gallery of tattoo work to find the most stunning tattoo designs and get inspired.
              </p>
            </div>
          </div>

          {/* Team */}
          <div className="flex items-center bg-gradient-to-b from-gray-800 to-gray-700 p-6 rounded-lg shadow-lg">
            <FaUserFriends className="text-indigo-500 w-12 h-12 mr-4" />
            <div>
              <h3 className="text-xl font-bold text-white">Our Team</h3>
              <p className="text-gray-300 text-sm">
                Meet our talented artists and team which are looking forward to bring your tattoo art ideas to life.
              </p>
            </div>
          </div>

          {/* Profiles */}
          <div className="flex items-center bg-gradient-to-b from-gray-800 to-gray-700 p-6 rounded-lg shadow-lg">
            <FaUser className="text-indigo-500 w-12 h-12 mr-4" />
            <div>
              <h3 className="text-xl font-bold text-white">Profiles</h3>
              <p className="text-gray-300 text-sm">
                Explore our wonderful tattoo artist profiles and find the perfect match for your tattoo journey.
              </p>
            </div>
          </div>

          {/* FAQs */}
          <div className="flex items-center bg-gradient-to-b from-gray-800 to-gray-700 p-6 rounded-lg shadow-lg">
            <FaQuestionCircle className="text-indigo-500 w-12 h-12 mr-4" />
            <div>
              <h3 className="text-xl font-bold text-white">FAQs</h3>
              <p className="text-gray-300 text-sm">
                Have questions? Learn everything you need to know about tattoos and our process.
              </p>
            </div>
          </div>

          {/* Blogs */}
          <div className="flex items-center bg-gradient-to-b from-gray-800 to-gray-700 p-6 rounded-lg shadow-lg">
            <FaBlog className="text-indigo-500 w-12 h-12 mr-4" />
            <div>
              <h3 className="text-xl font-bold text-white">Blogs</h3>
              <p className="text-gray-300 text-sm">
                Stay updated on tattoo trends, prepping tips, after care tricks and lots more about tattoos.
              </p>
            </div>
          </div>

          {/* Contact Us */}
          <div className="flex items-center bg-gradient-to-b from-gray-800 to-gray-700 p-6 rounded-lg shadow-lg">
            <FaPhoneAlt className="text-indigo-500 w-12 h-12 mr-4" />
            <div>
              <h3 className="text-xl font-bold text-white">Contact Us</h3>
              <p className="text-gray-300 text-sm">
                Get in touch for by sending us a message on our contact section for any questions you may have about your tattoo.
              </p>
            </div>
          </div>

          {/* Signup */}
          <div className="flex items-center bg-gradient-to-b from-gray-800 to-gray-700 p-6 rounded-lg shadow-lg">
            <FaUserPlus className="text-indigo-500 w-12 h-12 mr-4" />
            <div>
              <h3 className="text-xl font-bold text-white">Sign Up</h3>
              <p className="text-gray-300 text-sm">
                Connect with your favorite artists by communciation with them in realtime using our chat and video calling app to start your journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
