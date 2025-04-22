import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Studio() {
  const [studio, setStudio] = useState(null);
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/studio') // Fetch studio details
      .then((response) => setStudio(response.data))
      .catch((err) => console.error('Error fetching studio details:', err));
  }, []);

  if (!studio) return <p className="text-center text-gray-400 animate-pulse">Loading studio details...</p>;

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index); // Open/close FAQ
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-8">
      {/* Studio Name */}
      <header className="text-center mb-12">
        <h1 className="text-7xl font-extrabold tracking-wide text-white drop-shadow-lg">
          {studio.name}
        </h1>
        <p className="text-xl text-gray-400 mt-4">
          Welcome to our studio—a hub of creativity and artistry.
        </p>
      </header>


      {/* About Section */}


      <section className="mb-12 bg-gradient-to-b from-gray-900 via-gray-850 to-gray-800 rounded-xl shadow-2xl p-8 relative overflow-hidden">
        <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text mb-6">
          About Us
        </h2>
        <div className="relative group">
          {studio.image && (
            <img
              src={studio.image}
              alt={studio.name}
              className="w-full rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-850 to-transparent opacity-0 group-hover:opacity-80 rounded-xl transition-opacity duration-500"></div>
        </div>
        <p className="text-gray-400 text-lg leading-relaxed mt-6">
          {studio.description}
        </p>
      </section>

      {/* Services Section */}
      <section className="mb-12 bg-gradient-to-b from-gray-800 via-gray-700 to-black rounded-lg shadow-2xl p-8">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {studio.services && studio.services.map((service, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-lg shadow-lg p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Tattoo-Themed Emoji */}
              <div className="text-center text-4xl mb-4 group-hover:animate-bounce">
                {index % 3 === 0 ? "🖋️" : index % 3 === 1 ? "🔮" : "🎨"}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-500 transition-colors">
                {service}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300">
                Experience the excellence we offer through this service.
              </p>
            </div>
          ))}
        </div>
      </section>



      <section className="mb-12 bg-gradient-to-b from-gray-800 via-gray-700 to-black rounded-lg shadow-2xl p-8">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-lg">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {studio.events && studio.events.map((event, index) => (
            <div
              key={index}
              className="group bg-gray-800 rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105 hover:bg-gray-700"
            >
              {/* Event Name */}
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-500 transition-colors">
                {event.name}
              </h3>
              {/* Event Details with Emojis */}
              <div className="space-y-2 text-gray-300 text-lg">
                <p>
                  <strong>📅 Date:</strong> {event.date}
                </p>
                <p>
                  <strong>⏰ Time:</strong> {event.time}
                </p>
                <p>
                  <strong>📍 Location:</strong> {event.location}
                </p>
              </div>
              {/* Event Description */}
              <p className="mt-4 text-gray-400 group-hover:text-gray-300 leading-relaxed">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* Meet Our Team */}
      <section className="mb-12 bg-gradient-to-b from-gray-900 via-gray-850 to-gray-800 rounded-lg shadow-2xl p-8 relative overflow-hidden">
        {/* Decorative Background Gradients */}
        <div className="absolute -top-14 left-14 w-64 h-64 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 blur-2xl opacity-20"></div>
        <div className="absolute -bottom-14 right-14 w-64 h-64 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 blur-2xl opacity-20"></div>

        {/* Section Title */}
        <h2 className="text-4xl font-bold mb-6 text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text drop-shadow-lg">
          Meet the Owners
        </h2>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {studio.team && studio.team.map((member, index) => (
            <div
              key={index}
              className="relative bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-[0_4px_20px_rgba(255,105,180,0.4)] transition-transform duration-300 hover:scale-105"
            >
              <div className="relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover rounded-t-xl transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 rounded-t-xl"></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-indigo-400">{member.role}</p>
                <p className="text-gray-400 italic mt-3">"Innovative and visionary leader."</p>
              </div>
            </div>


          ))}
        </div>
      </section>



      <section className="mb-12 bg-gradient-to-b from-gray-800 via-gray-700 to-black rounded-lg shadow-2xl p-8">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Testimonials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {studio.testimonials && studio.testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-gray-800 rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105 hover:bg-gray-700"
            >
              {/* Highlighted Blockquote */}
              <blockquote className="italic text-gray-300 text-lg leading-relaxed group-hover:text-indigo-400 transition-colors">
                “{testimonial.text}”
              </blockquote>
              <div className="mt-4 text-right">
                {/* Author Information */}
                <p className="text-indigo-400 font-semibold group-hover:text-pink-500">
                  - {testimonial.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="mb-12 bg-gradient-to-b from-gray-800 via-gray-700 to-black rounded-lg shadow-2xl p-8">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-lg">
          Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {studio.gallery && studio.gallery.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-lg shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105 hover:rotate-2"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                style={{ transform: `translateY(${index * 10}px)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-75 rounded-lg transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-bold group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-lg">{item.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* FAQs */}
      <section className="mb-12 bg-gradient-to-b from-gray-800 via-gray-700 to-black rounded-lg shadow-2xl p-8">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-lg">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {studio.faqs && studio.faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-md overflow-hidden transition-all ${openFAQIndex === index ? "bg-indigo-500 text-gray-200" : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="p-4 w-full flex justify-between items-center font-bold transition-colors"
              >
                <span>{faq.question}</span>
                <span className="text-xl">
                  {openFAQIndex === index ? "▲" : "▼"}
                </span>
              </button>
              {openFAQIndex === index && (
                <div className="p-4 bg-gray-700 text-gray-300 border-t">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>


      {/* Pricing Section */}
      <section className="mb-12 bg-gradient-to-b from-gray-800 via-gray-700 to-black rounded-lg shadow-2xl p-8">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-transparent bg-clip-text">
          Pricing
        </h2>
        <table className="table-auto w-full border-collapse border border-gray-600">
          <thead>
            <tr className="bg-gray-800 text-indigo-400">
              <th className="border border-gray-600 p-4">Service</th>
              <th className="border border-gray-600 p-4">Price Range</th>
              <th className="border border-gray-600 p-4">Special Offers</th>
            </tr>
          </thead>
          <tbody>
            {studio.pricing && studio.pricing.map((item, index) => (
              <tr key={index} className="text-gray-300 hover:bg-gray-800">
                <td className="border border-gray-600 p-4">{item.service}</td>
                <td className="border border-gray-600 p-4">{item.price}</td>
                <td className="border border-gray-600 p-4">
                  <span className="px-2 py-1 bg-pink-500 text-white rounded-full">
                    {item.offer}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>


      <section className="mb-12 bg-gradient-to-b from-gray-800 via-gray-700 to-black rounded-lg shadow-2xl p-8">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-gray-300 text-lg">
          {/* Address */}
          <div>
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
              Address
            </h3>
            <p>{studio.address}</p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
              Contact Information
            </h3>
            <p>
              <strong>Phone:</strong> {studio.phone}
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${studio.email}`} className="text-indigo-400 hover:underline">
                {studio.email}
              </a>
            </p>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
              Working Hours
            </h3>
            <ul className="text-gray-300 text-lg leading-relaxed space-y-2">
              {studio.hours && Object.entries(studio.hours).map(([day, hours]) => (
                <li key={day} className="flex justify-between">
                  <span className="font-semibold">{day}</span>
                  <span>{hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="text-center text-gray-400 mt-12">
        <p>&copy; {new Date().getFullYear()} {studio.name}. All Rights Reserved.</p>
        <p className="mt-2">
          Powered by passion and creativity. Follow us on our journey to excellence.
        </p>
      </footer>
    </div>
  );
}

export default Studio;
