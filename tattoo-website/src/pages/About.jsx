import React, { useState, useEffect } from 'react';
import axios from 'axios';

const About = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the About page content
    axios
      .get('http://localhost:5000/api/about')
      .then((response) => {
        setAbout(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load About page content.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-gray-700">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <h1 className="text-5xl font-extrabold text-center text-blue-800 mb-8 tracking-wider">
        About Us
      </h1>

      {about && (
        <>
          {/* Mission Section */}
          <section className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700">{about.mission}</p>
          </section>

          {/* Story Section */}
          <section className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">Our Story</h2>
            <p className="text-lg text-gray-700">{about.story}</p>
          </section>

          {/* Vision Section */}
          {about.vision && (
            <section className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-blue-700 mb-4">Our Vision</h2>
              <p className="text-lg text-gray-700">{about.vision}</p>
            </section>
          )}

          {/* Values Section */}
          {about.values && about.values.length > 0 && (
            <section className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-blue-700 mb-4">Our Values</h2>
              <ul className="list-disc list-inside text-lg text-gray-700">
                {about.values.map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default About;
