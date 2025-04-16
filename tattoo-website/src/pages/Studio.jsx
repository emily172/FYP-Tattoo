import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Studio() {
  const [studio, setStudio] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/studio') // Fetch studio details
      .then((response) => setStudio(response.data))
      .catch((err) => console.error('Error fetching studio details:', err));
  }, []);

  if (!studio) return <p>Loading...</p>; // Loading state while data is fetched

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

      {/* Team */}
      <section className="mb-8">
  <h2 className="text-2xl font-bold mb-4">Meet Our Team</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {studio.team && studio.team.map((member, index) => (
      <div key={index} className="bg-white rounded-md shadow-md p-4 text-center">
        <img 
          src={member.image} // Ensure this points to the correct URL
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
      <section>
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
    </div>
  );
}

export default Studio;
