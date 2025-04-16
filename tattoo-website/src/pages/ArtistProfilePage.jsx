import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArtistProfilePage = () => {
  const { id } = useParams(); // Capture the artist ID from the URL
  const [artist, setArtist] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/artists/${id}`) // Fetch the selected artist details
      .then((response) => {
        const data = response.data;
        setArtist({
          ...data,
          certifications: Array.isArray(data.certifications) ? data.certifications : [],
          portfolioImages: Array.isArray(data.portfolioImages) ? data.portfolioImages : [],
          socialMedia: data.socialMedia || {},
        });
      })
      .catch((err) => {
        console.error('Error fetching artist details:', err);
        setError(true);
      });
  }, [id]);

  if (error) return <p className="text-red-500">Error loading artist details. Please try again later.</p>;
  if (!artist) return <p>Loading artist details...</p>;

  return (
    <div className="p-8">
      {/* Artist Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{artist.name}</h1>
        <h2 className="text-lg text-gray-600">{artist.specialty || 'Tattoo Artist'}</h2>
        <img
          src={artist.profileImage}
          alt={artist.name}
          className="w-40 h-40 rounded-full object-cover mx-auto my-4"
        />
      </div>

      {/* Biography */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Biography</h2>
        <p className="text-gray-700 text-lg">{artist.bio || 'No biography available.'}</p>
      </section>

      {/* Artist Portfolio */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artist.portfolioImages?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Portfolio ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          ))}
        </div>
      </section>

      {/* Certifications and Achievements */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Certifications and Achievements</h2>
        {Array.isArray(artist.certifications) ? (
          <ul className="list-disc list-inside text-gray-700">
            {artist.certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No certifications available.</p>
        )}
      </section>

      {/* Client Reviews */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Client Reviews</h2>
        {artist.reviews?.length > 0 ? (
          artist.reviews.map((review, index) => (
            <div key={index} className="mb-4">
              <p className="text-gray-700">"{review.comment}"</p>
              <p className="text-sm text-gray-500">- {review.clientName}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No reviews available.</p>
        )}
      </section>

      {/* Social Media Links */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Follow Me</h2>
        <div className="flex space-x-4">
          {artist.socialMedia?.instagram && (
            <a
              href={artist.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Instagram
            </a>
          )}
          {artist.socialMedia?.facebook && (
            <a
              href={artist.socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Facebook
            </a>
          )}
          {artist.socialMedia?.tiktok && (
            <a
              href={artist.socialMedia.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              TikTok
            </a>
          )}
        </div>
      </section>

      {/* Availability and Booking */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Availability and Booking</h2>
        <p className="text-gray-700">{artist.availability || 'No availability information provided.'}</p>
      </section>

      {/* Artist Preferences */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Specialty</h2>
        <p className="text-gray-700">{artist.specialty || 'No specific specialties provided.'}</p>
      </section>

      {/* Featured Tattoos */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Featured Tattoos</h2>
        <p className="text-gray-700">{artist.featuredTattoos || 'No featured tattoos to display.'}</p>
      </section>

      {/* Artist Philosophy */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Philosophy</h2>
        <p className="text-gray-700">{artist.philosophy || 'No philosophy shared.'}</p>
      </section>

      {/* Languages Spoken */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Languages Spoken</h2>
        <p className="text-gray-700">{artist.languages?.join(', ') || 'No language information available.'}</p>
      </section>
    </div>
  );
};

export default ArtistProfilePage;
