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
    axios
      .get('http://localhost:5000/blogs')
      .then((response) => setBlogs(response.data))
      .catch(() => setError('Failed to fetch blogs.'));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      axios
        .put(`http://localhost:5000/blogs/${currentId}`, formData)
        .then((response) => {
          setBlogs((prev) => prev.map((blog) => (blog._id === currentId ? response.data : blog)));
          resetForm();
        })
        .catch(() => setError('Failed to update blog.'));
    } else {
      axios
        .post('http://localhost:5000/blogs', formData)
        .then((response) => {
          setBlogs((prev) => [...prev, response.data]);
          resetForm();
        })
        .catch(() => setError('Failed to create blog.'));
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/blogs/${id}`)
      .then(() => setBlogs((prev) => prev.filter((blog) => blog._id !== id)))
      .catch(() => setError('Failed to delete blog.'));
  };

  const handleEdit = (blog) => {
    setFormData({ title: blog.title, content: blog.content, category: blog.category, tags: blog.tags, image: blog.image });
    setIsEditing(true);
    setCurrentId(blog._id);
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', category: '', tags: [], image: '' });
    setIsEditing(false);
    setCurrentId(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 p-8">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-purple-800 drop-shadow-lg">Blog Management Portal</h1>
        <p className="text-lg text-gray-700 mt-2">Create, update, and organize your blogs effortlessly.</p>
      </header>

      {/* Summary Section */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-6">
        <p className="text-lg text-gray-800">
          Total Blogs: <span className="font-bold text-purple-700">{blogs.length}</span>
        </p>
        <p className="text-lg text-gray-800">
          Currently Editing: <span className="font-bold text-purple-700">{isEditing ? 'Yes' : 'No'}</span>
        </p>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Blog Form */}
        <div className="flex-1 bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Blog' : 'Create New Blog'}</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            <textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              value={formData.tags.join(', ')}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(', ') })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="url"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform"
              >
                {isEditing ? 'Update Blog' : 'Create Blog'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Blog List */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Existing Blogs</h2>
          <div className="grid gap-4">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-gray-100 shadow-lg rounded-lg p-4 hover:shadow-2xl">
                <h3 className="text-lg font-bold">{blog.title}</h3>
                <p className="text-sm text-gray-600">{blog.category}</p>
                <p className="text-gray-500 mt-2">{blog.content.substring(0, 80)}...</p>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBlogManager;
