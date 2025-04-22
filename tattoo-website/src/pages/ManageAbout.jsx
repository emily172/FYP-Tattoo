import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageAbout = () => {
  const [about, setAbout] = useState({
    mission: '',
    story: '',
    vision: '',
    values: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch About content for admin
    axios
      .get('http://localhost:5000/api/about/manage')
      .then((response) => {
        setAbout(response.data || {});
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load About content.');
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAbout({ ...about, [name]: value });
  };

  const handleValuesChange = (index, value) => {
    const updatedValues = [...about.values];
    updatedValues[index] = value;
    setAbout({ ...about, values: updatedValues });
  };

  const addValueField = () => {
    setAbout({ ...about, values: [...about.values, ''] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/about/manage/${about._id}`, about)
      .then(() => {
        setSuccessMessage('Successfully updated About content!');
        setError('');
      })
      .catch(() => {
        setSuccessMessage('');
        setError('Failed to update About content.');
      });
  };

  if (loading) {
    return <p className="text-center text-gray-700">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-8 tracking-wider">
        Manage About Page
      </h1>
      {successMessage && (
        <p className="text-center text-green-600">{successMessage}</p>
      )}
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
        {/* Mission */}
        <div>
          <label className="block text-lg font-bold text-gray-700">Mission</label>
          <textarea
            name="mission"
            value={about.mission}
            onChange={handleChange}
            className="w-full p-3 rounded-lg shadow-md border border-gray-300"
            placeholder="Enter mission..."
          ></textarea>
        </div>

        {/* Story */}
        <div>
          <label className="block text-lg font-bold text-gray-700">Story</label>
          <textarea
            name="story"
            value={about.story}
            onChange={handleChange}
            className="w-full p-3 rounded-lg shadow-md border border-gray-300"
            placeholder="Enter story..."
          ></textarea>
        </div>

        {/* Vision */}
        <div>
          <label className="block text-lg font-bold text-gray-700">Vision</label>
          <textarea
            name="vision"
            value={about.vision}
            onChange={handleChange}
            className="w-full p-3 rounded-lg shadow-md border border-gray-300"
            placeholder="Enter vision..."
          ></textarea>
        </div>

        {/* Values */}
        <div>
          <label className="block text-lg font-bold text-gray-700">Values</label>
          {about.values.map((value, index) => (
            <input
              key={index}
              type="text"
              value={value}
              onChange={(e) => handleValuesChange(index, e.target.value)}
              className="w-full p-3 rounded-lg shadow-md border border-gray-300 mb-2"
              placeholder={`Value ${index + 1}`}
            />
          ))}
          <button
            type="button"
            onClick={addValueField}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add Value
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-lg transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ManageAbout;
