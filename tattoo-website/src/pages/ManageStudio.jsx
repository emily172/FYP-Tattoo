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
      .get('http://localhost:5000/studio') // Fetch studio details
      .then((response) => setFormData(response.data))
      .catch((err) => setError('Failed to fetch studio details.'));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validation checks for all fields
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

    if (formData.events.some((event) => !event.name || !event.date || !event.time || !event.description)) {
      setError('Please ensure all event fields are filled out.');
      return;
    }

    if (formData.gallery.some((item) => !item.image || !item.title)) {
      setError('Please ensure all gallery items have an image and a title.');
      return;
    }

    if (formData.pricing.some((item) => !item.service || !item.price)) {
      setError('Please ensure all pricing entries have a service name and price.');
      return;
    }

    if (formData.faqs.some((faq) => !faq.question || !faq.answer)) {
      setError('Please ensure all FAQs have both a question and an answer.');
      return;
    }

    // Submit the data
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
          placeholder="Studio Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        />


                {/* Description */}
                <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          rows="4"
          required
        />

        {/* Address */}
        <input
          type="text"
          placeholder="Studio Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />

        {/* Phone */}
        <input
          type="text"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
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

        {/* Team Section */}
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
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Testimonial
        </button>

        {/* Events */}
        <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
        {formData.events.map((event, index) => (
          <div key={index} className="mb-4 border p-4 rounded">
            <input
              type="text"
              placeholder="Event Name"
              value={event.name}
              onChange={(e) => handleDynamicChange('events', index, { ...event, name: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="date"
              placeholder="Date"
              value={event.date}
              onChange={(e) => handleDynamicChange('events', index, { ...event, date: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              placeholder="Time"
              value={event.time}
              onChange={(e) => handleDynamicChange('events', index, { ...event, time: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              placeholder="Location"
              value={event.location}
              onChange={(e) => handleDynamicChange('events', index, { ...event, location: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              placeholder="Description"
              value={event.description}
              onChange={(e) => handleDynamicChange('events', index, { ...event, description: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <button
              type="button"
              onClick={() => removeDynamicField('events', index)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove Event
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addDynamicField('events')}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Event
        </button>

        {/* Gallery */}
        <h2 className="text-xl font-bold mb-4">Gallery</h2>
        {formData.gallery.map((item, index) => (
          <div key={index} className="mb-4 border p-4 rounded">
            <input
              type="url"
              placeholder="Image URL"
              value={item.image}
              onChange={(e) => handleDynamicChange('gallery', index, { ...item, image: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              placeholder="Title"
              value={item.title}
              onChange={(e) => handleDynamicChange('gallery', index, { ...item, title: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              placeholder="Artist (optional)"
              value={item.artist}
              onChange={(e) => handleDynamicChange('gallery', index, { ...item, artist: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeDynamicField('gallery', index)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove Gallery Item
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addDynamicField('gallery')}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Gallery Item
        </button>

        {/* Pricing */}
        <h2 className="text-xl font-bold mb-4">Pricing</h2>
        {formData.pricing.map((item, index) => (
          <div key={index} className="mb-4 border p-4 rounded">
            <input
              type="text"
              placeholder="Service"
              value={item.service}
              onChange={(e) => handleDynamicChange('pricing', index, { ...item, service: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleDynamicChange('pricing', index, { ...item, price: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              placeholder="Special Offer (optional)"
              value={item.offer}
              onChange={(e) => handleDynamicChange('pricing', index, { ...item, offer: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeDynamicField('pricing', index)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove Pricing Entry
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addDynamicField('pricing')}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Pricing Entry
        </button>

        {/* FAQs */}
        <h2 className="text-xl font-bold mb-4">FAQs</h2>
        {formData.faqs.map((faq, index) => (
          <div key={index} className="mb-4 border p-4 rounded">
            <textarea
              placeholder="Question"
              value={faq.question}
              onChange={(e) => handleDynamicChange('faqs', index, { ...faq, question: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              placeholder="Answer"
              value={faq.answer}
              onChange={(e) => handleDynamicChange('faqs', index, { ...faq, answer: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeDynamicField('faqs', index)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove FAQ
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addDynamicField('faqs')}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Add FAQ
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
