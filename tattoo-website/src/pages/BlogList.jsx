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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Blog Section</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white rounded-md shadow-md p-4">
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-40 object-cover rounded-md mb-4" 
            />
            <h2 className="text-lg font-bold">{blog.title}</h2>
            <p className="text-gray-500">By {blog.author || 'Admin'}</p>
            <Link 
              to={`/blogs/${blog._id}`} 
              className="text-indigo-500 hover:underline mt-4 inline-block"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;

/*
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/blogs')
      .then((response) => setBlogs(response.data))
      .catch((err) => console.error('Error fetching blogs:', err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Blog Section</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white rounded-md shadow-md p-4">
            <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover rounded-md mb-4" />
            <h2 className="text-lg font-bold">{blog.title}</h2>
            <p className="text-gray-500">By {blog.author}</p>
            <p className="text-gray-700">{blog.category}</p>
            <Link
              to={`/blogs/${blog._id}`}
              className="text-indigo-500 hover:underline mt-4 inline-block"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;

*/