import React, { useState } from 'react';
import axios from 'axios';

function AdminRegister() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/admin/register', formData);
      setSuccess(response.data.message); // Show success message
      setError(''); // Clear errors
      setFormData({ email: '', password: '' }); // Reset form
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to register admin');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-lg rounded-lg px-8 pt-8 pb-8 max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-md mb-6">
          Admin Registration
        </h1>
        {error && (
          <p className="text-red-500 font-semibold text-center mb-4">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-500 font-semibold text-center mb-4">
            {success}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white px-4 py-2 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white px-4 py-2 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2 rounded-lg shadow-lg hover:shadow-indigo-700 hover:opacity-90 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister;
