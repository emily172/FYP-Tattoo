import React from 'react';

function Contact() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-4xl font-extrabold text-center">Get in Touch</h1>
      <form className="w-full max-w-lg mt-8 bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Your Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Your Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Message</label>
          <textarea
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Your Message"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white px-4 py-2 rounded font-medium hover:bg-indigo-600 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
