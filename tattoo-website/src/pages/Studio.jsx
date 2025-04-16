import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Studio() {
  const [studio, setStudio] = useState(null);
  const [openFAQIndex, setOpenFAQIndex] = useState(null); // State to track which FAQ is open

  useEffect(() => {
    axios
      .get('http://localhost:5000/studio') // Fetch studio details
      .then((response) => setStudio(response.data))
      .catch((err) => console.error('Error fetching studio details:', err));
  }, []);

  if (!studio) return <p>Loading...</p>; // Loading state while data is fetched

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index); // Toggle FAQ open/close
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">{studio.name}</h1>
  
      {/* Studio Overview */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p className="text-gray-700 mb-4">{studio.description}</p>
        {studio.image && (
          <img 
            src={studio.image} 
            alt={studio.name} 
            className="w-full rounded-md shadow-md mb-4"
          />
        )}
      </section>
  
      {/* Location and Working Hours */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Find Us</h2>
        <p className="text-gray-700 mb-4">{studio.address}</p>
        <h3 className="text-xl font-bold">Working Hours</h3>
        <ul>
          {studio.hours && Object.entries(studio.hours).map(([day, hours]) => (
            <li key={day} className="text-gray-700">{day}: {hours}</li>
          ))}
        </ul>
      </section>
  
      {/* Services */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Services</h2>
        <ul className="list-disc list-inside text-gray-700">
          {studio.services && studio.services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </section>
  
      {/* Meet Our Team */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {studio.team && studio.team.map((member, index) => (
            <div key={index} className="bg-white rounded-md shadow-md p-4 text-center">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-bold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
  
      {/* Testimonials */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
        {studio.testimonials && studio.testimonials.map((testimonial, index) => (
          <div key={index} className="bg-gray-100 rounded-md shadow-md p-4 mb-4">
            <blockquote className="italic text-gray-700">
              "{testimonial.text}"
            </blockquote>
            <p className="text-right text-gray-500 mt-2">- {testimonial.author}</p>
          </div>
        ))}
      </section>
  
      {/* Events */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        {studio.events && studio.events.map((event, index) => (
          <div key={index} className="bg-gray-100 rounded-md shadow-md p-4 mb-4">
            <h3 className="text-xl font-bold">{event.name}</h3>
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>Location: {event.location}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </section>
  
      {/* Gallery */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {studio.gallery && studio.gallery.map((item, index) => (
            <div key={index} className="bg-white rounded-md shadow-md">
              <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-md" />
              <div className="p-4">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p>{item.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
  
      {/* Pricing */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Pricing</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Service</th>
              <th className="border border-gray-300 p-2">Price Range</th>
              <th className="border border-gray-300 p-2">Special Offers</th>
            </tr>
          </thead>
          <tbody>
            {studio.pricing && studio.pricing.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{item.service}</td>
                <td className="border border-gray-300 p-2">{item.price}</td>
                <td className="border border-gray-300 p-2">{item.offer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
  
      {/* FAQs */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        {studio.faqs && studio.faqs.map((faq, index) => (
          <div key={index} className="border rounded-md mb-4">
            <button 
              onClick={() => toggleFAQ(index)} 
              className="p-4 w-full text-left bg-gray-100 font-bold"
            >
              {faq.question}
            </button>
            {openFAQIndex === index && (
              <div className="p-4 text-gray-700 border-t">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </section>
  
      {/* Contact Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <div className="mb-4">
          <p className="text-gray-700"><strong>Phone:</strong> {studio.phone}</p>
          <p className="text-gray-700">
            <strong>Email:</strong> <a href={`mailto:${studio.email}`} className="text-indigo-500 hover:underline">{studio.email}</a>
          </p>
          <p className="text-gray-700"><strong>Address:</strong> {studio.address}</p>
        </div>
      </section>
    </div>
  );
}

export default Studio;
