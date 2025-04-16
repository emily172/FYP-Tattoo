import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminBlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '', category: '', tags: [], image: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [error, setError] = useState('');

  // Fetch blogs
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    axios
      .get('http://localhost:5000/blogs', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => setBlogs(response.data))
      .catch((err) => setError('Failed to fetch blogs.'));
  }, []);

  // Handle form submission for create or update
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const headers = { Authorization: `Bearer ${token}` };

    if (isEditing) {
      axios
        .put(`http://localhost:5000/blogs/${currentId}`, formData, { headers })
        .then((response) => {
          setBlogs((prev) => prev.map((blog) => (blog._id === currentId ? response.data : blog)));
          resetForm();
        })
        .catch((err) => setError('Failed to update blog.'));
    } else {
      axios
        .post('http://localhost:5000/blogs', formData, { headers })
        .then((response) => {
          setBlogs((prev) => [...prev, response.data]);
          resetForm();
        })
        .catch((err) => setError('Failed to create blog.'));
    }
  };

  // Handle delete blog
  const handleDelete = (id) => {
    const token = localStorage.getItem('adminToken');
    axios
      .delete(`http://localhost:5000/blogs/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => setBlogs((prev) => prev.filter((blog) => blog._id !== id)))
      .catch((err) => setError('Failed to delete blog.'));
  };

  // Handle edit blog
  const handleEdit = (blog) => {
    setFormData({ title: blog.title, content: blog.content, category: blog.category, tags: blog.tags, image: blog.image });
    setIsEditing(true);
    setCurrentId(blog._id);
  };

  // Reset form
  const resetForm = () => {
    setFormData({ title: '', content: '', category: '', tags: [], image: '' });
    setIsEditing(false);
    setCurrentId(null);
    setError('');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Blog Manager</h1>
      <form onSubmit={handleFormSubmit} className="bg-white p-4 rounded shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Blog' : 'Create New Blog'}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <textarea
          placeholder="Content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        ></textarea>
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={formData.tags.join(', ')}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(', ') })}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="url"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 rounded w-full hover:bg-indigo-600"
        >
          {isEditing ? 'Update Blog' : 'Create Blog'}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 text-white py-2 rounded w-full hover:bg-gray-600 mt-2"
          >
            Cancel Edit
          </button>
        )}
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white rounded-md shadow-md p-4">
            <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover mb-4 rounded-md" />
            <h2 className="text-lg font-bold">{blog.title}</h2>
            <p>{blog.content.substring(0, 100)}...</p>
            <p>Category: {blog.category}</p>
            <p>Tags: {blog.tags.join(', ')}</p>
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                onClick={() => handleEdit(blog)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleDelete(blog._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminBlogManager;
