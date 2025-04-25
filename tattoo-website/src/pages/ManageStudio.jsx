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
    events: [],
    gallery: [],
    pricing: [],
    faqs: [],
  });
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/studio')
      .then((response) => setFormData(response.data))
      .catch(() => setError('Failed to fetch studio details.'));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.address) {
      setError('Please fill in all required fields (Name, Description, Address).');
      return;
    }
    setError('');
    axios
      .put('http://localhost:5000/studio', formData)
      .then(() => alert('Studio details updated successfully!'))
      .catch(() => setError('Failed to update studio details.'));
  };

  const handleDynamicChange = (field, index, value) => {
    const updatedField = [...formData[field]];
    updatedField[index] = value;
    setFormData({ ...formData, [field]: updatedField });
  };

  const addDynamicField = (field) => {
    const updatedField = [
      ...formData[field],
      field === 'team' ? { name: '', role: '', image: '' }
        : field === 'testimonials' ? { text: '', author: '' }
        : field === 'events' ? { name: '', date: '', time: '', location: '', description: '' }
        : field === 'gallery' ? { image: '', title: '', artist: '' }
        : field === 'pricing' ? { service: '', price: '', offer: '' }
        : field === 'faqs' ? { question: '', answer: '' }
        : '',
    ];
    setFormData({ ...formData, [field]: updatedField });
  };

  const removeDynamicField = (field, index) => {
    const updatedField = formData[field].filter((_, idx) => idx !== index);
    setFormData({ ...formData, [field]: updatedField });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 p-8">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-purple-800 drop-shadow-lg">Manage Studio Details</h1>
        <p className="text-lg text-gray-700 mt-2">Keep your studio information up-to-date with ease.</p>
      </header>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="space-y-8">
        {/* Basic Details */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Basic Studio Details</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Studio Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="url"
              placeholder="Studio Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform"
            >
              Update Studio
            </button>
          </form>
        </div>


{/* Contact Us Section */}
<div className="bg-white shadow-md rounded-xl p-6">
  <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

  {/* Phone */}
  <div className="mb-4">
    <label className="block text-lg font-medium text-gray-700">Phone Number</label>
    <input
      type="text"
      placeholder="Phone Number"
      value={formData.phone}
      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
      required
    />
  </div>

  {/* Email */}
  <div className="mb-4">
    <label className="block text-lg font-medium text-gray-700">Email Address</label>
    <input
      type="email"
      placeholder="Email Address"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
      required
    />
  </div>

  {/* Working Hours */}
  <h2 className="text-xl font-bold mb-4">Working Hours</h2>
  <div className="space-y-4">
    {Object.entries(formData.hours).map(([day, hours]) => (
      <div key={day} className="flex items-center mb-4">
        <label className="w-1/4 font-bold text-gray-700">{day}</label>
        <input
          type="text"
          placeholder="Hours (e.g., 9am-5pm)"
          value={hours}
          onChange={(e) =>
            setFormData({
              ...formData,
              hours: { ...formData.hours, [day]: e.target.value },
            })
          }
          className="w-3/4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        />
      </div>
    ))}
  </div>
</div>


        {/* Services */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Services</h2>
          {formData.services.map((service, index) => (
            <div key={index} className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Service"
                value={service}
                onChange={(e) => handleDynamicChange('services', index, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => removeDynamicField('services', index)}
                className="ml-2 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addDynamicField('services')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Add Service
          </button>
        </div>

        {/* Team Section */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Team</h2>
          {formData.team.map((member, index) => (
            <div key={index} className="mb-4 border p-4 rounded-lg">
              <input
                type="text"
                placeholder="Name"
                value={member.name}
                onChange={(e) => handleDynamicChange('team', index, { ...member, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Role"
                value={member.role}
                onChange={(e) => handleDynamicChange('team', index, { ...member, role: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="url"
                placeholder="Image URL"
                value={member.image}
                onChange={(e) => handleDynamicChange('team', index, { ...member, image: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => removeDynamicField('team', index)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Remove Member
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addDynamicField('team')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Add Member
          </button>
        </div>

     {/* Testimonials Section */}
     <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
          {formData.testimonials.map((testimonial, index) => (
            <div key={index} className="mb-4 border p-4 rounded-lg">
              <textarea
                placeholder="Testimonial Text"
                value={testimonial.text}
                onChange={(e) =>
                  handleDynamicChange('testimonials', index, { ...testimonial, text: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Author"
                value={testimonial.author}
                onChange={(e) =>
                  handleDynamicChange('testimonials', index, { ...testimonial, author: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => removeDynamicField('testimonials', index)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Remove Testimonial
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addDynamicField('testimonials')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Add Testimonial
          </button>
        </div>

        {/* Events Section */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Events</h2>
          {formData.events.map((event, index) => (
            <div key={index} className="mb-4 border p-4 rounded-lg">
              <input
                type="text"
                placeholder="Event Name"
                value={event.name}
                onChange={(e) => handleDynamicChange('events', index, { ...event, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="date"
                value={event.date}
                onChange={(e) => handleDynamicChange('events', index, { ...event, date: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Time"
                value={event.time}
                onChange={(e) => handleDynamicChange('events', index, { ...event, time: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Location"
                value={event.location}
                onChange={(e) => handleDynamicChange('events', index, { ...event, location: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-purple-500"
              />
              <textarea
                placeholder="Description"
                value={event.description}
                onChange={(e) => handleDynamicChange('events', index, { ...event, description: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => removeDynamicField('events', index)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Remove Event
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addDynamicField('events')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Add Event
          </button>
        </div>

        {/* Gallery Section */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Gallery</h2>
          {formData.gallery.map((item, index) => (
            <div key={index} className="mb-4 border p-4 rounded-lg">
              <input
                type="url"
                placeholder="Image URL"
                value={item.image}
                onChange={(e) => handleDynamicChange('gallery', index, { ...item, image: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Title"
                value={item.title}
                onChange={(e) => handleDynamicChange('gallery', index, { ...item, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Artist (optional)"
                value={item.artist}
                onChange={(e) => handleDynamicChange('gallery', index, { ...item, artist: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => removeDynamicField('gallery', index)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Remove Gallery Item
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addDynamicField('gallery')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Add Gallery Item
          </button>
        </div>

        {/* Pricing Section */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          {formData.pricing.map((item, index) => (
            <div key={index} className="mb-4 border p-4 rounded-lg">
              <input
                type="text"
                placeholder="Service"
                value={item.service}
                onChange={(e) => handleDynamicChange('pricing', index, { ...item, service: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleDynamicChange('pricing', index, { ...item, price: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Special Offer (optional)"
                value={item.offer}
                onChange={(e) => handleDynamicChange('pricing', index, { ...item, offer: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => removeDynamicField('pricing', index)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Remove Pricing Entry
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addDynamicField('pricing')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Add Pricing Entry
          </button>
        </div>
        {/* FAQs Section */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">FAQs</h2>
          {formData.faqs.map((faq, index) => (
            <div key={index} className="mb-4 border p-4 rounded-lg">
              <textarea
                placeholder="Question"
                value={faq.question}
                onChange={(e) => handleDynamicChange('faqs', index, { ...faq, question: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-purple-500"
              />
              <textarea
                placeholder="Answer"
                value={faq.answer}
                onChange={(e) => handleDynamicChange('faqs', index, { ...faq, answer: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => removeDynamicField('faqs', index)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Remove FAQ
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addDynamicField('faqs')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Add FAQ
          </button>
        </div>
      </div>
    </div>
  );
}


export default ManageStudio;
