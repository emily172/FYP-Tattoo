import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/blogs/${id}`)
      .then((response) => setBlog(response.data))
      .catch((err) => console.error('Error fetching blog:', err));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">{blog.title}</h1>
      <img src={blog.image} alt={blog.title} className="w-full h-60 object-cover rounded-md mb-4" />
      <p className="text-gray-500">By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}</p>
      <p className="text-gray-700">{blog.category}</p>
      <div className="mt-4">
        <p>{blog.content}</p>
      </div>
    </div>
  );
}

export default BlogPost;
