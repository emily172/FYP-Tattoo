import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/contact', formData)
      .then(() => {
        setSuccessMessage('Your message has been sent successfully!');
        setErrorMessage('');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      })
      .catch(() => {
        setSuccessMessage('');
        setErrorMessage('Failed to send your message. Please try again.');
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black p-8">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">
          Contact Us
        </h1>
        <p className="text-lg text-gray-400 mt-4">
          We'd love to hear from you! Share your thoughts or inquiries.
        </p>
      </header>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        {/* Input Fields */}
        <div>
          <label className="block text-lg font-bold text-gray-400">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 text-white shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-bold text-gray-400">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 text-white shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-bold text-gray-400">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 text-white shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter your message"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg hover:bg-gradient-to-l hover:from-purple-600 hover:to-indigo-500 transition-all transform hover:scale-105"
        >
          Send Message
        </button>
      </form>

      {/* Feedback Messages */}
      <div className="text-center mt-6">
        {successMessage && (
          <p className="text-green-500 font-semibold text-lg">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 font-semibold text-lg">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Contact;
