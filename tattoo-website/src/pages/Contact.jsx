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
    <div className="p-8 bg-gradient-to-r from-green-50 to-green-100 min-h-screen">
      <h1 className="text-5xl font-extrabold text-center text-green-800 mb-8 tracking-wider">
        Contact Us
      </h1>
      {successMessage && <p className="text-center text-green-600">{successMessage}</p>}
      {errorMessage && <p className="text-center text-red-600">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-lg font-bold text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg shadow-md border border-gray-300"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-bold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg shadow-md border border-gray-300"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-bold text-gray-700">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 rounded-lg shadow-md border border-gray-300"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-lg transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
