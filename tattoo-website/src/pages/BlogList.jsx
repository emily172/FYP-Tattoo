import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/blogs') // Fetch all blogs
      .then((response) => setBlogs(response.data))
      .catch((err) => console.error('Error fetching blogs:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black p-8">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">
          Blog Section
        </h1>
        <p className="text-lg text-gray-400 mt-4">
          Discover inspiring articles, updates, and stories curated for you.
        </p>
      </header>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            to={`/blogs/${blog._id}`}
            className="group bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-lg hover:shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-shadow transform hover:scale-105 overflow-hidden"
          >
            {/* Blog Image */}
            <div className="relative h-80 overflow-hidden rounded-t-lg"> {/* Increased height */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60"></div>
              <div className="absolute top-4 left-4 bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 text-sm font-semibold text-white rounded-full shadow-md">
                {blog.category.toUpperCase()}
              </div>
              {/* Subtle Decorative Glow */}
              <div className="absolute inset-0 pointer-events-none group-hover:bg-[radial-gradient(circle,_rgba(118,87,255,0.6)_0%,_transparent_70%)] transition-opacity duration-500"></div>
            </div>

            {/* Blog Content */}
            <div className="p-6 relative">
              <h2 className="text-2xl font-extrabold text-white group-hover:text-indigo-400 transition-colors duration-300 leading-snug">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-400 mt-2">
                By {blog.author || 'Admin'} | {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-300 mt-4 text-sm leading-relaxed line-clamp-3">
                {blog.content.substring(0, 120)}...
              </p>
              {blog.tags && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs shadow-md hover:shadow-lg transition-shadow"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-6">
                <span className="text-indigo-400 hover:text-indigo-500 font-semibold text-sm">
                  Read More →
                </span>
              </div>
              {/* Floating Accent Effect */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-pink-500 to-yellow-500 w-8 h-8 rounded-full shadow-md animate-pulse"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
