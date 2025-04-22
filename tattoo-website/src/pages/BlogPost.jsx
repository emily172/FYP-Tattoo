import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faTag, faTimes } from '@fortawesome/free-solid-svg-icons';

function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/blogs/${id}`)
      .then((response) => setBlog(response.data))
      .catch((err) => console.error('Error fetching blog:', err));
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
      setShowButton(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        navigate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  if (!blog) return <p className="text-center text-indigo-400 text-lg animate-pulse">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black p-8 relative">
      <div
        className="fixed top-0 left-0 w-full h-1 bg-indigo-500"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Fancier Close Button */}
      <button
        className="absolute top-6 right-6 bg-gradient-to-br from-red-500 to-pink-500 text-white p-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 ease-in-out group"
        onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon
          icon={faTimes}
          size="lg"
          className="group-hover:rotate-90 transition-transform duration-300"
        />
      </button>

      <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-xl rounded-lg overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-80 md:h-[500px] object-cover rounded-t-lg shadow-lg"
        />

        <div className="p-6">
          <p className="bg-indigo-500 text-white text-xs px-3 py-1 rounded-full inline-block mb-4">
            {calculateReadingTime(blog.content)} min read
          </p>

          <h1 className="text-4xl font-extrabold text-gray-100 mb-6">
            {blog.title}
          </h1>

          <p className="text-sm text-gray-400 border-l-4 border-indigo-500 pl-4 mb-4">
            <FontAwesomeIcon icon={faUser} className="text-indigo-400 mr-2" />
            {blog.author || 'Admin'}{' '}
            <FontAwesomeIcon icon={faCalendarAlt} className="text-indigo-400 mx-2" />
            {new Date(blog.createdAt).toLocaleDateString()} |{' '}
            <FontAwesomeIcon icon={faTag} className="text-indigo-400 mx-2" />
            <span className="text-indigo-400 font-medium">{blog.category}</span>
          </p>

          <div className="text-gray-300 leading-relaxed text-lg mb-6">
            {blog.content}

            <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-200 text-lg mb-6">
              "A powerful statement or key insight from the blog."
            </blockquote>
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {showButton && (
        <button
          className="fixed bottom-4 right-4 bg-gradient-to-br from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑ Back to Top
        </button>
      )}
    </div>
  );
}

export default BlogPost;
