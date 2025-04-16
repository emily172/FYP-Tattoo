import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageStudio() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    hours: { Monday: '', Saturday: '' },
    services: [],
    team: [],
    testimonials: [],
    image: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/studio') // Fetch studio details
      .then((response) => setFormData(response.data))
      .catch((err) => setError('Failed to fetch studio details.'));
  }, []);

  // Submit Studio Details
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate fields before submitting
    if (!formData.name || !formData.description || !formData.address) {
      setError('Please fill in all required fields (Name, Description, Address).');
      return;
    }

    if (formData.services.some((service) => !service)) {
      setError('Please ensure all services are filled out.');
      return;
    }

    if (formData.team.some((member) => !member.name || !member.role || !member.image)) {
      setError('Please ensure all team member fields (Name, Role, Image) are filled out.');
      return;
    }

    if (formData.testimonials.some((testimonial) => !testimonial.text || !testimonial.author)) {
      setError('Please ensure all testimonials have text and an author.');
      return;
    }

    // Reset error and send data to backend
    setError('');
    axios
      .put('http://localhost:5000/studio', formData)
      .then(() => alert('Studio details updated successfully!'))
      .catch(() => setError('Failed to update studio details.'));
  };

  // Dynamic Field Handlers
  const handleDynamicChange = (field, index, value) => {
    const updatedField = [...formData[field]];
    updatedField[index] = value;
    setFormData({ ...formData, [field]: updatedField });
  };

  const addDynamicField = (field) => {
    const updatedField = [
      ...formData[field],
      field === 'team' ? { name: '', role: '', image: '' } : field === 'testimonials' ? { text: '', author: '' } : '',
    ];
    setFormData({ ...formData, [field]: updatedField });
  };

  const removeDynamicField = (field, index) => {
    const updatedField = formData[field].filter((_, idx) => idx !== index);
    setFormData({ ...formData, [field]: updatedField });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Studio</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleFormSubmit} className="bg-white p-4 rounded shadow-md">
        {/* Basic Details */}
        <input
          type="text"
          placeholder="Studio Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="url"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Working Hours */}
        <h2 className="text-xl font-bold mb-4">Working Hours</h2>
        {Object.entries(formData.hours).map(([day, hours], index) => (
          <div key={day} className="flex items-center mb-4">
            <label className="w-1/4 font-bold">{day}</label>
            <input
              type="text"
              placeholder="Hours"
              value={hours}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hours: { ...formData.hours, [day]: e.target.value },
                })
              }
              className="w-3/4 p-2 border rounded"
            />
          </div>
        ))}

        {/* Services */}
        <h2 className="text-xl font-bold mb-4">Services</h2>
        {formData.services.map((service, index) => (
          <div key={index} className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Service"
              value={service}
              onChange={(e) => handleDynamicChange('services', index, e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeDynamicField('services', index)}
              className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addDynamicField('services')}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Service
        </button>

        {/* Team */}
        <h2 className="text-xl font-bold mb-4">Meet Our Team</h2>
        {formData.team.map((member, index) => (
          <div key={index} className="mb-4 border p-4 rounded">
            <input
              type="text"
              placeholder="Name"
              value={member.name}
              onChange={(e) => handleDynamicChange('team', index, { ...member, name: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              placeholder="Role"
              value={member.role}
              onChange={(e) => handleDynamicChange('team', index, { ...member, role: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="url"
              placeholder="Image URL"
              value={member.image}
              onChange={(e) => handleDynamicChange('team', index, { ...member, image: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeDynamicField('team', index)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove Member
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addDynamicField('team')}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Team Member
        </button>

        {/* Testimonials */}
        <h2 className="text-xl font-bold mb-4">Testimonials</h2>
        {formData.testimonials.map((testimonial, index) => (
          <div key={index} className="mb-4 border p-4 rounded">
            <textarea
              placeholder="Testimonial Text"
              value={testimonial.text}
              onChange={(e) =>
                handleDynamicChange('testimonials', index, { ...testimonial, text: e.target.value })
              }
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              placeholder="Author"
              value={testimonial.author}
              onChange={(e) =>
                handleDynamicChange('testimonials', index, { ...testimonial, author: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeDynamicField('testimonials', index)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove Testimonial
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addDynamicField('testimonials')}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Testimonial
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 rounded w-full hover:bg-indigo-600 mt-4"
        >
          Update Studio
        </button>
      </form>
    </div>
  );
}

export default ManageStudio;
